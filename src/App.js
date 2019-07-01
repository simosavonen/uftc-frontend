import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import ChallengeList from './components/ChallengeList';
import Header from './components/Header';
import AddChallengeForm from './components/AddChallengeForm';
import LoginForm from './components/LoginForm';

const App = () => {
  const [challenges, setChallenges] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3002/challenges')
      .then(response => {
        setChallenges(response.data);
      })
      .catch(error => {
        console.log('getChallenges', error.message);
      });
  }, []);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON));
    }
  }, []);

  const addChallenge = challenge => {
    axios
      .post('http://localhost:3002/challenges', challenge)
      .then(response => {
        setChallenges(challenges.concat(response.data));
      })
      .catch(error => {
        console.log('addChallenge', error.message);
      });
  };

  const login = userDetails => {
    axios
      .post('http://localhost:3001/api/users/login', userDetails)
      .then(response => {
        setUser(response.data);
        localStorage.setItem('loggedUser', JSON.stringify(response.data));
      })
      .catch(error => {
        console.log('login', error.message);
      });
  };

  const register = userDetails => {
    axios
      .post('http://localhost:3001/api/users/register', userDetails)
      .then(response => {
        login(response.data);
      })
      .catch(error => {
        console.log('register', error.message);
      });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedUser');
  };

  return (
    <Router>
      <Header user={user} logout={logout} />
      <Switch>
        {!user && <Route path="/" render={() => <LoginForm login={login} register={register} />} />}
        <Route exact path="/" render={() => <ChallengeList challenges={challenges} />} />
        <Route
          exact
          path="/addchallenge"
          render={() => <AddChallengeForm addChallenge={addChallenge} />}
        />
      </Switch>
    </Router>
  );
};
export default App;
