const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
  sender: { id: { type: String }, name: { type: String } },
  receiver: { id: { type: String }, name: { type: String } },
  allMessages: [{
    message: { type: String }, createdAt: { type: Date }, seen: { type: Boolean }
  }],
  chatSeen: { type: Boolean },
  latestMessage: {
    message: { type: String }, createdAt: { type: Date }, seen: { type: Boolean }
  },
}, { timestamps: true })

const Chat = mongoose.model('chat', chatSchema)
module.exports = Chat