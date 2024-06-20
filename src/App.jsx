import React from "react";
import Home from "./components/Home";
import VideoBg from "./assets/net4.mp4";

import "./App.css";

function App() {
  return(
  <div >
    
    <div id="background">
    <video src={VideoBg} autoPlay muted loop id="background-video" style={{opacity:'20%'}} />
    </div>
    
    <Home />

  </div>
  )
      
  
  
}
export default App;
