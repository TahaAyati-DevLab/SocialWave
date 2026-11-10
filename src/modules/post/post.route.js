const express = require("express")
const router = express.Router()
const controller = require("./post.controller.js")
const auth = require("./../../middlewares/auth.js")


router.route("/").get(auth,controller.viewUploadSchema).post(auth,controller.postUpload)

module.exports = router