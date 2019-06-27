import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ChallengeList from './components/ChallengeList';
import Header from './components/Header';
import AddChallengeForm from './components/AddChallengeForm';

const App = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/challenges').then(response => {
      setChallenges(response.data);
    });
  }, []);

  const user = {
    id: 1,
    name: 'Jaska Jokunen'
  };

  return (
    <>
      <Header user={user} />
      <ChallengeList challenges={challenges} />
      <AddChallengeForm />
    </>
  );
};
export default App;
