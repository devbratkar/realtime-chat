import './App.css';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Route, Routes } from 'react-router';

import Login from './pages/Login'
import Chat from './pages/Chat';
import UserChat from './pages/UserChat';
import CustomSidebar from './components/CustomSidebar';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState('')

  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Login login={setIsLoggedIn} user={setUser} />} />
        <Route path='userChat' element={<UserChat login={setIsLoggedIn} />} />
        {/* <Route path='side' element={<CustomSidebar />} /> */}

        {/* {isLoggedIn && <Route path='chat' exact element={<Chat login={setIsLoggedIn} />} />} */}
      </Route>
    </Routes>
  );
}

export default App;
