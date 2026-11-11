module.exports = async (req, res, next) => {
    const isVerified = req.user.isVerified;
    if (!isVerified) {
        req.flash("errorVerified", "You need to verify your account");
        return res.render("post/upload")
    }
    next()
}