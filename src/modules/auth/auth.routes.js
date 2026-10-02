const express = require("express")
const authRouter = express.Router()
const authController = require("./auth.controller.js")

authRouter.route("/register").post(authController.register)

module.exports = authRouter