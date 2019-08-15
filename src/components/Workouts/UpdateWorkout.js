import React, { useState } from 'react';
import moment from 'moment';
import UpdateWorkoutForm from './UpdateWorkoutForm';
import posed from 'react-pose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteWorkout from './DeleteWorkout';

const UpdateWorkout = props => {
  const [workoutSelected, setWorkoutSelected] = useState(null);
  const [showActivities, setshowActivities] = useState(false);
  const [opened, setOpened] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteSelected, setDeleteWorkout] = useState(null);
  const actNameTbl = [];
  let oneTypeAct = [];
  let oneTypeActLenght;

  if (!props.workouts)
    return (
      <p>
        <b>Have nice day !</b>
        <p>hmm, ...it seems that workouts was null or undefined</p>
      </p>
    );

  const handleClick = () => {
    setOpened(!opened);
    setshowActivities(!showActivities);

    if (!showActivities) {
      if (workoutSelected) {
        setWorkoutSelected(null);
        setShowModal(false);
      }
      if (deleteSelected) {
        setDeleteWorkout(null);
        setShowModal(false);
      }
    }
  };

  const Icon = posed.div({
    up: {
      rotate: '0deg'
    },
    down: {
      rotate: '180deg'
    }
  });

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

  oneTypeAct.sort(cmpDescDate);

  function cmpDescDate(a, b) {
    if (b.date < a.date) {
      return -1;
    }
    if (b.date > a.date) {
      return 1;
    }
    return 0;
  }

  oneTypeActLenght = oneTypeAct.length;

  if (!oneTypeActLenght) {
    return (
      <p>
        <b>Hi there, you can make good exercise!</b>
      </p>
    );
  }

  return (
    <>
      <div
        className={`columns is-centered is-mobile has-background-dark has-text-white-ter is-size-6-mobile is-size-5-tablet is-size-4-desktop `}
        style={{ padding: '1vw', margin: '1vw 4vw' }}
        onClick={handleClick}
      >
        <div className="column is-11">{showActivities ? 'Hide activities' : 'Your history'}</div>

        <Icon className="column is-1" pose={opened ? 'up' : 'down'}>
          <FontAwesomeIcon icon="angle-up" />
        </Icon>
      </div>

      {showActivities && (
        <div>
          <ul>
            {oneTypeAct.map(item => (
              <li key={item.date + item.amount}>
                <button
                  key={item.date + item.amount}
                  type="button"
                  onClick={() => {
                    setWorkoutSelected(item);
                    setShowModal(true);
                  }}
                >
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
                </button>
                <button
                  key={'trash' + item.date}
                  type="button"
                  className="fas fa-trash-alt"
                  style={{
                    fontFamily: 'verdana',
                    fontSize: 'larger',
                    fontWeight: '700',
                    color: '#ff2457'
                  }}
                  onClick={() => {
                    setDeleteWorkout(item);
                    setShowModal(true);
                  }}
                >
                  Del
                </button>
              </li>
            ))}
          </ul>
          <p>ul out</p>
          <div>
            {workoutSelected && (
              <div className={`modal ${showModal && 'is-active'}`}>
                <div className="modal-background" />
                <div className="modal-content">
                  <UpdateWorkoutForm
                    workout={workoutSelected}
                    updateWorkout={props.updateWorkout}
                    setWorkoutSelected={setWorkoutSelected}
                    setShowModal={setShowModal}
                  />
                </div>
                <button
                  className="modal-close is-large"
                  aria-label="close"
                  onClick={() => {
                    if (workoutSelected) {
                      setWorkoutSelected(null);
                    }
                    setShowModal(false);
                  }}
                />
              </div>
            )}
          </div>
          <div>
            {deleteSelected && (
              <div className={`modal ${showModal && 'is-active'}`}>
                <div className="modal-background" />
                <div className="modal-content">
                  <DeleteWorkout
                    delWorkout={deleteSelected}
                    setDeleteWorkout={setDeleteWorkout}
                    setShowModal={setShowModal}
                    deleteWorkoutInstance={props.deleteWorkoutInstance}
                  />
                </div>
                <button
                  className="modal-close is-large"
                  aria-label="close"
                  onClick={() => {
                    if (deleteSelected) {
                      setDeleteWorkout(null);
                    }
                    setShowModal(false);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default UpdateWorkout;
