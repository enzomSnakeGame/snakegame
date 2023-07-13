import './App.css';
import {Routes, Route} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import BoardPage from './pages/Board';
import PendingPage from './pages/pending';
import HomePage  from  './pages/Home';
import PageNotFound from './components/PageNotFound';
import {io} from 'socket.io-client';
const socket = io("http://localhost:3001");

function App() {
  if(sessionStorage.length == 0){
    return (
      <div>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/LoginPage" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/home" element={<HomePage/>}/>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    ) 
  }

  return (
    <div>
      <Routes> 
        <Route path="/" element={<HomePage/>} />  
        <Route path="/board" element={<BoardPage/>} />            
        <Route path="/pending" element={<PendingPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/loginPage" element={<LoginPage/>} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="pageNotFound" element={<PageNotFound />} />
      </Routes>
  </div>
  );
} 

export {socket};
export default App;