const postModel = require("./../../models/posts.js")
const { postUploadValidation } = require("./post.validator.js")

exports.viewUploadSchema = async (req, res) => {
    res.render("post/upload")
}

exports.postUpload = async (req, res, next) => {
    try {
        const { hashTags, description } = req.body
        const user = req.user
        const tags = hashTags.split(",")

        if (!req.file) {
            req.flash("error", "No media has been added.")
            return res.render("post/upload")
        }

        await postUploadValidation.validate({ description })

        const mediaPathUrl = `posts/${req.file.filename}`
        const post = new postModel({
            media: {
                filename: req.file.filename,
                path: mediaPathUrl
            },
            description,
            tags,
            user: user._id
        })

        await post.save()

        req.flash("success", "upload new post in page successfully...")
        return res.render("post/upload")
        
    } catch (err) {
        next(err)
    }
}