import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login } from '../services/auService.js';
import { useAuth } from '../context/AuthContext.jsx';
import './SignIn.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { authenticate } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(formData);
            localStorage.setItem('token', data.token);
            authenticate();
            // Redirect to the previous page or home if no previous page
            const from = location.state?.from?.pathname || "/home";
            navigate(from, { replace: true });
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <h3>Login</h3>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Email"
                        id="username"
                    />
                
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Password"
                        id="password"
                    />
                
                    <button type="submit">Login</button>
                    <div>
                        <p className="para">
                            New user? <Link to="/signup" id="text">Sign Up here</Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;