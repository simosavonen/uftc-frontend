import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import userService from './services/user';
import workoutService from './services/workouts';
import { useResource } from './services/useResource';
import Header from './components/Header';
import AddChallengeForm from './components/AddChallengeForm';
import LoginForm from './components/LoginForm';
import AddActivityForm from './components/AddActivityForm';
import UpdateUserForm from './components/UpdateUserForm';
import AddAchievementForm from './components/AddAchievementForm';
import BadgesView from './components/BadgesView';
import FrontPage from './components/FrontPage';
import Footer from './components/Footer';
import PasswordResetForm from './components/PasswordResetForm';
import RequestResetEmailForm from './components/RequestResetEmailForm';
import StyleGuide from './components/StyleGuide';
import { apiUrls } from './config/config';

import { ActivitiesView, LeaderBoardView, WorkoutView } from './components';

import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';

const App = props => {
  const [workouts, setWorkouts] = useState([]);
  const [user, setUser] = useState(null);
  const [challenges, challengeService] = useResource(apiUrls.challenges);
  const [activities, activityService] = useResource(apiUrls.activities);
  const [achievements, achievementService] = useResource(apiUrls.achievements);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);

      // set the axios global default token
      userService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      workoutService
        .get()
        .then(result => {
          setWorkouts(result.data);
          //console.log('workouts', result.data);
        })
        .catch(error => console.log('workouts', error.message));
    }
  }, [user]);

  const updateUser = updatedUser => {
    userService.update(updatedUser).then(response => {
      const newUserState = { token: user.token, ...response.data };
      setUser(newUserState);
      localStorage.setItem('loggedUser', JSON.stringify(newUserState));
    });
  };

  const addWorkout = workout => {
    workoutService
      .add(workout)
      .then(response => {
        //console.log('response.data', response.data);
        if (!workouts.length) {
          setWorkouts([response.data]);
        } else {
          const workoutsWithNew = workouts.map(w =>
            w.id !== response.data.id ? w : response.data
          );
          setWorkouts(workoutsWithNew);
        }
        toast.success('Workout saved.');
      })
      .catch(error => {
        console.log('addWorkout', error.message);
      });
  };

  const updateWorkout = workout => {
    workoutService
      .update(workout)
      .then(response => {
        const workoutsWithNew = workouts.map(w => (w.id !== response.data.id ? w : response.data));
        setWorkouts(workoutsWithNew);
        toast.success('Workout updated.');
      })
      .catch(error => {
        console.log('updateWorkout', error.message);
      });
  };

  const login = userDetails => {
    userService
      .login(userDetails)
      .then(response => {
        setUser(response.data);
        // set the axios global default token
        userService.setToken(response.data.token);

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

  // todo: more than 1 background image?
  const background = () => {
    return props.location.pathname.startsWith('/login') ? 'kettlebeach' : '';
  };

  // todo: add other colors
  const gradient = () => {
    const path = props.location.pathname;
    switch (path) {
      default:
        // the reset token is added to this, so startsWith()
        if (path.startsWith('/passwordreset')) {
          return 'blue-gradient';
        }
        return '';
    }
  };

  return (
    <div className={`site ${background()}`}>
      <div className={`main ${gradient()}`}>
        {!isAuthenticated() && !isResettingPassword() && <Redirect to="/login" />}
        {isAuthenticated() && <Header logout={logout} />}
        <Switch>
          <Route path="/login" render={() => <LoginForm login={login} register={register} />} />
          <Route
            exact
            path="/activities"
            render={() => (
              <ActivitiesView
                challenges={challenges}
                workouts={workouts}
                activities={activities}
                user={user}
              />
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
                updateWorkout={updateWorkout}
              />
            )}
          />
          <Route path="/leaderboard" render={() => <LeaderBoardView />} />
          <Route
            path="/addchallenge"
            render={() => <AddChallengeForm addChallenge={challengeService.add} />}
          />
          <Route
            path="/addachievement"
            render={() => <AddAchievementForm addAchievement={achievementService.add} />}
          />
          <Route
            path="/badges"
            render={() => (
              <BadgesView workouts={workouts} activities={activities} achievements={achievements} />
            )}
          />
          <Route
            path="/addactivity"
            render={() => <AddActivityForm addActivity={activityService.add} />}
          />
          <Route
            path="/updateuser"
            render={() => <UpdateUserForm updateUser={updateUser} user={user} />}
          />

          <Route exact path="/passwordreset" render={() => <RequestResetEmailForm />} />
          <Route
            exact
            path="/passwordreset/:token"
            render={({ match }) => <PasswordResetForm resetToken={match.params.token} />}
          />
          <Route exact path="/styleguide" render={() => <StyleGuide />} />
          <Route
            exact
            path="/"
            render={() => <FrontPage challenges={challenges} updateUser={updateUser} user={user} />}
          />
        </Switch>
        <ToastContainer pauseOnFocusLoss={false} position="bottom-right" />
        {isAuthenticated() && <Footer />}
      </div>
    </div>
  );
};
export default withRouter(App);
