import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

// propsina se funktio joka lisää suorituksen tietokantaan
// funktio on määritelty tiedostossa App.js
// lisäksi tieto urheilulajista

const AddWorkoutForm = props => {
  const [amount, setAmount] = useState(1);
  const [date, setDate] = useState('');
  const today = new Date().toISOString().substring(0, 10);

  const placeholder = {
    organizers: ['5d1798065367df2f28dd0708'],
    activities: [],
    name: 'loading...',
    pointsGoal: 7500,
    releaseDate: '2019-07-01',
    startDate: '2019-07-01',
    endDate: '2019-10-30',
    deadline: '2019-12-14',
    seriesTitle: 'Placeholder',
    pointBonus: 1,
    id: '5d1c5237c360412fbcc98dcc'
  };

  const handleMoreClick = event => {
    event.preventDefault();
    setAmount(amount + 1);
  };

  const handleLessClick = event => {
    event.preventDefault();
    if (amount < 2) {
      setAmount(1);
    } else {
      setAmount(amount - 1);
    }
  };

  const handleAmountChange = event => {
    let theValue = event.target.value;
    if (theValue < 0) {
      theValue = Math.abs(theValue);
    }
    setAmount(theValue);
  };

  const dontAllowZero = event => {
    event.preventDefault();

    if (amount == 0) setAmount(1);
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

  return (
    <div>
      <form onSubmit={submit}>
        <label className="label">Date</label>
        <input
          className="input"
          value={date}
          onChange={({ target }) => setDate(target.value)}
          type="date"
          min={placeholder.startDate}
          max={today}
        />
        <div className="section columns is-centered">
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
