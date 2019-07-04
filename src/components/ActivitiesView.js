import React, { useState, useEffect } from 'react';
import ChallengeTitle from './ChallengeTitle';
import WeeklyProgress from './WeeklyProgress';
import RecentActivities from './RecentActivities';
import ActivityMenu from './ActivityMenu';
import ActivityRow from './ActivityRow';

const ActivitiesView = props => {
  const [activities, setActivities] = useState([]);
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    if (props.challenges.length) {
      setActivities(props.challenges[0].activities);
      setChallenge(props.challenges[0]);
    }
  }, [props.challenges]);

  return (
    <div>
      <div className="section columns is-centered">
        <div className="column is-4">
          <ChallengeTitle challenge={challenge} />
        </div>
        <div className="column is-4">
          <WeeklyProgress />
        </div>
      </div>

      <RecentActivities activities={props.activities} />

      <ActivityMenu activities={activities} />

      <ActivityRow />
    </div>
  );
};

export default ActivitiesView;
