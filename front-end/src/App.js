import './App.css';
import {Routes, Route} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import BoardPage from './pages/Board';
import PendingPage from './pages/pending'
import HomePage  from  './pages/Home'
import Navbar  from './components/NavBar';
import {io} from 'socket.io-client'
import React, { useState,useEffect  } from 'react';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
      setSocket(io("http://localhost:3001"));
  },[])
  // if(!sessionStorage){
  //   console.log("tesst0");
  //   console.log(sessionStorage);
  //   return (
  //     <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  //     <div className="max-w-md w-full space-y-8">
  //       <LoginPage />
  //     </div>
  //     </div>
  //   ) 
  // }

  return (
    <div>
      <Routes> 
      <Route path="/board" element={<BoardPage socket = {socket}/>} />
        <Route path="/Pending" element={<PendingPage socket = {socket}/>}/>
        <Route path="/Home" element={<HomePage socket = {socket}/>}/>
      </Routes>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <header>
          <Navbar/>
        </header>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
        </Routes>
    </div>
  </div>
    </div>
  </div>
  );
} 

export default App;