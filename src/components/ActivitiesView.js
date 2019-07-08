import React from 'react';
import ChallengeTitle from './ChallengeTitle';
import WeeklyProgress from './WeeklyProgress';
import RecentActivities from './RecentActivities';
import ActivityMenu from './ActivityMenu';

const ActivitiesView = ({ challenges, workouts }) => {
  if (challenges.length === 0) return null;

  const activities = challenges.length ? challenges[0].activities : [];

  return (
    <div>
      <div className="section columns is-centered">
        <div className="column is-4 has-text-centered">
          <ChallengeTitle challenge={challenges[0]} />
        </div>
        <div className="column is-4 has-text-centered">
          <WeeklyProgress workouts={workouts} />
        </div>
      </div>
      <section className="section columns">
        <div className="column has-text-centered">
          <RecentActivities activities={activities} workouts={workouts} />
        </div>
        <div className="column has-text-centered">
          <ActivityMenu className="column is-6" activities={activities} />
        </div>
      </section>
    </div>
  );
};

export default ActivitiesView;
