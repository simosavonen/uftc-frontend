import React from 'react';
import ChallengeTitle from './ChallengeTitle';
import WeeklyProgress from './WeeklyProgress';
import RecentActivities from './RecentActivities';
import ActivityMenu from './ActivityMenu';

const ActivitiesView = ({ challenges, workouts }) => {
  const activities = challenges.length ? challenges[0].activities : [];

  return (
    <div>
      <div className="section columns is-centered">
        <div className="column is-4">
          <ChallengeTitle challenge={activities} />
        </div>
        <div className="column is-4">
          <WeeklyProgress workouts={workouts} />
        </div>
      </div>

      <RecentActivities activities={activities} workouts={workouts} />

      <ActivityMenu activities={activities} />
    </div>
  );
};

export default ActivitiesView;
