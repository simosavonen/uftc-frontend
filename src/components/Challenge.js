import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Challenge = props => {
  const [activities, setActivities] = useState([]);

  // fetch only a subset of all activities for this current challenge
  useEffect(() => {
    axios
      .get(`http://localhost:3001/challenges/${props.challenge.id}/activities`)
      .then(response => {
        setActivities(response.data);
      });
  }, [props.challenge]);

  return (
    <div>
      {props.challenge.name}
      <ul>
        {activities.map(activity => (
          <li>{activity.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Challenge;
