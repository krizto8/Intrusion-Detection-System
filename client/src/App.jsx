import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import VideoBg from "./assets/net4.mp4";
import Botnet from './components/Botnet';
import Bruteforce from './components/Bruteforce';
import DDoS from './components/DDoS';
import DoS from './components/DoS';
import Infiltration from './components/Infiltration';
import ChartComponent from './components/ChartComponent';
import Login from "./components/Login";
import SignUp from "./components/SignUp";

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
    <Route path="/" element={<Login/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/home" element={<Home/>} />
    <Route path="/logout" element={<Login />} />
    <Route path="/attacks" element={<Home />} />
    <Route path="/attacks/botnet" element={<Botnet />} />
    <Route path="/attacks/bruteforce" element={<Bruteforce />} />
    <Route path="/attacks/ddos" element={<DDoS />} />
    <Route path="/attacks/dos" element={<DoS />} />
    <Route path="/attacks/infiltration" element={< Infiltration/>} />
    <Route path="/capture" element={<ChartComponent />} />
    <Route path="/data" element={<DoS />} />
    <Route path="/logs" element={< Infiltration/>} />

  </Routes>
</Router>

</>
  )
      
  
  
}
export default App;
