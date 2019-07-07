import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityDetails = props => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/activities`).then(response => {
      setActivities(response.data);
    });
  }, []);

  const name = activities.map(n => n.name);
  const points = activities.map(p => p.points);
  const type = activities.map(t => t.type);
  const unit = activities.map(u => u.unit);
  const description = activities.map(d => d.description);
  const url = activities.map(u => u.url);
  const id = activities.map(i => i.id);
  const i = props.activitiesArrayIndex;

  return (
    <div>
      <ul>
        <li>activitiesArrayIndex: {}</li>
        <li>Name: {name[i]}</li>
        <li>Points: {points[i]}</li>
        <li>Type: {type[i]}</li>
        <li>Unit: {unit[i]}</li>
        <li>Description: {description[i]}</li>
        <li>Url: {url[i]}</li>
        <li>Id: {id[i]}</li>
      </ul>
    </div>
  );
};

export default ActivityDetails;
