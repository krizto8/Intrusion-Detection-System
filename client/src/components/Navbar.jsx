import React, {useEffect, useState } from "react";
import "./Navbar.css";
import imgURL from "../assets/profile.png";
import homeURL from "../assets/favicon.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [ipAddress, setIpAddress] = useState('');
  const [countryFlag, setCountryFlag] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch IP address
    const fetchIpAddress = async () => {
      try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        setIpAddress(data.ip);
        fetchCountryFlag(data.country); // Fetch country flag based on country code
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    // Function to fetch country flag using restcountries API
    const fetchCountryFlag = async (countryCode) => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const data = await response.json();
        if (data[0].flags.svg) {
          setCountryFlag(data[0].flags.svg); // Set country flag URL
        }
      } catch (error) {
        console.error('Error fetching country flag:', error);
      }
    };

    // Call fetchIpAddress when component mounts
    fetchIpAddress();
  }, []);

  const handleLogout = () => {
    logout(); 
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-5-strong">
      <div className="container-fluid">
        <span className="ip">IP : {ipAddress} <img src={countryFlag} style={{ width: '30px', height: '20px', marginBottom:'6px' }}/></span>
        <div className="buttons">
          <Link to="/home"><img src={homeURL} style={{ width: '55px', height: '45px', marginTop:'32px', marginRight:"35px"}}/></Link>
          <Link to="/model" as="button" className="custom-btn1 btn-3"><span>ABOUT THE MODEL</span></Link>
          <div className="dropdown">
            <Link to="" as="button" className="custom-btn1 btn-3"><span>TYPES OF ATTACKS</span></Link>
            <div className="dropdown-content">
              <Link to="/attacks/botnet">Botnet</Link>
              <Link to="/attacks/bruteforce">Bruteforce</Link>
              <Link to="/attacks/ddos">DDoS</Link>
              <Link to="/attacks/dos">DoS</Link>
              <Link to="/attacks/infiltration">Infiltration</Link>
            </div>
          </div>
          <button onClick={handleLogout} id="logout" className="custom-btn1 btn-3"><span><img src={imgURL} style={{height:'25px', width:'25px'}}/> LOG OUT</span></button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

