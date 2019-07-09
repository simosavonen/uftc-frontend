import React from 'react';
import AddWorkoutForm from './AddWorkoutForm';

const placeholder = {
  name: 'loading...',
  points: 100,
  type: 'Placeholders',
  unit: '1 kg',
  description: 'This is a placeholder object',
  url: 'http://fake.you.tube/123',
  id: '12341234123412341234'
};

const WorkoutView = ({ activity = placeholder, addWorkout }) => {
  return (
    <>
      <div className="section columns is-centered">
        {/* tähän yleistä tietoa  urheilulajista */}
        <div className="column is-6">
          <h4 className="title is-4">{activity.name}</h4>
          <ul>
            <li>Sport activity type: {activity.type}</li>
            <li>Unit: {activity.unit}</li>
            <li>Description: {activity.description}</li>
            {activity.url !== '' && (
              <li>
                Sport activity youtube link:{' '}
                <a href={activity.url} target="_blank">
                  {activity.url}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <section className="section columns is-centered">
        <div className="column is-6 ">
          <AddWorkoutForm addWorkout={addWorkout} activity={activity} />
        </div>
      </section>
    </>
  );
};

export default WorkoutView;
