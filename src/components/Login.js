import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 

const Login = () => {
  const { login, error, user } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = e => {
    e.preventDefault();
    login(username);
  };

  return (
    <div className="login-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#ae0000" className="bi bi-gift-fill" viewBox="0 0 16 16">
            <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A3 3 0 0 1 3 2.506zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43zM9 3h2.932l.023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0zm6 4v7.5a1.5 1.5 0 0 1-1.5 1.5H9V7zM2.5 16A1.5 1.5 0 0 1 1 14.5V7h6v9z"/>
        </svg>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="login-input"
        />
        <button type='submit' className="login-button">
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
