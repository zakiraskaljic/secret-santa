import React, { createContext, useState } from 'react';
import { dummyUsers } from '../data/dummyUsers'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [pairs, setPairs] = useState([]);
  const [error, setError] = useState('');

  const login = username => {
    const foundUser = dummyUsers.find(u => u.username === username); 
    if (foundUser) {
      setUser(foundUser);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
  };

  const savePairs = newPairs => {
    setPairs(newPairs);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error, pairs, savePairs }}>
      {children}
    </AuthContext.Provider>
  );
};

