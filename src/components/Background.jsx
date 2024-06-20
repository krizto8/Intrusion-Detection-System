import React from "react";
import VideoBg from "../assets/net4.mp4";
import "./Background.css";

function Background() {
  return (
    <div id="background">
      <video src={VideoBg} autoPlay muted loop id="background-video" style={{opacity:'20%'}} />
    </div>
  );
}

export default Background;