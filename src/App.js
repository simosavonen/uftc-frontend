import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChallengeList from './ChallengeList';

const App = () => {
  const [challenges, setChallenges] = useState([]);
  const user = {
    id: 1,
    name: 'Jaska Jokunen'
  };

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
      <ChallengeList challenges={challenges} />
    </div>
  );
};
export default App;
