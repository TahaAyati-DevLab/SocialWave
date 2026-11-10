const jwt = require("jsonwebtoken")
const userModel = require("./../models/users.js")

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies["access-token"]
        if (!token) {
            req.flash("error", "Please log in first, then try again.")
            return res.redirect("/auth/login")
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (!payload) {
            req.flash("error", "Please log in first, then try again.")
            return res.redirect("/auth/login")
        }

        const userID = payload.userID;

        const user = await userModel.findById({ _id: userID })
        if (!user) {
            req.flash("error", "Please log in first, then try again.")
            return res.redirect("/auth/login")
        }

        req.user = user
        next()

    } catch (err) {
        next(err)
    }
}