import '../App.css';
import { useEffect, useState } from 'react';
import { io } from "socket.io-client";

const socket = io("https://realtime-chat-dev.herokuapp.com/");
// const socket = io("http://localhost:3001");
let userDetails = {}
const joinedChatCss = {
     backgroundColor: 'transparent',
     color: 'grey',
     opacity: '0.5',
     width: '100%',
     textAlign: 'center',
}

function Chat({ user }) {
     // const [userInput, setUserInput] = useState({})
     // const [toggle, setToggle] = useState(false)
     const [input, setInput] = useState('')
     const [message, setMessage] = useState([])

     useEffect(() => {
          socket.emit('join_room', user)

          socket.on("user_joined_msg", user => {
               userDetails = { ...user }
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
               return [...p, { name: userDetails.name, msg: input }]
          })
          socket.emit('message', input)
          setInput('')
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
          <div className="App">
               <>

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
                              {/* <button onClick={logoutHandler}>Logout</button> */}
                              <br />
                         </form>
                    </div>

               </>
          </div >
     );
}

export default Chat;
