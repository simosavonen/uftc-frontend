import React from 'react';

const RecentActivities = props => {
  var threeLastActivitiesNameLenght;

  const dayAndActivity = () => {
    const activityNameTable = [];
    const threeLastActivitiesId = [];
    const threeLastActivitiesName = [];
    let oldName = '';
    var exist = false;

    if (props.workouts.length === 0) {
      return (
        <p>
          <b>Have a nice day !</b>
        </p>
      );
    }
    if (props.activities.length === 0) {
      return (
        <p>
          <b>Have a nice day !</b>
        </p>
      );
    }

    props.workouts.map(item => {
      const a = item.activity;
      return item.instances.map(ind => {
        return activityNameTable.push({ date: ind.date, activity: a });
      });
    });
    activityNameTable.sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    activityNameTable.map(ind => {
      if (oldName !== '') {
        exist = threeLastActivitiesId.includes(ind.activity);
        if (!exist) {
          threeLastActivitiesId.push(ind.activity);
        }
      } else {
        oldName = ind.activity;
        threeLastActivitiesId.push(ind.activity);
      }
      return 0;
    });

    threeLastActivitiesId.map(ind => {
      props.activities.map(item => {
        if (item.id === ind) {
          threeLastActivitiesName.push(item.name);
        }
        return 0;
      });
      return 0;
    });
    threeLastActivitiesNameLenght = threeLastActivitiesName.length;

    return (
      <>
        <b> Your {threeLastActivitiesNameLenght} most recent activities </b>
        <ol>
          {threeLastActivitiesName.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </>
    );
  };

  return (
    <>
      <div>{dayAndActivity()}</div>
    </>
  );
};

export default RecentActivities;
