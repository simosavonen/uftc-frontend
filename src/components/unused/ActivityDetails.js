import React from 'react';

const ActivityDetails = ({ activities, activitiesArrayIndex }) => {
  return (
    <div>
      <ul>
        <li>Name: {activities[activitiesArrayIndex].name}</li>
        <li>Points: {activities[activitiesArrayIndex].points}</li>
        <li>Type: {activities[activitiesArrayIndex].type}</li>
        <li>Unit: {activities[activitiesArrayIndex].unit}</li>
        <li>Description: {activities[activitiesArrayIndex].description}</li>
        <li>Url: {activities[activitiesArrayIndex].url}</li>
        <li>Id: {activities[activitiesArrayIndex].id}</li>
      </ul>
    </div>
  );
};

export default ActivityDetails;
