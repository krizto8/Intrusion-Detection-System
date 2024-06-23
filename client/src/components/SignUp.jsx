
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../services/auService.js';
import './SignIn.css'; // Import the CSS file

function SignUp(){
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      console.log("success");
      window.location.href = 'http://localhost:5173/home';
    } catch (err) {
      console.log(err.response);
      alert(err.response.data.msg);
    }
  };

  return (
    
    <div >
      <form onSubmit={onSubmit}>
        <h3>Sign Up</h3>

        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Email" value={email} onChange={onChange} id="username"/>

        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Password" value={password} onChange={onChange} id="password"/>

        <button>Sign Up</button>
        <p className="para">
        Already registered? <Link to="/login" id="text">Login here</Link>
      </p>
      </form>
      
    </div>
  );
};

export default SignUp;
