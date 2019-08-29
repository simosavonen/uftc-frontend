import React from 'react';
import moment from 'moment';

const DailyChallenge = ({ workouts, activities, challenge, achievements }) => {
  if (!challenge || !activities.length || !workouts.length || !achievements.length) return null;
  let todaysChallenges = [];

  if (achievements && achievements.length) {
    todaysChallenges = achievements.filter(achs => moment(achs.date).isSame(moment(), 'day'));
  }

  let progress = 0;
  if (challenge) {
    const today = moment();
    const bonus = challenge.pointBonus;

    for (const workout of workouts) {
      const points = activities.find(act => {
        return act.id === workout.activity;
      }).points;

      for (const instance of workout.instances) {
        const result = instance.amount * points * bonus;
        if (today.isSame(instance.date, 'day')) {
          progress += result;
        }
      }
    }
  }

  if (!todaysChallenges.length > 0) return null;
  else
    return (
      <div>
        <h3 className="title is-5">Today's challenge</h3>
        {todaysChallenges.map(a => {
          const challengeProgress = progress >= a.requirement ? a.requirement : progress;
          return (
            <div key={a.id}>
              <div className="box notification">
                <span className="has-text-weight-semibold">{a.name}</span>
                <p style={{ padding: '0.5em 0' }}>
                  Get <strong>{a.requirement} points</strong> total in any activities
                </p>
                <span>
                  <progress
                    className="progress is-info"
                    value={challengeProgress}
                    max={a.requirement}
                  >
                    {challengeProgress}
                  </progress>
                </span>
                <span>
                  {Math.floor(challengeProgress)}/{a.requirement}
                </span>
                {progress >= a.requirement && (
                  <p className="has-text-weight-semibold">Well done!</p>
                )}
                {a.pointsReward > 0 && (
                  <p className="has-text-danger">Reward: {a.pointsReward} points</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
};

export default DailyChallenge;
