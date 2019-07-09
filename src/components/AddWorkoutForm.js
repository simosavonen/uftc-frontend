import React, { useState } from 'react';

// propsina se funktio joka lisää suorituksen tietokantaan
// funktio on määritelty tiedostossa App.js
// lisäksi tieto urheilulajista

const AddWorkoutForm = props => {
  const [amount, setAmount] = useState(1);
  const [date, setDate] = useState('');

  const handleMoreClick = event => {
    event.preventDefault();
    setAmount(amount + 1);
  };

  const handleLessClick = event => {
    event.preventDefault();
    if (amount < 0) {
      setAmount(0);
    }
    setAmount(amount - 1);
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
        "lisää urheilusuoritus" -lomake
        <input value={date} onChange={({ target }) => setDate(target.value)} type="date" />
        <button className="button is-danger" onClick={handleMoreClick}>
          +
        </button>
        {amount}
        <button className="button is-success" onClick={handleLessClick}>
          -
        </button>
        <p>
          <button>Save</button>
        </p>
      </form>
    </div>
  );
};

export default AddWorkoutForm;
