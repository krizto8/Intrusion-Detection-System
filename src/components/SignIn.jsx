// src/components/SignIn.js
import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useHistory } from 'react-router-dom';
import './SignIn.css'; // Import the CSS file

function SignIn(){
//   const { signIn } = useAuth();
//   const history = useHistory();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignIn = (e) => {
//     e.preventDefault();
//     signIn(); // This is just a placeholder for actual sign-in logic
//     history.push('/home');
//   };

  return (
    
    <div >
      <form>
        <h3>Sign In</h3>

        <label for="username">Email</label>
        <input type="text" placeholder="Email" id="username"/>

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password"/>

        <button>Log In</button>
      </form>
      <h5 id="text">IF YOU ARE NOT REGISTERED, YOUR EMAIL WILL BE USED TO CREATE A NEW ACCOUNT</h5>
    </div>
  );
};

export default SignIn;
