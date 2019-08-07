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
    if (theValue < 0) {
      theValue = Math.abs(theValue);
    }
    setAmount(theValue);
  };

  const handleDateChange = d => {
    console.log('date', d.toString());
    setDate(d);
  };

  const dontAllowZero = event => {
    event.preventDefault();

    if (amount === 0) setAmount(1);
  };

  const submit = event => {
    event.preventDefault();

    // toISOString causes problems
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
        // toISOString converted dates in local timezone to tomorrow
        const dateString = moment(date).format('YYYY-MM-DD');
        return d.toISOString().substr(0, 10) === dateString;
      })
        ? 'highlighted-calendar-day'
        : '';
    }
  };

  return (
    <form onSubmit={submit}>
      <div className="field is-grouped">
        <p className="control">
          <button className="button is-danger is-medium" onClick={handleLessClick}>
            <span className="icon is-medium">
              <FontAwesomeIcon icon="minus" />
            </span>
          </button>
        </p>
        <p className="control is-expanded">
          <input
            className="input is-medium"
            type="text"
            min="1"
            value={amount}
            onChange={handleAmountChange}
            onBlur={dontAllowZero}
          />
        </p>
        <p className="control">
          <button className="button is-success is-medium" onClick={handleMoreClick}>
            <span className="icon is-medium">
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
            className="button is-danger is-fullwidth"
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
