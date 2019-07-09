import React from 'react';
import AccordionList from './AccordionList';

const ActivityMenu = props => {
  const activities = props.activities;

  const activityTypes = Array.from(new Set(activities.map(a => a.type)));

  return (
    <div>
      {activityTypes.map(activityType => (
        <AccordionList
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
