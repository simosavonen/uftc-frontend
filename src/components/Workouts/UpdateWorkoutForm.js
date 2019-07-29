import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

const UpdateWorkoutForm = props => {
  const [amount, setAmount] = useState(props.workout.amount);
  let modDate = moment(props.workout.date).format('ddd MMM Do');

  //  console.log('updateworkoutform', props.workout);
  const handleMoreClick = event => {
    event.preventDefault();
    setAmount(+amount + 1);
  };

  const handleLessClick = event => {
    event.preventDefault();
    if (amount < 1) {
      setAmount(0);
    } else {
      setAmount(+amount - 1);
    }
  };

  const handleAmountChange = event => {
    let theValue = Number(event.target.value);
    if (theValue < 0) {
      theValue = Math.abs(theValue);
    }
    setAmount(theValue);
  };

  const AllowZero = event => {
    event.preventDefault();
    if (amount <= 0) setAmount(0);
  };

  const submit = event => {
    event.preventDefault();

    const workout = {
      workoutid: props.workout.workoutid,
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
        <label className="label">Suorituskertoja (kpl):</label>
        <button className="button is-success is-large is-fullwidth" onClick={handleMoreClick}>
          +
        </button>
        <input
          className="input"
          type="number"
          min="1"
          value={amount}
          onChange={handleAmountChange}
          onBlur={AllowZero}
        />
        <button className="button is-danger is-large is-fullwidth" onClick={handleLessClick}>
          -
        </button>
        <label className="label has-text-white">Date: {modDate} </label>

        <p>
          <button className="button is-success is-fullwidth">Save</button>
          <br />
          <button
            className="button is-danger is-fullwidth"
            onClick={event => {
              event.preventDefault();
              props.setShowModal(false);
              let modalWnd = document.querySelector('.modal');
              if (modalWnd) {
                modalWnd.classList.remove('is-active');
              }
            }}
          >
            Back
          </button>
        </p>
      </form>
    </div>
  );
};

export default withRouter(UpdateWorkoutForm);
