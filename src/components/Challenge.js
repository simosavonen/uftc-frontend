import React from 'react';
const Challenge = props => {
  return (
    <div>
      {props.challenge.name}
      <ul>
        {props.activities.map(a => (
          <li>{a.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default Challenge;
