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
        <div className="column has-text-centered is-5-tablet is-4-desktop is-3-widescreen">
          <ChallengeTitle challenge={challenges[0]} />
        </div>
        <div className="column has-text-centered is-5-tablet is-4-desktop is-3-widescreen">
          <WeeklyProgress workouts={workouts} />
        </div>
      </div>
      <section className="container has-text-centered">
        <RecentActivities activities={activities} workouts={workouts} />
      </section>

      <section className="section has-text-centered">
        <ActivityMenu activities={activities} />
      </section>
    </div>
  );
};

export default ActivitiesView;
