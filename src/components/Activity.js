import react from 'react';

const Activity = props => {
  return (
    <div>
      {props.activities.map(item => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
};
export default Activity;
