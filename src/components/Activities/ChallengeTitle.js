import React from 'react';
import moment from 'moment';

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

const ChallengeTitle = ({ challenge }) => {
  if (!challenge) {
    return <div>Pick a series first.</div>;
  }
  return (
    <div className="is-size-4 is-size-3-fullhd">
      <span style={{ fontFamily: 'Verdana', color: '#ff2457', fontSize: 'larger' }}>&#x7b;</span>{' '}
      {challenge.name}{' '}
      <span style={{ fontFamily: 'Verdana', color: '#ff2457', fontSize: 'larger' }}>&#x7d;</span>
      <p>{challengeTiming(challenge)}</p>
    </div>
  );
};

export default ChallengeTitle;
