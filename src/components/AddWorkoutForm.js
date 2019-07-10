import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

// propsina se funktio joka lisää suorituksen tietokantaan
// funktio on määritelty tiedostossa App.js
// lisäksi tieto urheilulajista

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

    // luo olio workout, joka pitää sisällään tiedon
    // lukumäärästä, päivästä, urheilulajin id.

    // addWorkout lisää olioon vielä maininnan haasteen id:stä
  };

  //return <form onSubmit={submit}>"lisää urheilusuoritus" -lomake</form>;

  console.log('challenge', props.challenge);

  return (
    <div>
      <form onSubmit={submit}>
        <label className="label">Date</label>
        <input
          className="input"
          value={date}
          onChange={({ target }) => setDate(target.value)}
          type="date"
          min={props.challenge && props.challenge.startDate.substr(0, 10)}
          max={today}
        />
        <div className="section columns is-centered is-mobile">
          <div className="column has-text-right">
            <button className="button is-danger is-large" onClick={handleLessClick}>
              -
            </button>
          </div>
          <div className="column">
            <label className="label">Suorituskertoja (kpl):</label>
            <input
              className="input"
              type="number"
              min="1"
              value={amount}
              onChange={handleAmountChange}
              onBlur={dontAllowZero}
            />
          </div>
          <div className="column">
            <button className="button is-success is-large" onClick={handleMoreClick}>
              +
            </button>
          </div>
        </div>
        <p>
          <button className="button">Save</button>
          <button className="button is-danger" onClick={() => props.history.goBack()}>
            Cancel
          </button>
        </p>
      </form>
    </div>
  );
};

export default withRouter(AddWorkoutForm);
