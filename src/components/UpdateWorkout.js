import React, { useState } from 'react';
import UpdateWorkoutForm from './UpdateWorkoutForm';

const UpdateWorkout = props => {
  const [workoutSelected, setWorkoutSelected] = useState(null);

  let oneTypeActLenght;

  const dayAndActivity = () => {
    const actNameTbl = [];
    let oneTypeAct = [];

    if (!props.workouts) return 'workouts oli null tai undefined';

    props.workouts.map(item => {
      const a = item.activity;
      const _workoutid = item.id;
      return item.instances.map(ind => {
        return actNameTbl.push({
          date: ind.date,
          activity: a,
          workoutid: _workoutid,
          amount: ind.amount,
          _id: ind._id
        });
      });
    });

    actNameTbl.sort(cmpAct);

    function cmpAct(a, b) {
      if (a.activity < b.activity) {
        return -1;
      }
      if (a.activity > b.activity) {
        return 1;
      }
      return 0;
    }

    actNameTbl.map(ind => {
      if (ind.activity === props.activity.id) {
        oneTypeAct.push(ind);
      }
      return 0;
    });

    oneTypeActLenght = oneTypeAct.length;

    if (!oneTypeActLenght) {
      return (
        <p>
          <b>Hi there, you can make good exercise!</b>
        </p>
      );
    }

    const updateCall = () => {
      if (workoutSelected) {
        return <UpdateWorkoutForm workout={workoutSelected} updateWorkout={props.updateWorkout} />;
      }
    };

    return (
      <>
        <h1 className="title is-size-4-mobile is-size-3">Your activities</h1>
        <ul>
          {oneTypeAct.map(item => (
            <li key={item.date + item.amount} onClick={() => setWorkoutSelected(item)}>
              {item.date.substr(0, 10)}
              {' \u00b7 '}
              <span style={{ fontSize: 'larger', color: '#ff2457' }}>{item.amount}</span>
            </li>
          ))}
        </ul>
        <div>{updateCall()}</div>
        {workoutSelected && <p onClick={() => setWorkoutSelected(null)}> </p>}
      </>
    );
  };

  return (
    <>
      <div>{dayAndActivity()}</div>
    </>
  );
};
export default UpdateWorkout;
