import React from 'react';

const placeholder = {
  name: 'loading...',
  points: 100,
  type: 'Placeholders',
  unit: '1 kg',
  description: 'This is a placeholder object',
  url: 'http://fake.you.tube/123',
  id: '12341234123412341234'
};

const WorkoutView = ({ activity = placeholder }) => {
  return (
    <div className="section container">
      <h4 className="title is-4">{activity.name}</h4>
    </div>
  );
};

export default WorkoutView;
