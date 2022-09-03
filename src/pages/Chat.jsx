import '../App.css';
import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { useNavigate } from 'react-router';

// const socket = io("https://realtime-chat-dev.herokuapp.com");
const socket = io("http://localhost:3002");

let userDetails = {}

const joinedChatCss = {
     backgroundColor: 'transparent',
     color: 'grey',
     opacity: '0.5',
     width: '100%',
     textAlign: 'center',
}

function Chat({ login }) {
     const navigate = useNavigate()
     const [input, setInput] = useState('')
     const [message, setMessage] = useState([])
     const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')))

     useEffect(() => {
          const session = JSON.parse(sessionStorage.getItem('user'))
          if (session.token) setUser(session)
          else {
               login(false)
               sessionStorage.removeItem('user')
               navigate('/', { replace: true })
          }
     }, [])

     useEffect(() => {
          socket.emit('join_room', user.name)

          socket.on("user_joined_msg", user => {
               userDetails = { ...user }
               // the user containes the name and socket id which is used to check whether the msg is send by us or not and according to that we display the chat to the left or right on the chat container.
               setMessage(p => {
                    const msg = user.name + ' joined the chat'
                    return [...p, { msg, joined: true }]
               })
          })
     }, [])

     const sendHandler = (e) => {
          e.preventDefault()
          setMessage(p => {
               if (input === '') {
                    return [...p]
               }
               return [...p, { name: user.name, msg: input }]
          })
          socket.emit('message', input)
          setInput('')
     }

     const logoutHandler = () => {
          login(false)
          sessionStorage.removeItem('user')
          navigate('/', { replace: true })
     }

     useEffect(() => {
          let chat = document.querySelector('.chatContainer')
          chat.scrollTo(0, chat.scrollHeight)
     })

     useEffect(() => {
          socket.on("msg", msg => {
               setMessage(p => {
                    return [...p, msg]
               })
          })

     }, [])

     function checkId(id) {
          if (id === userDetails.socketId) return true;
          return false
     }

     return (
          <div className='container'>
               <div className='chatContainer'>
                    {message.map((item, i) => {
                         return (
                              <div className={checkId(item.name?.id) ? `right msgContainer` : `left msgContainer`} key={i}>
                                   <div
                                        className={checkId(item.name?.id) ? `rightChatbox` : `leftChatbox`}
                                        style={item.joined ? { ...joinedChatCss } : {}}
                                   >
                                        <div className='username'>
                                             {item.name?.name}
                                        </div>
                                        <div>
                                             {item.msg}
                                        </div>
                                   </div>
                              </div>
                         )
                    })}
               </div>
               <form onSubmit={sendHandler} className='sendMsgForm'>
                    <input type={'text'} placeholder='Enter your message' value={input} onChange={(e) => setInput(e.target.value)} />
                    <button>Send</button>
               </form>
          </div>
     );
}

export default Chat;
