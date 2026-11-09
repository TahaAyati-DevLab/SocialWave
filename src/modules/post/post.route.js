const express = require("express")
const router = express.Router()
const controller = require("./post.controller.js")

router.route("/").get(controller.viewUploadSchema).post(controller.postUpload)

module.exports = router