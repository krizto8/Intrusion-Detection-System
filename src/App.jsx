import React from "react";
import Navbar from "./components/Navbar.jsx";
import Background from "./components/Background.jsx";
import Content from "./components/Content.jsx";
import Footer from "./components/footer.jsx";

import "./App.css";

function App() {
  return(
  <div>
    
    <Background />;
    <Navbar />;
    <Content />
    <Footer />

  </div>
  )
      
  
  
}
export default App;
