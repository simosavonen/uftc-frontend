import React from 'react';
import AddWorkoutForm from './AddWorkoutForm';
import UpdateWorkout from './UpdateWorkout';
import { icon } from '../Activities/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

      <section style={{ padding: '1rem 1.5rem' }}>
        <div className="columns is-centered">
          <div className="column is-7-tablet is-6-desktop is-5-widescreen is-4-fullhd">
            <div className="message">
              <div className="message-header">Instructions</div>
              <div className="message-body">
                {activity.description !== '' && (
                  <div className="content">{activity.description}</div>
                )}
                {activity.url !== '' && (
                  <a href={activity.url} target="_blank" rel="noopener noreferrer">
                    <div className="media" style={{ padding: '1.5em' }}>
                      <div className="media-left">
                        <FontAwesomeIcon icon={['fab', 'youtube']} size="3x" color="#ff2457" />
                      </div>
                      <div className="media-content">
                        <h1 className="title is-6">play the video</h1>
                        <h2 className="subtitle is-7">{activity.url}</h2>
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {activity.url !== '' && (
        <section style={{ padding: '1rem 1.5rem' }}>
          <div className="columns is-centered">
            <div className="column is-6-tablet is-5-desktop is-4-widescreen is-3-fullhd" />
          </div>
        </section>
      )}

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
