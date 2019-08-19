import React, { useState } from 'react';
import moment from 'moment';
import UpdateWorkoutForm from './UpdateWorkoutForm';
import posed from 'react-pose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConfirmButton from '../ConfirmButton';
import { ReactComponent as Counter } from '../../images/counter.svg';

const UpdateWorkout = props => {
  const [workoutSelected, setWorkoutSelected] = useState(null);
  const [showActivities, setshowActivities] = useState(false);
  const [opened, setOpened] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
        className={`columns is-centered is-mobile has-background-dark has-text-white-ter is-size-6-mobile is-size-5-tablet is-size-4-desktop is-clickable`}
        style={{ padding: '0.5vw', margin: '1vw 0vw' }}
        onClick={handleClick}
      >
        <div className="column is-10">
          {showActivities ? 'Hide workout history' : 'Show workout history'}
        </div>

        <Icon className="column is-2 has-text-centered" pose={opened ? 'up' : 'down'}>
          <FontAwesomeIcon icon="angle-up" />
        </Icon>
      </div>
      {showActivities && (
        <table className="table is-fullwidth is-narrow is-hoverable">
          <thead>
            <tr>
              <th>Date</th>
              <th className="has-text-centered">
                <Counter height={25} width={25} />
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {oneTypeAct.map(item => (
              <tr key={item.date}>
                <td title="date" className="is-hidden-mobile">
                  {moment(item.date).format('ddd MMM Do')}
                </td>
                <td title="date" className="is-hidden-tablet">
                  {moment(item.date).format('MMM Do')}
                </td>
                <td
                  className="has-text-centered has-text-danger has-text-weight-bold"
                  title="amount"
                >
                  {item.amount}
                </td>
                <td>
                  <div className="buttons is-right">
                    <button
                      className="button is-info is-small is-outlined"
                      onClick={() => {
                        setWorkoutSelected(item);
                        setShowModal(true);
                      }}
                    >
                      <span className="icon">
                        <FontAwesomeIcon icon="edit" />
                      </span>
                      <span>edit</span>
                    </button>

                    <ConfirmButton
                      icon={['far', 'trash-alt']}
                      classNames="is-small is-danger is-outlined"
                      texts={['delete', 'confirm']}
                      action={() =>
                        props.deleteWorkoutInstance({
                          id: item.workoutid,
                          instance: {
                            id: item._id
                          }
                        })
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
    </>
  );
};
export default UpdateWorkout;
