import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import AddChallengeForm from './components/AddChallengeForm';
import LoginForm from './components/LoginForm';
import ActivitiesView from './components/ActivitiesView';
import AddActivityForm from './components/AddActivityForm';
import ScoresView from './components/ScoresView';
import ActivityView from './components/ActivityView';
import BadgesView from './components/BadgesView';
import FrontPage from './components/FrontPage';
import Footer from './components/Footer';

import './App.css';

const App = props => {
  const [challenges, setChallenges] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/challenges')
      .then(response => {
        setChallenges(response.data);
      })
      .catch(error => {
        console.log('getChallenges', error.message);
      });

    const loggedUserJSON = localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
      axios
        .get('http://localhost:3001/api/workouts')
        .then(result => {
          setWorkouts(result.data);
          //console.log(result.data);
        })
        .catch(error => console.log('workouts', error.message));
    }
  }, [token]);

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
        setToken(response.data.token);
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
    setWorkouts([]);
    localStorage.removeItem('loggedUser');
  };

  const isAuthenticated = () => {
    return localStorage.getItem('loggedUser') !== null;
  };

  const activityById = id => {
    const activities = challenges.length ? challenges[0].activities : [];
    for (let a of activities) {
      if (a.id.substr(0, 8) === id) {
        return a;
      }
    }
  };

  return (
    <>
      {!isAuthenticated() && <Redirect to="/login" />}
      <Header user={user} logout={logout} />
      <Switch>
        <Route path="/login" render={() => <LoginForm login={login} register={register} />} />
        <Route
          exact
          path="/activities"
          render={() => <ActivitiesView challenges={challenges} workouts={workouts} />}
        />
        <Route
          exact
          path="/activities/:id"
          render={({ match }) => <ActivityView activity={activityById(match.params.id)} />}
        />
        <Route path="/leaderboard" render={() => <ScoresView token={token} />} />
        <Route
          path="/addchallenge"
          render={() => <AddChallengeForm addChallenge={addChallenge} />}
        />
        <Route path="/badges" render={() => <BadgesView />} />
        <Route path="/addactivity" render={() => <AddActivityForm addActivity={addActivity} />} />
        <Route exact path="/" render={() => <FrontPage />} />
      </Switch>
      <Footer />
    </>
  );
};
export default withRouter(App);
