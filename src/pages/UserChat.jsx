import axios from 'axios'
import React, { useLayoutEffect, useState } from 'react'
import CustomAppBar from '../components/CustomAppBar'
import CustomSidebar from '../components/CustomSidebar'
import Chat from './Chat'

const UserChat = ({ login }) => {
     const [users, setUsers] = useState([])
     useLayoutEffect(() => {
          axios.get(process.env.REACT_APP_GET_ALL_USERS)
               .then(res => {
                    console.log(res)
                    setUsers(res.data.users)
               })
               .catch(err => console.log(err))
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