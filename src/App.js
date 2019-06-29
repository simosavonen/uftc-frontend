import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';
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
      .get('http://localhost:3001/challenges')
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
      .post('http://localhost:3001/challenges', challenge)
      .then(response => {
        setChallenges(challenges.concat(response.data));
      })
      .catch(error => {
        console.log('addChallenge', error.message);
      });
  };

  const login = userDetails => {
    axios
      .get(`http://localhost:3001/users?email=${userDetails.email}`)
      .then(response => {
        bcrypt.compare(userDetails.password, response.data[0].password, (error, matched) => {
          error && console.log('bcrypt.compare', error.message);
          if (matched) {
            setUser(response.data[0]);
            localStorage.setItem('loggedUser', JSON.stringify(response.data[0]));
          }
        });
      })
      .catch(error => {
        console.log('login', error.message);
      });
  };

  const register = userDetails => {
    const hashed = { ...userDetails, password: bcrypt.hashSync(userDetails.password, 10) };
    axios
      .post('http://localhost:3001/users', hashed)
      .then(response => {
        setUser(response.data);
        localStorage.setItem('loggedUser', JSON.stringify(response.data));
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
