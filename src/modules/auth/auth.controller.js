const userModel = require("./../../models/users.js")
const { errorResponse, successResponse } = require("./../../utils/responses.js")

exports.register = async (req, res) => {
    try {
        const { email, username, name, password } = req.body

        //TODO: Develop Validation...
        //code

        const isUserExist = await userModel.findOne({ $or: [{ email }, { username }] })
        if (isUserExist) {
            return errorResponse(res, 400, "Email or Username alrdeay exist...")
        }

        const isFirstUser = (await userModel.countDocuments()) === 0
        let role = "USER"
        if (isFirstUser) {
            role = "ADMIN"
        }

        const user = new userModel({ email, username, name, password, role })
        user = await user.save()

        return successResponse(res, 201, {
            message: "User register successfully...",
            user: { ...user, password: undefined }
        })

    } catch (err) {
        next(err)
    }

}