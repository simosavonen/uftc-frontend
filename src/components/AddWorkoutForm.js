import React from 'react';

// propsina se funktio joka lisää suorituksen tietokantaan
// funktio on määritelty tiedostossa App.js
// lisäksi tieto urheilulajista

const AddWorkoutForm = props => {
  const submit = event => {
    event.preventDefault();

    // props.addWorkout(workout)
  };

  return <form onSubmit={submit}>"lisää urheilusuoritus" -lomake</form>;
};

export default AddWorkoutForm;
