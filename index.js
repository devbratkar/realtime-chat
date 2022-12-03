const express = require("express");
const mongoose = require('mongoose')
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bp = require('body-parser')
const AuthRoute = require('./routes/auth')
const ChatRoute = require('./routes/chat')


app.use(bp.urlencoded({ extended: true }))
app.use(bp.json())
app.use(cors());

// mongoose.connect('mongodb+srv://devbratkar:12319928@chat0.4juhxka.mongodb.net/Chat')
mongoose.connect('mongodb+srv://devbratkar:12319928@chat0.4juhxka.mongodb.net/Chat?retryWrites=true&w=majority')

const usersData = [{
     id: "7000689334",
     name: "Devbrat Kar"
}]

// app.get('/', (req, res, next) => {
//      res.json({
//           status: 'Backend Working !'
//      })
// })

app.get('/users', (req, res) => {
     res.json({
          message: 'Working'
     })
})

app.use('/auth', AuthRoute)
app.use('/chat', ChatRoute)

const server = http.createServer(app);

const io = new Server(server, {
     cors: {
          // origin: "https://realtime-chat-dev.netlify.app/",
          origin: "http://localhost:3000",
          methods: ["GET", "POST"],
     },
});

io.on("connection", (socket) => {
     let myDetails = {
          name: '',
          id: socket.id
     }
     console.log(`User Connected: ${socket.id}`);

     socket.on("join_room", name => {
          myDetails['name'] = name
          socket.broadcast.emit('user_joined_msg', { name, id: socket.id })
     })

     socket.on("message", msg => {
          socket.broadcast.emit('msg', { name: myDetails, msg: msg })
     })

});

server.listen(process.env.PORT || 3002, () => {
     console.log("SERVER IS RUNNING");
});