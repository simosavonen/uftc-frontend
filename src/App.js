import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import userService from './services/user';
import workoutService from './services/workouts';
import challengeService from './services/challenges';
import activityService from './services/activities';
import achievementService from './services/achievements';
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
import PasswordResetForm from './components/PasswordResetForm';
import RequestResetEmailForm from './components/RequestResetEmailForm';

import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';

const App = props => {
  const [challenges, setChallenges] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [activities, setActivities] = useState([]);
  const [achievements, setAchievements] = useState([]);
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

    activityService
      .get()
      .then(response => {
        setActivities(response.data);
      })
      .catch(error => {
        console.log('getActivities', error.message);
      });

    achievementService
      .get()
      .then(response => {
        setAchievements(response.data);
      })
      .catch(error => {
        console.log('getActivities', error.message);
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
    const workoutWithChallengeId = { ...workout, challenge: challenges[0].id };
    workoutService
      .add(workoutWithChallengeId, token)
      .then(response => {
        //console.log('response.data', response.data);
        const workoutsWithNew = workouts.map(w => (w.id !== response.data.id ? w : response.data));
        setWorkouts(workoutsWithNew);
        toast.success('Workout saved.');
      })
      .catch(error => {
        console.log('addWorkout', error.message);
      });
  };

  // eslint-disable-next-line
  const updateWorkout = () => {
    return null;
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
        toast.error('Login failed.');
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

  const isResettingPassword = () => {
    return props.location.pathname.startsWith('/passwordreset');
  };

  const activityById = id => {
    for (let a of activities) {
      if (a.id.substr(0, 8) === id) {
        return a;
      }
    }
  };

  return (
    <div className="site">
      {!isAuthenticated() && !isResettingPassword() && <Redirect to="/login" />}
      <Header user={user} logout={logout} />
      <div className="main">
        <Switch>
          <Route path="/login" render={() => <LoginForm login={login} register={register} />} />
          <Route
            exact
            path="/activities"
            render={() => (
              <ActivitiesView challenges={challenges} workouts={workouts} activities={activities} />
            )}
          />
          <Route
            exact
            path="/activities/:id"
            render={({ match }) => (
              <WorkoutView
                activity={activityById(match.params.id)}
                addWorkout={addWorkout}
                challenge={challenges[0]}
                workouts={workouts}
              />
            )}
          />
          <Route
            path="/leaderboard"
            render={() => <ScoresView token={token} activities={activities} />}
          />
          <Route
            path="/addchallenge"
            render={() => <AddChallengeForm addChallenge={addChallenge} />}
          />
          <Route
            path="/badges"
            render={() => (
              <BadgesView workouts={workouts} activities={activities} achievements={achievements} />
            )}
          />
          <Route path="/addactivity" render={() => <AddActivityForm addActivity={addActivity} />} />
          <Route exact path="/passwordreset" render={() => <RequestResetEmailForm />} />
          <Route
            exact
            path="/passwordreset/:token"
            render={({ match }) => <PasswordResetForm resetToken={match.params.token} />}
          />
          <Route exact path="/" render={() => <FrontPage />} />
        </Switch>
        <ToastContainer pauseOnFocusLoss={false} position="bottom-right" />
      </div>
      <Footer user={user} />
    </div>
  );
};
export default withRouter(App);
