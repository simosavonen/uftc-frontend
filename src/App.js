import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    console.log('effect');
    axios.get('http://localhost:3001/challenges').then(response => {
      console.log('promise fulfilled');
      setChallenges(response.data);
    });
  }, []);

  console.log('render', challenges.length, 'challenges');

  return (
    <div>
      {challenges.map(challenge => (
        <p>{challenge.name}</p>
      ))}
    </div>
  );
};
export default App;
