const express = require("express")
const router = express.Router()
const controller = require("./post.controller.js")
const auth = require("./../../middlewares/auth.js")
const isVerified = require("./../../middlewares/verifiedAcount.js")

router.route("/").get(auth, isVerified, controller.viewUploadSchema).post(auth, isVerified, controller.postUpload)

module.exports = router