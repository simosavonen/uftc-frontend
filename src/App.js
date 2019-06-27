import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ChallengeList from './components/ChallengeList';
import Header from './components/Header';
import AddChallengeForm from './components/AddChallengeForm';

const App = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/challenges')
      .then(response => {
        setChallenges(response.data);
      })
      .catch(error => {
        console.log('get', error.message);
      });
  }, []);

  const addChallenge = challenge => {
    axios
      .post('http://localhost:3001/challenges', challenge)
      .then(response => {
        setChallenges(challenges.concat(response.data));
      })
      .catch(error => {
        console.log('post', error.message);
      });
  };

  const user = {
    id: 1,
    name: 'Jaska Jokunen'
  };

  return (
    <>
      <Header user={user} />
      <ChallengeList challenges={challenges} />
      <AddChallengeForm addChallenge={addChallenge} />
    </>
  );
};
export default App;
