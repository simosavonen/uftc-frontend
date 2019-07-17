import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const UpdateWorkoutForm = props => {
  const [amount, setAmount] = useState(props.workout.amount);
  //const today = new Date().toISOString().substring(0, 10);
  let modDate = props.workout.date.substring(0, 10);
  //const [date, setDate] = useState(today);

  //console.log('updateworkoutform ', props.workout, props.activity, props.amount);
  console.log('updateworkoutform ', props.workout);
  console.log('amount', amount);
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
    let theValue = Number(event.target.value);
    if (theValue < 0) {
      theValue = Math.abs(theValue);
    }
    setAmount(theValue);
  };

  const dontAllowZero = event => {
    event.preventDefault();

    if (amount === 0) setAmount(1);
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
    console.log('updateworkout', workout);
  };

  return (
    <div>
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
          onBlur={dontAllowZero}
        />
        <button className="button is-danger is-large is-fullwidth" onClick={handleLessClick}>
          -
        </button>
        <label className="label">Date: {modDate} </label>

        <p>
          <button className="button is-success is-fullwidth">Save</button>
          <br />
          <button
            className="button is-danger is-fullwidth"
            onClick={event => {
              event.preventDefault();
              props.history.goBack();
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
//export default UpdateWorkoutForm;
