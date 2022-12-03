const Chat = require("../modals/Chats")
const jwt = require('jsonwebtoken')

const getChats = (req, res, next) => {
  const receiver = req.params.id;
  const token = req.headers.token
  const user = jwt.verify(token, 'awd12*-?><]0=+abc')
  Chat.find({ $and: [{ "receiver.id": receiver }, { "sender.id": user.id }] })
    .then(chats => {
      console.log('chats', chats)
      res.json({
        ...chats
      })
    })
}

const newChat = (req, res, next) => {
  const receiver = req.params.id;
  let chat = new Chat({
    sender: { name: 'Devbrat kar' },
    receiver: { id: receiver, name: 'Kaveri Kar' },
    allMessage: [{
      message: "Hello !", createdAt: new Date().toDateString(), seen: false,
    }],
    latestMessage: {
      message: "Hello !", createdAt: new Date().toDateString(), seen: false,
    }
  })
  chat.save()
}

module.exports = { getChats, newChat }