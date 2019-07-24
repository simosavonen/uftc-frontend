import React, { useState } from 'react';
import moment from 'moment';
import UpdateWorkoutForm from './UpdateWorkoutForm';
import posed from 'react-pose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UpdateWorkout = props => {
  const [workoutSelected, setWorkoutSelected] = useState(null);
  const [showActivities, setshowActivities] = useState(false);
  const [opened, setOpened] = useState(false);

  const handleClick = () => {
    setOpened(!opened);
    setshowActivities(!showActivities);
  };

  const Icon = posed.div({
    up: {
      rotate: '0deg'
    },
    down: {
      rotate: '180deg'
    }
  });

  let oneTypeActLenght;

  const dayAndActivity = () => {
    const actNameTbl = [];
    let oneTypeAct = [];
    let nameTbl;

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
        return (
          <div key={workoutSelected.date} className="modal is-active">
            <div className="modal-background" />
            <div className="modal-content">
              <UpdateWorkoutForm
                key={workoutSelected.date}
                workout={workoutSelected}
                updateWorkout={props.updateWorkout}
              />
            </div>
            <button
              className="modal-close is-large"
              aria-label="close"
              onClick={() => {
                nameTbl = document.querySelector('.modal');
                if (nameTbl) {
                  nameTbl.classList.remove('is-active');
                  if (workoutSelected) {
                    setWorkoutSelected(null);
                  }
                }
              }}
            />
          </div>
        );
      }
    };

    return (
      <>
        <div
          className={`columns is-centered is-mobile has-background-dark has-text-white`}
          style={{ padding: '1vw', margin: '1vw 4vw' }}
          onClick={handleClick}
        >
          <div className="column is-11">
            {' '}
            {showActivities ? 'Hide activities' : 'Your history'}{' '}
          </div>

          <Icon className="column is-1" pose={opened ? 'up' : 'down'}>
            <FontAwesomeIcon icon="angle-up" />
          </Icon>
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
