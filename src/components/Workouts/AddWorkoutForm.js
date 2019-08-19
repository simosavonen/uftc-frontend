import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Calendar from 'react-calendar';
import moment from 'moment';

const AddWorkoutForm = props => {
  const [amount, setAmount] = useState(1);
  const [date, setDate] = useState(new Date());
  const [dates, setDates] = useState([]); // for highlighting in the date picker

  useEffect(() => {
    if (props.workouts && props.activity) {
      const filtered = props.workouts.filter(w => w.activity === props.activity.id);
      if (filtered.length) {
        const workoutList = filtered[0].instances.map(i => new Date(i.date));
        setDates(workoutList);
      }
    }
  }, [props.workouts, props.activity]);

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
    if (Number.isNaN(theValue)) {
      theValue = 1;
    }
    if (theValue < 0) {
      theValue = Math.abs(theValue);
    }
    setAmount(theValue);
  };

  const handleDateChange = d => {
    setDate(d);
  };

  const dontAllowZero = event => {
    event.preventDefault();

    if (amount === 0) setAmount(1);
  };

  const submit = event => {
    event.preventDefault();

    const dateString = moment(date).format('YYYY-MM-DD');

    const workout = {
      amount: amount,
      date: dateString,
      activity: props.activity.id
    };
    props.addWorkout(workout);
  };

  const highlight = ({ date, view }) => {
    if (view === 'month') {
      return !!dates.find(d => {
        const dateString = moment(date).format('YYYY-MM-DD');
        return moment(d).format('YYYY-MM-DD') === dateString;
      })
        ? 'highlighted-calendar-day'
        : '';
    }
  };

  return (
    <form onSubmit={submit}>
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
          <p className="help is-size-6">
            {amount} x {props.activity.unit} ={' '}
            {Math.round(amount * props.activity.points * props.challenge.pointBonus * 10) / 10}{' '}
            points
          </p>
        </div>

        <p className="control">
          <button className="button is-success is-large" onClick={handleMoreClick}>
            <span className="icon is-large">
              <FontAwesomeIcon icon="plus" />
            </span>
          </button>
        </p>
      </div>
      <div style={{ margin: '1.5em 0' }}>
        <Calendar
          onChange={handleDateChange}
          value={date}
          maxDate={new Date()}
          tileClassName={highlight}
        />
      </div>

      <div className="field">
        <p className="control">
          <button className="button is-success is-fullwidth is-medium">Save a workout</button>
        </p>
      </div>
      <div className="field">
        <p className="control">
          <button
            className="button is-fullwidth"
            onClick={event => {
              event.preventDefault();
              props.history.goBack();
            }}
          >
            Go back
          </button>
        </p>
      </div>
    </form>
  );
};

export default withRouter(AddWorkoutForm);
