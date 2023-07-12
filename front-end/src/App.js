import './App.css';
import {Routes, Route} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import BoardPage from './pages/Board';
// import CardPage from './pages/Card';

import PendingPage from './pages/pending'
import HomePage  from  './pages/Home'
import Navbar  from './components/NavBar';

import { io } from 'socket.io-client'

const socket = io("http://localhost:3001");

function App() {

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
        <Route path="/board" element={<BoardPage/>} />            
        <Route path="/Pending" element={<PendingPage/>}/>
        <Route path="/Home" element={<HomePage/>}/>
      </Routes>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* <header>
          <Navbar/>
        </header> */}
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

export {socket};
export default App;