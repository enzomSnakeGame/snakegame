import './App.css';
import {Routes, Route} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import BoardPage from './pages/Board';
import PendingPage from './pages/pending';
import HomePage  from  './pages/Home';
import PageNotFound from './components/PageNotFound';
import {io} from 'socket.io-client';
import React, { useState,useEffect  } from 'react';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
      setSocket(io("http://localhost:3001"));
  },[])

 

  return (
    <div>
      <Routes> 
        <Route path="/" element={<LoginPage/>} />
        <Route path="/home" element={<HomePage  socket = {socket}/>}/>
      <Route path="/board" element={<BoardPage socket = {socket}/>} />
        <Route path="/pending" element={<PendingPage socket = {socket}/>}/>
        <Route path="/loginPage" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="pageNotFound" element={<PageNotFound />} />
      </Routes>
  </div>
  );
} 

export default App;