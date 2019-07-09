import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import userService from './services/user';
import workoutService from './services/workouts';
import challengeService from './services/challenges';
import activityService from './services/activities';
import Header from './components/Header';
import AddChallengeForm from './components/AddChallengeForm';
import LoginForm from './components/LoginForm';
import ActivitiesView from './components/ActivitiesView';
import AddActivityForm from './components/AddActivityForm';
import ScoresView from './components/ScoresView';
import WorkoutView from './components/WorkoutView';
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
    challengeService
      .get()
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
      workoutService
        .get(token)
        .then(result => {
          setWorkouts(result.data);
          //console.log(result.data);
        })
        .catch(error => console.log('workouts', error.message));
    }
  }, [token]);

  const addChallenge = challenge => {
    challengeService
      .add(challenge)
      .then(response => {
        setChallenges(challenges.concat(response.data));
      })
      .catch(error => {
        console.log('addChallenge', error.message);
      });
  };

  const addActivity = activity => {
    activityService.add(activity).catch(error => console.log('addActivity', error.message));
  };

  const addWorkout = workout => {
    // tee axios kutsu joka lisää tietokantaan urheilusuorituksen
    // eli jos lunttaamme REST kutsusta, pitää tietää token, urheilulaji ja haaste.

    // haasteen saa selville täällä App.js, se on challenges[0].id
    // tulevaisuudessa voidaan lukea myös user.activeChallenge

    // POST http://localhost:3001/api/workouts/
    // Content-Type: application/json
    // Authorization: Bearer eyJhb......
    // {
    //   "date": "2019-08-25",
    //   "amount": 34,
    //   "activity": "5d1ece19f5c488558073c824",
    //   "challenge": "5d1c5237c360412fbcc98dcc"
    // }

    // kutsun jälkeen tietokanta ja paikallinen tila eriävät.
    // eli jos tietokantaan lisäys onnistui, pitää urheilusuoritus lisätä App.js tilaan.
    // ts. setWorkouts(workouts.concat(workout)) kunhan syntaksi on oikein

    console.log('workout', workout);
  };

  const login = userDetails => {
    userService
      .login(userDetails)
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
    userService
      .register(userDetails)
      .then(response => {
        login(userDetails);
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
          render={({ match }) => (
            <WorkoutView activity={activityById(match.params.id)} addWorkout={addWorkout} />
          )}
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
