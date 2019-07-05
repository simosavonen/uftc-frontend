import React from 'react';

const placeholder = {
  organizers: ['5d1798065367df2f28dd0708'],
  activities: [],
  name: 'loading...',
  pointsGoal: 7500,
  releaseDate: '2019-07-01',
  startDate: '2019-08-01',
  endDate: '2019-11-30',
  deadline: '2019-12-14',
  seriesTitle: 'Placeholder',
  pointBonus: 1,
  id: '5d1c5237c360412fbcc98dcc'
};

const ChallengeTitle = ({ challenge = placeholder }) => {
  return <div>{challenge.name}</div>;
};

export default ChallengeTitle;
