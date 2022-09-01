import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';

import Login from './pages/Login'
import Chat from './pages/Chat';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState('')

  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Login login={setIsLoggedIn} user={setUser} />} />
        {isLoggedIn && <Route path='chat' exact element={<Chat user={user} />} />}
      </Route>
    </Routes>
  );
}

export default App;
