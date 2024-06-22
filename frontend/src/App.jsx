import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Botnet from './components/Botnet';
import VideoBg from "./assets/net4.mp4";
import SignIn from "./components/SignIn";

import "./App.css";

function App() {
  return(
    <>
  <div >
    
    <div id="background">
    <video src={VideoBg} autoPlay muted loop id="background-video" style={{opacity:'20%'}} />
    </div>

  </div>
  
  <Router>
  <Routes>
  <Route path="/" element={<Home/>} />
    <Route path="/logout" element={<SignIn />} />
    <Route path="/attacks" element={<Botnet />} />
  </Routes>
</Router>

</>
  )
      
  
  
}
export default App;
