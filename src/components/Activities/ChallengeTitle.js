import React from 'react';
import moment from 'moment';
import { Line } from 'rc-progress';

const ChallengeTitle = ({ challenge }) => {
  if (!challenge) {
    return <div>Pick a series first.</div>;
  }
  const start = moment(challenge.startDate);
  const end = moment(challenge.endDate);
  const today = moment();
  const dayNum = today.diff(start, 'days') + 1; // starting from 1
  const length = end.diff(start, 'days');
  const isOngoing = today.isSameOrAfter(start, 'day') && today.isBefore(end, 'day');

  const challengeTiming = challenge => {
    let timing = '';
    if (today.isBefore(start, 'day')) {
      timing = 'Challenge starts ' + start.fromNow();
    } else if (isOngoing) {
      timing = 'Day ' + dayNum + '/' + length;
    } else if (today.isSameOrAfter(end, 'day')) {
      timing = 'Challenge has ended!';
    } else timing = '';
    return timing;
  };

  return (
    <div className="is-size-4 is-size-3-fullhd">
      <span style={{ fontFamily: 'Verdana', color: '#ff2457', fontSize: 'larger' }}>&#x7b;</span>{' '}
      {challenge.name}{' '}
      <span style={{ fontFamily: 'Verdana', color: '#ff2457', fontSize: 'larger' }}>&#x7d;</span>
      <p>{challengeTiming(challenge)}</p>
      {isOngoing && (
        <Line
          percent={(dayNum / length) * 100}
          strokeWidth="2"
          strokeColor="#ff2457"
          strokeLinecap="square"
          trailWidth="1"
        />
      )}
    </div>
  );
};

export default ChallengeTitle;
