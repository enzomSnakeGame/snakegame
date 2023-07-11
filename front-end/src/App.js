import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import BoardPage from './pages/Board';
import CardPage from './pages/Card';
import HomePage  from  './pages/Home'
import Navbar  from './components/NavBar';

function App() {
  return (
    <div>

<BrowserRouter>
        <Routes>
        <Route path="/board" element={<BoardPage/>} />
        </Routes>
      </BrowserRouter> 
         <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <header>
        <Navbar/>
      </header>
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
           
            <Route path="Card/" element={<CardPage/>}/>
            <Route path="Home/" element={<HomePage/>}/>
            
        </Routes>
      </BrowserRouter>
    </div>
  </div>
    </div>
  </div>
  );
}

export default App;