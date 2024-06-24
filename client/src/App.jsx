import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./components/Home";
import VideoBg from "./assets/net4.mp4";
import Botnet from './components/Botnet';
import Bruteforce from './components/Bruteforce';
import DDoS from './components/DDoS';
import DoS from './components/DoS';
import Infiltration from './components/Infiltration';
import ChartComponent from './components/ChartComponent';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { AuthProvider, useAuth } from "./context/AuthContext";

import "./App.css";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const UnauthenticatedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/home" /> : children;
};

function App() {
  return (
    <AuthProvider>
      <div>
        <div id="background">
          <video src={VideoBg} autoPlay muted loop id="background-video" style={{opacity:'20%'}} />
        </div>
      </div>
      
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Navigate to="/home" /></ProtectedRoute>} />
          <Route path="/login" element={<UnauthenticatedRoute><Login /></UnauthenticatedRoute>} />
          <Route path="/signup" element={<UnauthenticatedRoute><SignUp /></UnauthenticatedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/attacks/botnet" element={<ProtectedRoute><Botnet /></ProtectedRoute>} />
          <Route path="/attacks/bruteforce" element={<ProtectedRoute><Bruteforce /></ProtectedRoute>} />
          <Route path="/attacks/ddos" element={<ProtectedRoute><DDoS /></ProtectedRoute>} />
          <Route path="/attacks/dos" element={<ProtectedRoute><DoS /></ProtectedRoute>} />
          <Route path="/attacks/infiltration" element={<ProtectedRoute><Infiltration /></ProtectedRoute>} />
          <Route path="/capture" element={<ProtectedRoute><ChartComponent /></ProtectedRoute>} />
          <Route path="/data" element={<ProtectedRoute><DoS /></ProtectedRoute>} />
          <Route path="/logs" element={<ProtectedRoute><Infiltration /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;