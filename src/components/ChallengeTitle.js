import React from 'react';
import moment from 'moment';

const placeholder = {
  organizers: ['5d1798065367df2f28dd0708'],
  activities: [],
  name: 'loading...',
  pointsGoal: 7500,
  releaseDate: '2019-07-01',
  startDate: '2019-07-01',
  endDate: '2019-10-30',
  deadline: '2019-12-14',
  seriesTitle: 'Placeholder',
  pointBonus: 1,
  id: '5d1c5237c360412fbcc98dcc'
};

const ChallengeTitle = ({ challenge = placeholder }) => {
  const aloitus = moment(challenge.startDate);
  const lopetus = moment(challenge.endDate);

  const erotus = lopetus.diff(aloitus, 'days');

  const today = moment();

  const aloituksesta = aloitus.diff(today, 'days');

  return (
    <div>
      {challenge.name}

      <p>
        {aloituksesta} / {erotus}
      </p>
    </div>
  );
};

export default ChallengeTitle;
