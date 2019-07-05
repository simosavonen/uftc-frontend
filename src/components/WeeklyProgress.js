import React from 'react';
import moment from 'moment';

const WeeklyProgress = ({ workouts }) => {
  let lastWeek = 0;
  let thisWeek = 0;

  const lastMonday = moment().isoWeekday(1 - 7);
  const lastSunday = moment().isoWeekday(7 - 7);
  const monday = moment().isoWeekday(1);
  const sunday = moment().isoWeekday(7);

  workouts.map(w => {
    const points = Math.floor(w.totalPoints / w.totalAmount);
    return w.instances.map(i => {
      if (lastMonday.isSameOrBefore(i.date, 'day') && lastSunday.isSameOrAfter(i.date, 'day')) {
        lastWeek += i.amount * points;
      }
      if (monday.isSameOrBefore(i.date, 'day') && sunday.isSameOrAfter(i.date, 'day')) {
        thisWeek += i.amount * points;
      }
      return null;
    });
  });

  lastWeek = Math.floor(lastWeek * 1.1);
  if (lastWeek < 100) lastWeek = 100;

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
