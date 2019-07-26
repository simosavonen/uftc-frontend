import React from 'react';
import ChallengeTitle from './ChallengeTitle';
import WeeklyProgress from './WeeklyProgress';
import RecentActivities from './RecentActivities';
import ActivityMenu from './ActivityMenu';

const ActivitiesView = ({ challenges, activities, workouts }) => {
  if (challenges.length === 0) return null;

  //console.log('Activitiesview: props.workouts', workouts);
  //console.log('Activitiesview: props.activities', activities);

  return (
    <div>
      <div className="section columns is-centered">
        <div className="column has-text-centered is-6-tablet is-5-desktop is-4-widescreen">
          <ChallengeTitle challenge={challenges[0]} />
        </div>
        <div className="column has-text-centered is-6-tablet is-5-desktop is-4-widescreen">
          <WeeklyProgress workouts={workouts} activities={activities} />
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
