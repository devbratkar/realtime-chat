const express = require('express')
const router = express.Router()

const ChatCon = require('../controllers/ChatController');

router.get('/:id', ChatCon.getChats);
router.post('/new/:id', ChatCon.newChat)

module.exports = router