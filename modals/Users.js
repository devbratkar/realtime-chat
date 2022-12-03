const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
     name: { type: String, required: true },
     email: { type: String, required: true },
     tel: { type: String },
     password: { type: String, required: true },
     chats: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Chat"
     }
}, { timestamps: true })

const User = mongoose.model('user', userSchema)
module.exports = User