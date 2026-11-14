const express = require("express")
const router = express.Router()
const controller = require("./post.controller.js")
const auth = require("./../../middlewares/auth.js")
const isVerified = require("./../../middlewares/verifiedAcount.js")
const {multerStorage} = require("./../../middlewares/uploaderConfigs.js")
const uploade = multerStorage("public/images/posts",/jpeg|jpg|png|webp|mp4|mkv/)


router.route("/").get(auth, isVerified, controller.viewUploadSchema).post(auth,uploade.single("media"), controller.postUpload)

module.exports = router