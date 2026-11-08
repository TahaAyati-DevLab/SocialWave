const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    media: {
        path: { type: String, required: true },
        filename: { type: String, required: true }
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, { timestamps: true })

const model = mongoose.model("posts", schema)
module.exports = model