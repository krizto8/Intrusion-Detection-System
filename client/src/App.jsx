import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation} from 'react-router-dom';
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
import Detail from "./components/Detail";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Model from "./components/Model";

import "./App.css";



const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  const location = useLocation();
  console.log(location);

  if (!isAuthenticated) {
    // Save the current location to state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const UnauthenticatedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    // Redirect to the saved location or home if there's no saved location
    const from = location.state?.from?.path || '/home';
    return <Navigate to={from} replace />;
  }
  

  return children;
};

function App() {

  return (
    <AuthProvider>
      
      <div>
        <div id="background">
          <video src={VideoBg} autoPlay muted loop id="background-video" style={{opacity:'17%'}} />
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
          <Route path="/model" element={<ProtectedRoute><Model /></ProtectedRoute>} />
          <Route path="/flow-detail/:flowId" element={<ProtectedRoute><Detail /></ProtectedRoute>} />
        </Routes>
      </Router>
      
    </AuthProvider>
  );
}

export default App;