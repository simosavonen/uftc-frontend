import React, { useState, useEffect } from 'react';
import ChallengeTitle from './ChallengeTitle';
import WeeklyProgress from './WeeklyProgress';
import RecentActivities from './RecentActivities';
import ActivityMenu from './ActivityMenu';

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
      <ChallengeTitle challenge={challenge} />
      <WeeklyProgress activities={activities} />
      <RecentActivities activities={props.activities} />

      <ActivityMenu activities={activities} />
    </div>
  );
};

export default ActivitiesView;
