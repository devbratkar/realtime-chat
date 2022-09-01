import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const Login = ({ login, user }) => {
     const navigate = useNavigate()
     const [userInput, setUserInput] = useState('')

     const joinChatInputHandler = (e) => {
          setUserInput(e.target.value)
     }

     const joinChatHandler = (e) => {
          e.preventDefault()

          axios.post('https://realtime-chat-dev.herokuapp.com/login', {
               id: userInput
          }).then(res => {
               login(true)
               user(userInput)
               setUserInput('')
               setTimeout(() => {
                    navigate('/chat', { replace: true })
               }, 500)
          }).catch(err => console.log(err))
     }

     return (
          <form onSubmit={joinChatHandler} className='sendMsgForm'>
               <input type={'tel'} placeholder="Enter your name" value={userInput} onChange={joinChatInputHandler} />
               <button type='submit'>Join Chat</button>
          </form>
     )
}

export default Login