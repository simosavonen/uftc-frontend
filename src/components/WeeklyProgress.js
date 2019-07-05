import React, { useEffect, useState } from 'react';
import moment from 'moment';

const WeeklyProgress = ({ workouts }) => {
  const [lastWeek, setLastWeek] = useState(0);
  const [thisWeek, setThisWeek] = useState(0);

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
      <p className="title is-4 is-marginless">
        {thisWeek} / {lastWeek}
      </p>
      <p>
        <progress
          className="progress is-danger"
          value={thisWeek}
          max={lastWeek}
          style={{ margin: '3px' }}
        />
      </p>
      <p className="title is-5 is-marginless">weekly progress</p>
    </div>
  );
};

export default WeeklyProgress;
