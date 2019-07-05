import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import './App.css';
//import ChallengeList from './components/ChallengeList';
import Header from './components/Header';
import AddChallengeForm from './components/AddChallengeForm';
import LoginForm from './components/LoginForm';
import ActivitiesView from './components/ActivitiesView';
import AddActivityForm from './components/AddActivityForm';
import ScoresView from './components/ScoresView';

const App = props => {
  const [challenges, setChallenges] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON));
      setToken(JSON.parse(loggedUserJSON).token);
    }
  }, []);

  //useEffect(() => {
  //  axios.defaults.headers.common['Authorization'] = token;
  //}, [token]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/challenges')
      .then(response => {
        setChallenges(response.data);
      })
      .catch(error => {
        console.log('getChallenges', error.message);
      });
  }, []);

  const addChallenge = challenge => {
    axios
      .post('http://localhost:3001/api/challenges', challenge)
      .then(response => {
        setChallenges(challenges.concat(response.data));
      })
      .catch(error => {
        console.log('addChallenge', error.message);
      });
  };

  const addActivity = activity => {
    axios.defaults.headers.common['Authorization'] = token;
    axios
      .post('http://localhost:3001/api/activities/', activity)
      .catch(error => console.log('addActivity', error.message));
  };

  const login = userDetails => {
    axios
      .post('http://localhost:3001/api/users/login', userDetails)
      .then(response => {
        setUser(response.data);
        localStorage.setItem('loggedUser', JSON.stringify(response.data));
        props.history.push('/');
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
    setToken(null);
    localStorage.removeItem('loggedUser');
  };

  const isAuthenticated = () => {
    return localStorage.getItem('loggedUser') !== null;
  };

  return (
    <>
      {!isAuthenticated() && <Redirect to="/login" />}
      <Header user={user} logout={logout} />
      <Switch>
        <Route path="/login" render={() => <LoginForm login={login} register={register} />} />
        <Route path="/activities" render={() => <ActivitiesView challenges={challenges} />} />
        <Route path="/leaderboard" render={() => <ScoresView />} />
        <Route
          path="/addchallenge"
          render={() => <AddChallengeForm addChallenge={addChallenge} />}
        />
        <Route path="/addactivity" render={() => <AddActivityForm addActivity={addActivity} />} />
        <Route
          exact
          path="/"
          render={() => {
            return (
              <div className="section container box has-text-centered">
                etusivu kirjautuneelle käyttäjälle
              </div>
            );
          }}
        />
      </Switch>
    </>
  );
};
export default withRouter(App);
