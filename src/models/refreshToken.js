const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        requied: true
    },
    token: {
        type: string,
        required: true
    },
    expire: {
        type: Date,
        required: true
    }
})

schema.static.createToken = async (user) => {
    //*code
}

schema.static.verifyToken = async (token) => {
    //*code
}