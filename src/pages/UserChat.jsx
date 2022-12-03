import axios from 'axios'
import React, { useLayoutEffect, useState } from 'react'
import CustomAppBar from '../components/CustomAppBar'
import CustomSidebar from '../components/CustomSidebar'
import Chat from './Chat'

const UserChat = ({ login }) => {
     const [users, setUsers] = useState([])
     useLayoutEffect(() => {
          axios.get(process.env.REACT_APP_GET_ALL_USERS, {
               headers: {
                    "token": JSON.parse(sessionStorage.getItem("user")).token
               }
          })
               .then(res => {
                    console.log(res)
                    setUsers(res.data.users)
               })
               .catch(err => console.log(err))

          axios.get("http://localhost:3002/chat/6311669e2fde9d4dda8fe53d", {
               headers: {
                    "token": JSON.parse(sessionStorage.getItem("user")).token
               }
          }).then(res => console.log(res))
     }, [])
     return (
          <div className='userChatContainer'>
               <div className='navbar'>
                    <CustomAppBar login={login} />
               </div>
               <div className='chatDiv'>
                    <div className='chatSidebar'>
                         <CustomSidebar users={users} />
                    </div>
                    <div className='chatScreen'>
                         <Chat login={login} />
                    </div>
               </div>
          </div>
     )
}

export default UserChat