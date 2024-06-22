import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import VideoBg from "./assets/net4.mp4";
import SignIn from "./components/SignIn";
import Botnet from './components/Botnet';
import Bruteforce from './components/Bruteforce';
import DDoS from './components/DDoS';
import DoS from './components/DoS';
import Infiltration from './components/Infiltration';


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
    <Route path="/home" element={<Home/>} />
    <Route path="/logout" element={<SignIn />} />
    <Route path="/attacks" element={<Home />} />
    <Route path="/attacks/botnet" element={<Botnet />} />
    <Route path="/attacks/bruteforce" element={<Bruteforce />} />
    <Route path="/attacks/ddos" element={<DDoS />} />
    <Route path="/attacks/dos" element={<DoS />} />
    <Route path="/attacks/infiltration" element={< Infiltration/>} />

  </Routes>
</Router>

</>
  )
      
  
  
}
export default App;
