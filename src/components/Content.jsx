import React from "react";
import "./Content.css";

function Content(){
    return (
        <div className="container">
            <div className="box left">
                NETWORK ANALYSIS & INTRUSION DETECTION SYSTEM
            </div>
            <div className="box middle"></div>
            <div className="box right">
                <button class="custom-btn btn">Start Live Data Capture</button>
                <button class="custom-btn btn">Custom Check</button>
            </div>
        </div>
    )

}

export default Content;