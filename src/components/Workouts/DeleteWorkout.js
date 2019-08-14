import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

const DeleteWorkout = props => {
  console.log('DeleteWorkout');
  // if (props.delWorkout.length <= 0) {
  if (!props.delWorkout) {
    props.setDeleteWorkout(null);
    return (
      <div>
        <h1>Error delWorkout was empty</h1>
      </div>
    );
  }
  const submit = event => {
    event.preventDefault();
    props.setDeleteWorkout(null); //remove this or do something to take this concern
    console.log('submit btn pressed');
    const delworkout = {
      id: props.delWorkout.workoutid,
      activity: props.delWorkout.activity,
      instance: {
        id: props.delWorkout._id,
        date: props.delWorkout.date,
        amount: props.delWorkout.amount
      }
    };
    //props.updateWorkout(workout);
    //props.deleteWorkout(delworkout);
  };

  /*  {/*<>
      <div>
        <p>I was here</p>
      </div>
    <div> } */
  //{/*    </div>
  //    </> */}

  return (
    <form onSubmit={submit}>
      <div className="field is-grouped">
        <p className="help is-size-6 has-text-white">
          Do you want to delete workout from
          {'  '}
          date {moment(props.delWorkout.date).format('ddd MMM Do')}?
        </p>
        <div className="field">
          <p className="control">
            <button className="button is-success is-fullwidth is-medium">Yes</button>
          </p>
        </div>
      </div>
      <div className="field">
        <p className="control">
          <button
            className="button is-fullwidth"
            onClick={event => {
              event.preventDefault();
              props.setDeleteWorkout(null);
              props.setShowModal(false);
              let modalWnd = document.querySelector('.modal');
              if (modalWnd) {
                modalWnd.classList.remove('is-active');
              }
              //props.history.goBack();
            }}
          >
            Go back
          </button>
        </p>
      </div>
    </form>
  );
};

export default withRouter(DeleteWorkout);
