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
      <div className="section container">
        <h4 className="title is-4">{activity.name}</h4>

        {/* tähän yleistä tietoa  urheilulajista */}
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
      <section className="section container">
        <AddWorkoutForm addWorkout={addWorkout} activity={activity} />
      </section>
    </>
  );
};

export default WorkoutView;
