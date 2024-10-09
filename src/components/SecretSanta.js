import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import { dummyUsers } from '../data/dummyUsers'; 
import '../styles/SecretSanta.css'; 

function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function insertAtRandomPosition(array, item) {
  const randomIndex = Math.floor(Math.random() * (array.length + 1));
  array.splice(randomIndex, 0, item); 
  return array;
}

const generatePairs = employees => {
  const shuffledEmployees = shuffleArray([...employees]); 

  const pairs = shuffledEmployees.map((giver, index) => {
    const receiver = shuffledEmployees[index + 1] || shuffledEmployees[0]; 
    return {
      giver: giver.name,
      receiver: receiver.name
    };
  });

  return pairs;
};

const SecretSanta = () => {
  const { savePairs } = useContext(AuthContext); 
  const [employeeCount, setEmployeeCount] = useState(1); 
  const [error, setError] = useState('');

  const handleGeneratePairs = () => {
    if (employeeCount < 2 || employeeCount > 10) {
      setError('Please enter a number between 2 and 10.');
      return;
    }

    const admin = dummyUsers.find(user => user.username === 'zakira');
    const nonAdminUsers = dummyUsers.filter(user => user.username !== 'zakira');

    const shuffledEmployees = shuffleArray(nonAdminUsers); 
    const limitedEmployees = shuffledEmployees.slice(0, employeeCount - 1); 

    const finalEmployees = insertAtRandomPosition(limitedEmployees, admin);

    const pairs = generatePairs(finalEmployees);
    savePairs(pairs); 
  };

  return (
    <div className="secret-santa-container">
      <div className="secret-santa-form">
        <label>
          Enter the number of employees (2-10):
          <input
            className="secret-santa-input"
            type="number"
            value={employeeCount}
            onChange={e => setEmployeeCount(Number(e.target.value))}
            min="2"
            max="10"
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <button className="secret-santa-button" onClick={handleGeneratePairs}>Generate Pairs</button>
      </div>
    </div>
  );
};

export default SecretSanta;
