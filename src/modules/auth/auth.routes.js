const express = require("express")
const authRouter = express.Router()
const authController = require("./auth.controller.js")

authRouter.route("/register").post(authController.register).get(authController.registerView)
authRouter.route("/login").post(authController.login).get(authController.loginView)


module.exports = authRouter