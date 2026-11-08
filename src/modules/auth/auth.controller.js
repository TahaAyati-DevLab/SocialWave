const userModel = require("./../../models/users.js")
const { errorResponse, successResponse } = require("./../../utils/responses.js")
const { registerValidatorSchema,loginValidationSchema } = require("./auth.validator.js")
const jwt = require("jsonwebtoken")
const refreshTokenModel = require("./../../models/refreshToken.js")
const bcrypt = require("bcrypt")

exports.registerView = async (req, res) => {
    res.render("auth/register")
}

exports.register = async (req, res, next) => {
    try {
        const { email, username, name, password } = req.body

        await registerValidatorSchema.validate({
            email,
            username,
            name,
            password
        })

        const isUserExist = await userModel.findOne({ $or: [{ email }, { username }] })
        if (isUserExist) {
            req.flash("error", "Email or Username alrdeay exist...")
            return res.redirect("/auth/register")
        }

        const isFirstUser = (await userModel.countDocuments()) === 0
        let role = "USER"
        if (isFirstUser) {
            role = "ADMIN"
        }

        let user = new userModel({ email, username, name, password, role })
        user = await user.save()

        const accessToken = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, { expiresIn: "90day" })
        const refreshToken = await refreshTokenModel.createToken(user)

        res.cookie("refrsh-token", refreshToken, {
            maxAge: 900_000,
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })

        res.cookie("access-token", accessToken, {
            maxAge: 900_000,
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })

        req.flash("success", "SginUp successfully")
        return res.redirect("/auth/register")

    } catch (err) {
        next(err)
    }

}

exports.loginView = async (req, res) => {
    res.render("auth/login")
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        await loginValidationSchema.validate({
            email,
            password
        },{abortEarly:false})
        
        const user = await userModel.findOne({ email });
        if (!user) {
            req.flash("error", "User not found...")
            return res.redirect("/auth/login");
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            req.flash("error", "Email or Password not inValid...")
            return res.redirect("/auth/login")
        }

        const accessToken = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, { expiresIn: "90day" })
        const refreshToken = await refreshTokenModel.createToken(user)

        res.cookie("refrsh-token", refreshToken, {
            maxAge: 900_000,
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })

        res.cookie("access-token", accessToken, {
            maxAge: 900_000,
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })

        req.flash("success", "SginIn successfully")
        return res.redirect("/auth/login")


    } catch (err) {
        next(err)
    }
}