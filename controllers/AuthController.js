const User = require('../modals/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
     bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
          if (err) {
               res.json({
                    error: err
               })
          }

          let user = new User({
               name: req.body.name,
               email: req.body.email,
               tel: req.body.tel,
               password: hashedPass,
          })

          user.save()
               .then(() => {
                    res.json({ message: 'User Addded Successfully !' })
               })
               .catch((err) => {
                    console.log(err);
                    res.json({ message: 'Error Occured !' })
               })
     })
}

const login = (req, res, next) => {
     let username = req.body.username
     let password = req.body.password

     User.findOne({ $or: [{ email: username }, { tel: username }] })
          .then(user => {
               if (user) {
                    bcrypt.compare(password, user.password, (err, result) => {
                         if (err) {
                              res.json({
                                   error: err
                              })
                         }
                         if (result) {
                              let token = jwt.sign({ id: user._id, name: user.name, email: user.email, tel: user.tel }, 'awd12*-?><]0=+abc', { expiresIn: '1hr' })
                              res.json({
                                   message: 'Login Success !',
                                   name: user.name,
                                   email: user.email,
                                   tel: user.tel,
                                   id: user._id,
                                   token
                              })
                         } else {
                              res.json({
                                   message: 'Password Not Matched !'
                              })
                         }
                    })
               } else {
                    res.json({
                         message: 'User Not Found !'
                    })
               }
          })
          .catch(err => {
               res.json({
                    error: err
               })
          })
}

const allUsers = (req, res, next) => {
     const token = req.headers.token
     const user = jwt.verify(token, 'awd12*-?><]0=+abc')
     User.find({ email: { $ne: user.email }, tel: { $ne: user.tel } }).populate("chats").then(users => {
          try {
               const userDetails = []
               users.forEach(item => {
                    userDetails.push({
                         id: item._id,
                         name: item.name,
                         email: item.email,
                         tel: item.tel
                    })
               })
               res.json({
                    users: userDetails,
                    message: 'List of all users registered with us.'
               })
          }
          catch {
               res.json({
                    message: 'Error Occured !'
               })
          }
     })
          .catch(err => res.json({ error: err }))
}

module.exports = { register, login, allUsers }
