import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const AddWorkoutForm = props => {
  const [amount, setAmount] = useState(1);
  const today = new Date().toISOString().substring(0, 10);
  const [date, setDate] = useState(today);

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
      amount: amount,
      date: date,
      activity: props.activity.id
    };
    props.addWorkout(workout);
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
          type="text"
          min="1"
          value={amount}
          onChange={handleAmountChange}
          onBlur={dontAllowZero}
        />
        <button className="button is-danger is-large is-fullwidth" onClick={handleLessClick}>
          -
        </button>
        <label className="label">Date:</label>
        <input
          className="input"
          value={date}
          onChange={({ target }) => setDate(target.value)}
          type="date"
          min={props.challenge && props.challenge.startDate.substr(0, 10)}
          max={today}
        />
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

export default withRouter(AddWorkoutForm);
