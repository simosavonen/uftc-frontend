import React from 'react';
import ChallengeTitle from './ChallengeTitle';
//import WeeklyProgress from './WeeklyProgress';
import CircleProgress from './CircleProgress';
import RecentActivities from './RecentActivities';
import ActivityMenu from './ActivityMenu';

const ActivitiesView = ({ challenges, activities, workouts }) => {
  if (challenges.length === 0) return null;

  return (
    <>
      <section className="section is-hidden-mobile">
        <div className="columns is-centered">
          <div className="column has-text-centered is-6-tablet is-5-desktop is-4-widescreen">
            <ChallengeTitle challenge={challenges[0]} />
          </div>
          <div className="column has-text-centered is-6-tablet is-5-desktop is-4-widescreen">
            <CircleProgress workouts={workouts} activities={activities} challenge={challenges} />
          </div>
        </div>
      </section>

      <section className="section columns is-centered">
        <div className="column has-text-centered is-6-tablet is-5-desktop is-4-widescreen">
          <RecentActivities activities={activities} workouts={workouts} />
        </div>
        <div className="column has-text-centered is-6-tablet is-5-desktop is-4-widescreen">
          <ActivityMenu activities={activities} />
        </div>
      </section>

      <section className="section is-hidden-tablet">
        <div className="columns is-centered">
          <div className="column has-text-centered is-6-tablet is-5-desktop is-4-widescreen">
            <ChallengeTitle challenge={challenges[0]} />
          </div>
          <div className="column has-text-centered is-6-tablet is-5-desktop is-4-widescreen">
            <CircleProgress workouts={workouts} activities={activities} challenge={challenges} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ActivitiesView;
