import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const WeeklyProgress = () => {
  const [workouts, setWorkouts] = useState([]);
  const [lastWeek, setLastWeek] = useState(0);
  const [thisWeek, setThisWeek] = useState(0);

  // fetch the workouts for this logged in user, with the help
  // of the token from localStorage
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

  // calculate how many points the user earned last week and this week
  // Moment.js makes date calculations easy.
  useEffect(() => {
    let lastW = 0;
    let thisW = 0;

    const lastMonday = moment().isoWeekday(1 - 7);
    const lastSunday = moment().isoWeekday(7 - 7);
    const monday = moment().isoWeekday(1);
    const sunday = moment().isoWeekday(7);

    workouts.map(w => {
      const points = Math.floor(w.totalPoints / w.totalAmount);
      return w.instances.map(i => {
        if (lastMonday.isSameOrBefore(i.date, 'day') && lastSunday.isSameOrAfter(i.date, 'day')) {
          lastW += i.amount * points;
        }
        if (monday.isSameOrBefore(i.date, 'day') && sunday.isSameOrAfter(i.date, 'day')) {
          thisW += i.amount * points;
        }
        return null;
      });
    });

    lastW = Math.floor(lastW * 1.1);
    if (lastW < 100) lastW = 100;

    setLastWeek(lastW);
    setThisWeek(thisW);
  }, [workouts]);

  return (
    <div className="has-text-centered">
      <p>
        {thisWeek} / {lastWeek}
      </p>
      <p>
        <progress className="progress is-danger" value={thisWeek} max={lastWeek} />
      </p>
      <p>weekly progress</p>
    </div>
  );
};

export default WeeklyProgress;
