const mongoose = require("mongoose");

const Message = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: String
    }
})

module.exports = mongoose.model("Message", Message)