import React, { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [ipAddress, setIpAddress] = useState('');
  const [countryFlag, setCountryFlag] = useState('');

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
        console.log(data[0].flags);
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

  return (

    <nav className="navbar navbar-expand-lg navbar-dark shadow-5-strong">
      {/* <!-- Container wrapper --> */}
      <div className="container-fluid">
        {/* <!-- Navbar brand --> */}
        <span className="ip" >IP : {ipAddress} <img src={countryFlag} alt="Country Flag" style={{ width: '30px', height: '20px', marginBottom:'6px' }}/></span>
    
        
      </div>
      {/* <!-- Container wrapper --> */}
    </nav>

  );
}

export default Navbar;
