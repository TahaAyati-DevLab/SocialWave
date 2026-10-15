const userModel = require("./../../models/users.js")
const { errorResponse, successResponse } = require("./../../utils/responses.js")
const { registerValidatorSchema } = require("./auth.validator.js")

exports.registerViews = async (req, res) => {
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

        req.flash("success", "SginUp successfully")
        return res.redirect("/auth/register")

    } catch (err) {
        next(err)
    }

}