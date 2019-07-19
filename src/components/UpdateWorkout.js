import React, { useState } from 'react';
import moment from 'moment';
import UpdateWorkoutForm from './UpdateWorkoutForm';

const UpdateWorkout = props => {
  const [workoutSelected, setWorkoutSelected] = useState(null);
  const [showActivities, setshowActivities] = useState(false);

  let oneTypeActLenght;

  const dayAndActivity = () => {
    const actNameTbl = [];
    let oneTypeAct = [];

    if (!props.workouts) return 'workouts oli null tai undefined';

    if (!showActivities) {
      return (
        <div>
          <button
            className="button is-dark is-large is-fullwidth"
            onClick={() => setshowActivities(!showActivities)}
          >
            {showActivities ? 'Hide activities' : 'View activities'}
          </button>
        </div>
      );
    }
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
        return (
          <UpdateWorkoutForm
            key={workoutSelected.date}
            workout={workoutSelected}
            updateWorkout={props.updateWorkout}
          />
        );
      }
    };

    return (
      <>
        <div>
          <button
            className="button is-light is-large is-fullwidth"
            onClick={() => setshowActivities(!showActivities)}
          >
            {showActivities ? 'Hide activities' : 'View activities'}
          </button>
        </div>
        {showActivities && (
          <div>
            <ul>
              {oneTypeAct.map(item => (
                <li key={item.date + item.amount} onClick={() => setWorkoutSelected(item)}>
                  <span
                    style={{
                      fontFamily: 'verdana',
                      fontSize: 'larger',
                      fontWeight: '700',
                      color: '#0f0f0f'
                    }}
                  >
                    {moment(item.date).format('ddd MMM Do')}
                  </span>
                  {' \u00b7 '}
                  <span
                    style={{
                      fontFamily: 'verdana',
                      fontSize: 'larger',
                      fontWeight: '700',
                      color: '#ff2457'
                    }}
                  >
                    {item.amount}
                  </span>
                </li>
              ))}
            </ul>
            <div>{updateCall()}</div>
            {workoutSelected && <p onClick={() => setWorkoutSelected(null)}> </p>}
          </div>
        )}
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
