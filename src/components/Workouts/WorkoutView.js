import React from 'react';
import AddWorkoutForm from './AddWorkoutForm';
import UpdateWorkout from './UpdateWorkout';
import { icon } from '../Activities/utils';

const WorkoutView = ({ activity, addWorkout, challenge, workouts, updateWorkout }) => {
  if (!activity)
    return (
      <div className="section container">
        <h1 className="title">Error: No such activity exists</h1>
      </div>
    );
  return (
    <>
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-6-tablet is-5-desktop is-4-widescreen is-3-fullhd">
            <div className="columns is-mobile">
              <div className="column is-2">
                <span className="icon is-large">{icon(activity.icon)}</span>
              </div>
              <div className="column is-10">
                <h4 className="title is-size-5-mobile is-size-4">{activity.name}</h4>
                <h5 className="subtitle is-size-6-mobile is-size-5">1 unit = {activity.unit}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="columns is-centered">
          <div className="column is-6-tablet is-5-desktop is-4-widescreen is-3-fullhd">
            <AddWorkoutForm
              addWorkout={addWorkout}
              activity={activity}
              challenge={challenge}
              workouts={workouts}
            />
          </div>
        </div>
      </section>

      <section className="section columns is-centered">
        <div className="column is-6-tablet is-5-desktop is-4-widescreen is-3-fullhd">
          <ul>
            <li>Sport activity type: {activity.type}</li>
            <li>Unit: {activity.unit}</li>
            <li>Description: {activity.description}</li>
            {activity.url !== '' && (
              <li>
                Sport activity youtube link:{' '}
                <a href={activity.url} target="_blank" rel="noopener noreferrer">
                  {activity.url}
                </a>
              </li>
            )}
          </ul>
        </div>
      </section>
      <section className="section columns is-centered">
        <div className="column is-6-tablet is-5-desktop is-4-widescreen is-3-fullhd">
          <UpdateWorkout workouts={workouts} activity={activity} updateWorkout={updateWorkout} />
        </div>
      </section>
    </>
  );
};

export default WorkoutView;
