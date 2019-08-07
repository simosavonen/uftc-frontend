import React from 'react';
import AccordionList from './AccordionList';

const ActivityMenu = props => {
  const activities = props.activities;

  const activityTypes = Array.from(new Set(activities.map(a => a.type)));

  return (
    <div>
      <h1 className="title is-size-4-mobile is-size-3">Select an activity</h1>
      {activityTypes.map((activityType, rowIndex) => (
        <AccordionList
          row={rowIndex}
          type={activityType}
          activities={activities.filter(a => {
            return a.type === activityType;
          })}
          key={activityType}
        />
      ))}
    </div>
  );
};

export default ActivityMenu;
