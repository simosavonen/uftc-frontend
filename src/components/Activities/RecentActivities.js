import React from 'react';
import ActivityRow from './ActivityRow';

const RecentActivities = props => {
  var lstActNameLenght;

  const dayAndActivity = () => {
    const actNameTbl = [];
    const lastActivities = [];
    const lstActName = [];
    let oldName = '';
    var exist = false;

    if (props.workouts.length === 0 || props.activities.length === 0) {
      return (
        <p>
          <b>Have a nice day !</b>
        </p>
      );
    }

    props.workouts.map(item => {
      const a = item.activity;
      return item.instances.map(ind => {
        return actNameTbl.push({ date: ind.date, activity: a.id });
      });
    });
    actNameTbl.sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    actNameTbl.map(ind => {
      if (oldName !== '') {
        exist = lastActivities.filter(index => index.activity === ind.activity).length > 0; //this activity not listed yet
        if (!exist) {
          if (lastActivities.filter(item => item.date === ind.date).length > 0) {
            lastActivities.push(ind);
          } else if (lastActivities.length <= 2) {
            lastActivities.push(ind);
          }
        }
      } else {
        oldName = ind.activity;
        lastActivities.push(ind);
      }
      return 0;
    });

    lastActivities.map(ind => {
      props.activities.map(item => {
        if (item.id === ind.activity) {
          lstActName.push(item);
        }
        return 0;
      });
      return 0;
    });
    lstActNameLenght = lstActName.length;

    if (!lstActNameLenght) {
      return (
        <p>
          <b>Have a good day !</b>
        </p>
      );
    }

    return (
      <>
        <h1 className="title is-size-4-mobile is-size-3">
          Your <span style={{ fontSize: 'larger', color: '#ff2457' }}>{lstActNameLenght}</span> most
          recent activities
        </h1>

        {lstActName.map(item => (
          <ActivityRow activity={item} key={item.name} />
        ))}
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
