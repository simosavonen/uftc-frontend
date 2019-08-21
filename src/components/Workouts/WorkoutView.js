import React from 'react';
import AddWorkoutForm from './AddWorkoutForm';
import UpdateWorkout from './UpdateWorkout';
import { icon } from '../Activities/utils';

const WorkoutView = ({
  activity,
  addWorkout,
  challenge,
  workouts,
  updateWorkout,
  deleteWorkoutInstance
}) => {
  if (!activity)
    return (
      <div className="section container">
        <h1 className="title">Error: No such activity exists</h1>
      </div>
    );
  if (!challenge)
    return (
      <div className="section container">
        <h1 className="title">Pick a series first.</h1>
      </div>
    );
  return (
    <>
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-7-tablet is-6-desktop is-5-widescreen is-4-fullhd">
            <div className="media">
              <div className="media-left image is-48x48">
                <span className="icon is-large">{icon(activity.icon)}</span>
              </div>
              <div className="media-content">
                <div className="content">
                  <h4 className="title is-size-5-mobile is-size-4">{activity.name}</h4>
                  <h5 className="subtitle is-size-6-mobile is-size-5">1 unit = {activity.unit}</h5>
                </div>
              </div>
              <div className="media-right has-text-right">
                <h1 className="title is-5 has-text-danger">
                  {Math.round(activity.points * challenge.pointBonus * 10) / 10} points
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="columns is-centered">
          <div className="column is-7-tablet is-6-desktop is-5-widescreen is-4-fullhd">
            <AddWorkoutForm
              addWorkout={addWorkout}
              activity={activity}
              challenge={challenge}
              workouts={workouts}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="columns is-centered">
        <div className="column is-7-tablet is-6-desktop is-5-widescreen is-4-fullhd">
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
        </div>        
      </section>
      <section className="section">
        <div className="columns is-centered">
        <div className="column is-7-tablet is-6-desktop is-5-widescreen is-4-fullhd">
          <UpdateWorkout
            workouts={workouts}
            activity={activity}
            updateWorkout={updateWorkout}
            deleteWorkoutInstance={deleteWorkoutInstance}
          />
        </div>
        </div>       
      </section>
    </>
  );
};

export default WorkoutView;
