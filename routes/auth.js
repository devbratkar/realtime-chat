const express = require('express')
const router = express.Router()

const AuthCon = require('../controllers/AuthController')

router.get('/users', AuthCon.allUsers)
router.post('/signup', AuthCon.register)
router.post('/login', AuthCon.login)

module.exports = router