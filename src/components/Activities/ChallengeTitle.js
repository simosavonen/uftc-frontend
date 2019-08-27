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
      <div
        className="notification is-info content"
        dangerouslySetInnerHTML={{ __html: challenge.name }}
      ></div>
      {isOngoing ? (
        <div className="columns is-gapless is-vcentered is-mobile">
          <div className="column is-9">
            <Line
              percent={(dayNum / length) * 100}
              strokeWidth="2"
              strokeColor="#ff2457"
              strokeLinecap="square"
              trailWidth="1"
              style={{ margin: '0.25em 0' }}
            />
          </div>
          <div className="column is-3 is-size-6-tablet is-size-7-mobile">
            {challengeTiming(challenge)}
          </div>
        </div>
      ) : (
        <p className="is-size-6" style={{ margin: '1em' }}>
          {challengeTiming(challenge)}
        </p>
      )}
      <div className="field is-grouped is-grouped-multiline" style={{ padding: '1vw' }}>
        <div className="control">
          <div className="tags has-addons are-medium">
            <span className="tag is-dark">Starts</span>
            <span className="tag is-info">{moment(challenge.startDate).format('MMM Do')}</span>
          </div>
        </div>
        <div className="control">
          <div className="tags are-medium has-addons">
            <span className="tag is-dark">Ends</span>
            <span className="tag is-info">{moment(challenge.endDate).format('MMM Do')}</span>
          </div>
        </div>
        <div className="control">
          <div className="tags has-addons are-medium">
            <span className="tag is-dark">Goal</span>
            <span className="tag is-warning">{challenge.pointsGoal}</span>
          </div>
        </div>
        <div className="control">
          <div className="tags has-addons are-medium">
            <span className="tag is-dark">Series</span>
            <span className="tag is-success">{challenge.seriesTitle}</span>
          </div>
        </div>
        <div className="control">
          <div className="tags has-addons are-medium">
            <span className="tag is-dark">Participants</span>
            <span className="tag is-success">{challenge.participants}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeTitle;
