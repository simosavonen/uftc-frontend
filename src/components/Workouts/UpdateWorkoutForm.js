import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UpdateWorkoutForm = props => {
  const [amount, setAmount] = useState(props.workout.amount);
  let modDate = moment(props.workout.date).format('ddd MMM Do');

  useEffect(() => {
    if (props.workout) {
      setAmount(props.workout.amount);
    }
  }, [props.workout]);

  const handleMoreClick = event => {
    event.preventDefault();
    setAmount(+amount + 1);
  };

  const handleLessClick = event => {
    event.preventDefault();
    if (amount < 2) {
      setAmount(1);
    } else {
      setAmount(+amount - 1);
    }
  };

  const handleAmountChange = event => {
    if (!Number.isNaN(+event.target.value)) {
      let theValue = +event.target.value;
      if (theValue < 0) {
        theValue = Math.abs(theValue);
      }
      setAmount(theValue);
    }
  };

  const dontAllowZero = event => {
    event.preventDefault();
    if (amount === 0) setAmount(1);
  };

  const submit = event => {
    event.preventDefault();

    const workout = {
      id: props.workout.workoutid,
      activity: props.workout.activity,
      instance: {
        id: props.workout._id,
        date: props.workout.date,
        amount: amount
      }
    };
    props.updateWorkout(workout);
  };

  return (
    <div className="box">
      <form onSubmit={submit}>
        <label className="label has-text-centered">{props.workout.activityname}</label>
        <label className="label has-text-centered">Number of workouts:</label>
        <div className="field is-grouped">
          <p className="control">
            <button className="button is-danger is-large" onClick={handleLessClick}>
              <span className="icon is-large">
                <FontAwesomeIcon icon="minus" />
              </span>
            </button>
          </p>

          <div className="control is-expanded">
            <input
              className="input"
              type="text"
              min="1"
              value={amount}
              onChange={handleAmountChange}
              onBlur={dontAllowZero}
            />
          </div>

          <p className="control">
            <button className="button is-success is-large" onClick={handleMoreClick}>
              <span className="icon is-large">
                <FontAwesomeIcon icon="plus" />
              </span>
            </button>
          </p>
        </div>

        <label className="label has-text-black">Date: {modDate} </label>
        <div>
          <p>
            <button className="button is-success is-fullwidth is-medium">Save changes</button>
            <br />
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button
              className="button is-fullwidth"
              onClick={event => {
                event.preventDefault();
                props.setWorkoutSelected(null);
                props.setShowModal(false);
                let modalWnd = document.querySelector('.modal');
                if (modalWnd) {
                  modalWnd.classList.remove('is-active');
                }
              }}
            >
              Go back
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default UpdateWorkoutForm;
