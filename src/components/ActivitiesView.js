import React, { useState, useEffect } from 'react';
import ChallengeTitle from './ChallengeTitle';
import WeeklyProgress from './WeeklyProgress';
import RecentActivities from './RecentActivities';
import ActivityMenu from './ActivityMenu';
import ActivityRow from './ActivityRow';
import axios from 'axios';

const ActivitiesView = props => {
  const [activities, setActivities] = useState([]);
  const [challenge, setChallenge] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    if (props.challenges.length) {
      setActivities(props.challenges[0].activities);
      setChallenge(props.challenges[0]);
    }
  }, [props.challenges]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('loggedUser')).token;
    axios.defaults.headers.common['Authorization'] = token;
    axios
      .get('http://localhost:3001/api/workouts')
      .then(result => {
        setWorkouts(result.data);
        //console.log(result.data);
      })
      .catch(error => console.log('weeklyprogress', error.message));
  }, []);

  return (
    <div>
      <div className="section columns is-centered">
        <div className="column is-4">
          <ChallengeTitle challenge={challenge} />
        </div>
        <div className="column is-4">
          <WeeklyProgress workouts={workouts} />
        </div>
      </div>

      <RecentActivities activities={props.activities} workouts={workouts} />

      <ActivityMenu activities={activities} />

      <ActivityRow />
    </div>
  );
};

export default ActivitiesView;
