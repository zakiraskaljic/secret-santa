import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom'; 
import '../styles//Dashboard.css';

const Dashboard = ({ setPairs }) => {
    const { logout, user, pairs } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout();
      navigate('/');
    };
  
    const userPairs = user?.role === 'Employee' ? 
      pairs.filter(pair => pair.giver === user.name) : 
      pairs;
  
    return (
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h2>Your Assigned Pairs</h2>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
          {userPairs.length > 0 ? (
            <ul>
              {userPairs.map((pair, index) => (
                <li key={index}>
                  {pair.giver} → {pair.receiver}
                </li>
              ))}
            </ul>
          ) : (
            <p>No pairs assigned yet.</p>
          )}
        </div>
      </div>
    );
  };
  
export default Dashboard;
