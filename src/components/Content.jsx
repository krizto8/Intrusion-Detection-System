import React from "react";
import "./Content.css";

function Content(){
    return (
        <div className="container">
            <div className="box left">
                <span id="name">NETWORK ANALYSIS & INTRUSION DETECTION SYSTEM</span>
            </div>
            <div className="box right">
                
                <button class="custom-btn btn">Start Live Data Capture</button>
                <button class="custom-btn btn">Enter own data values</button>
                <button class="custom-btn btn">view logs</button>
            </div>
        </div>
    )

}

export default Content;