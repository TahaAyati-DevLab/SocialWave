const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
    profilePicture: {
        type: String,
        required: false
    },
    private: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

schema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

const userModel = mongoose.model("users", schema)
module.exports = userModel