import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, AuthContext } from './components/AuthContext';
import SecretSanta from './components/SecretSanta';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  const { user } = useContext(AuthContext); 
  const [pairs, setPairs] = useState([]);

  if (!user) {
    return null; 
  }

  return (
    <div className='main-container'>
      <Dashboard pairs={pairs} setPairs={setPairs} />
      {user.role === 'Administrator' && <SecretSanta setPairs={setPairs} />}
    </div>
  );
};

const MainApp = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<App />} /> 
      </Routes>
    </Router>
  </AuthProvider>
);

export default MainApp;
