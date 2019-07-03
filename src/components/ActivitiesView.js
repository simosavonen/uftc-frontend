import React from 'react';
import ChallengeTitle from './ChallengeTitle';
import WeeklyProgress from './WeeklyProgress';
import RecentActivities from './RecentActivities';
import ActivityMenu from './ActivityMenu';

const ActivitiesView = () => {
  return (
    <div>
      <ChallengeTitle />
      <WeeklyProgress />
      <RecentActivities />

      <ActivityMenu />
    </div>
  );
};

export default ActivitiesView;
