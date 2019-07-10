import React from 'react';
import moment from 'moment';

const placeholder = {
  organizers: ['5d1798065367df2f28dd0708'],
  activities: [],
  name: 'loading...',
  pointsGoal: 7500,
  releaseDate: '2019-07-01',
  startDate: '2019-07-10',
  endDate: '2019-07-20',
  deadline: '2019-12-14',
  seriesTitle: 'Placeholder',
  pointBonus: 1,
  id: '5d1c5237c360412fbcc98dcc'
};

const challengeTiming = challenge => {
  const start = moment(challenge.startDate);
  const end = moment(challenge.endDate);

  const length = end.diff(start, 'days');
  const today = moment();
  let timing = '';
  if (today < start) {
    timing = 'Challenge starts ' + start.fromNow();
  } else if (today.isSame(start, 'day')) {
    timing = 'Challenge starts today!';
  } else if (today.isAfter(start, 'day') && today.isSameOrBefore(end, 'day')) {
    timing = 'Day ' + today.diff(start, 'days') + '/' + length;
  } else if (today.isAfter(end, 'day')) {
    timing = 'Challenge has ended!';
  } else timing = '';
  return timing;
};

const ChallengeTitle = ({ challenge = placeholder }) => {
  return (
    <div>
      {challenge.name}

      <p>{challengeTiming(challenge)}</p>
    </div>
  );
};

export default ChallengeTitle;
