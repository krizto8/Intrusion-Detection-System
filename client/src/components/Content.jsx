import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./Content.css";

function Content(){
    return (
        <>
        <div className="container">
            <div className="box left">
                <span id="name">NETWORK ANALYSIS & INTRUSION DETECTION SYSTEM</span>
            </div>
            <div className="box right">
                
                <Link to="/capture" as="button" className="custom-btn btn"><span className="text">Start Live Data Capture</span></Link>
                <Link to="/data" as="button" className="custom-btn btn"><span className="text">Enter own data values</span></Link>
                <Link to="/logs" as="button" className="custom-btn btn"><span className="text">view logs</span></Link>
            </div>
        </div>
        {/* <Routes>
            <Route path="/Capture" element={ <Capture />} />
            <Route path="/EnterData" element={ <EnterData />}/>
            <Route path="/Logs" element={ <Logs />}/>
        </Routes> */}
        </>
    )

}

export default Content;