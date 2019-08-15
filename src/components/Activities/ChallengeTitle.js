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
          style={{ margin: '1em 0' }}
        />
      )}
      <div className="field is-grouped is-grouped-multiline">
        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-dark">Start date</span>
            <span className="tag is-info">{moment(challenge.startDate).format('YYYY-MM-DD')}</span>
          </div>
        </div>

        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-dark">End date</span>
            <span className="tag is-info">{moment(challenge.endDate).format('YYYY-MM-DD')}</span>
          </div>
        </div>
      </div>
      <div className="field is-grouped is-grouped-multiline">
        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-dark">Points goal</span>
            <span className="tag is-warning">{challenge.pointsGoal}</span>
          </div>
        </div>
        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-dark">Series</span>
            <span className="tag is-success">{challenge.seriesTitle}</span>
          </div>
        </div>
        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-dark">Point bonus</span>
            <span className="tag is-success">{challenge.pointBonus}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeTitle;
