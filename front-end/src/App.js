import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import BoardPage from './pages/Board';
import CardPage from './pages/Card';
import {io} from 'socket.io-client'
const socket = io("http://localhost:3001");

function App() {
  return (
    <div>

<BrowserRouter>
        <Routes>
        <Route path="/board" element={<BoardPage/>} />
        </Routes>
      </BrowserRouter> 
         <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
           
            <Route path="Card/" element={<CardPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  </div>
    </div>
   

  );
}

export {socket};
export default App;