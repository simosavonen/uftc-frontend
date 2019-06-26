import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ChallengeList from './components/ChallengeList';

const App = () => {
  const [challenges, setChallenges] = useState([]);
  const [activities, setActivities] = useState([]);

  const user = {
    id: 1,
    name: 'Jaska Jokunen'
  };

  useEffect(() => {
    axios.get('http://localhost:3001/challenges').then(response => {
      setChallenges(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/activities').then(response => {
      setActivities(response.data);
    });
  }, []);

  return (
    <>
      <ChallengeList challenges={challenges} activities={activities} />
    </>
  );
};
export default App;
