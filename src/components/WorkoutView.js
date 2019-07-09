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
    <div className="section container">
      <h4 className="title is-4">{activity.name}</h4>

      {/* tähän yleistä tietoa  urheilulajista */}
      <ul>
        <li>Sport activity type: {activity.type}</li>
        <li>Unit: {activity.unit}</li>
        <li>Description: {activity.description}</li>
        <li>Sport activity youtube link: {activity.url}</li>
      </ul>
      <AddWorkoutForm addWorkout={addWorkout} activity={activity} />
    </div>
  );
};

export default WorkoutView;
