import React from 'react';
import ChallengeTitle from './ChallengeTitle';
//import WeeklyProgress from './WeeklyProgress';
import CircleProgress from './CircleProgress';
import RecentActivities from './RecentActivities';
import ActivityMenu from './ActivityMenu';
import DailyChallenge from './DailyChallenge';

const ActivitiesView = ({ challenge, activities, workouts, user, achievements }) => {
  //const [todaysChallenge, setTodaysChallenge] = useState([]);
  console.log('render activitiesview, achievements:', achievements);

  return (
    <>
      <section className="section is-hidden-mobile">
        <div className="columns is-centered">
          <div className="column has-text-centered is-6-tablet is-5-desktop is-4-widescreen">
            <ChallengeTitle challenge={challenge} />
            <div style={{ margin: '2em auto 1em' }}>
              <h3 className="title is-5">Today's challenge</h3>
              <DailyChallenge workouts={workouts} activities={activities} challenge={challenge} />
            </div>
          </div>

          <div className="column is-1-desktop" />
          <div className="column has-text-centered is-6-tablet is-5-desktop is-4-widescreen">
            <CircleProgress
              workouts={workouts}
              activities={activities}
              challenge={challenge}
              user={user}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="columns is-centered">
          <div className="column has-text-centered is-6-tablet is-5-desktop is-4-widescreen">
            <RecentActivities activities={activities} workouts={workouts} challenge={challenge} />
          </div>
          <div className="column is-1-desktop" />
          <div className="column has-text-centered is-6-tablet is-5-desktop is-4-widescreen">
            <ActivityMenu activities={activities} challenge={challenge} />
          </div>
        </div>
      </section>

      <section className="section is-hidden-tablet">
        <div className="columns is-centered">
          <div className="column has-text-centered is-6-tablet is-5-desktop is-4-widescreen">
            <ChallengeTitle challenge={challenge} />
          </div>
          <div className="column has-text-centered is-6-tablet is-5-desktop is-4-widescreen">
            <CircleProgress workouts={workouts} activities={activities} challenge={challenge} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ActivitiesView;
