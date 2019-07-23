import React, { useState } from 'react';
import moment from 'moment';
import UpdateWorkoutForm from './UpdateWorkoutForm';
//import { isModuleDeclaration } from '@babel/types';

const UpdateWorkout = props => {
  const [workoutSelected, setWorkoutSelected] = useState(null);
  const [showActivities, setshowActivities] = useState(false);

  let oneTypeActLenght;

  const dayAndActivity = () => {
    const actNameTbl = [];
    let oneTypeAct = [];
    let nameTbl;

    if (!props.workouts) return 'workouts oli null tai undefined';

    if (!showActivities) {
      return (
        <div>
          <button
            className="button is-dark is-large is-fullwidth"
            onClick={() => setshowActivities(!showActivities)}
          >
            {showActivities ? 'Hide activities' : 'View activities'}
          </button>
        </div>
      );
    }
    props.workouts.map(item => {
      const a = item.activity;
      const _workoutid = item.id;
      return item.instances.map(ind => {
        return actNameTbl.push({
          date: ind.date,
          activity: a,
          workoutid: _workoutid,
          amount: ind.amount,
          _id: ind._id
        });
      });
    });

    actNameTbl.sort(cmpAct);

    function cmpAct(a, b) {
      if (a.activity < b.activity) {
        return -1;
      }
      if (a.activity > b.activity) {
        return 1;
      }
      return 0;
    }

    actNameTbl.map(ind => {
      if (ind.activity === props.activity.id) {
        oneTypeAct.push(ind);
      }
      return 0;
    });

    oneTypeActLenght = oneTypeAct.length;

    if (!oneTypeActLenght) {
      return (
        <p>
          <b>Hi there, you can make good exercise!</b>
        </p>
      );
    }
    /*
    $('.modal-button').click(function() {
      var target = $(this).data('target');
      $('html').addClass('is-clipped');
      $(target).addClass('is-active');
    });

    $('.modal-close').click(function() {
      $('html').removeClass('is-clipped');
      $(this)
        .parent()
        .removeClass('is-active');
    });
*/
    //this.removeClass('is-active');
    // this.removeClass('is-clipped');
    //nameTbl.classList.remove('is-active');
    //nameTbl.classList.toggle('is-active');
    //nameTbl.classList.toggle('is-active');
    //nameTbl.classList.toggle('modal');
    //console.log('name exist');
    //console.log('name not exist');
    //{showornot()}
    function showornot() {
      if (nameTbl) {
        //if (nameTbl.classList.contains('modal')) {
        nameTbl.classList.toggle('is-active');

        //} else {

        //}
      }
    }

    const updateCall = () => {
      console.log('updateCall');
      if (workoutSelected) {
        console.log('updateCall workoutSelected', workoutSelected);
        return (
          <div key={workoutSelected.date} className="modal is-active">
            <div className="modal-background" />
            <div className="modal-content">
              <UpdateWorkoutForm
                key={workoutSelected.date}
                workout={workoutSelected}
                updateWorkout={props.updateWorkout}
              />
            </div>
            <button
              className="modal-close is-large"
              aria-label="close"
              onClick={() => {
                nameTbl = document.querySelector('.modal');
                //if (nameTbl.classList.contains('modal')) {
                //nameTbl.classList.remove('modal');
                //} else {
                //nameTbl.classList.add('modal');
                //}
                nameTbl.classList.toggle('is-active');
                //nameTbl.classList.toggle('modal');
                //closeModal;
                console.log('modal', nameTbl);
              }}
            />
          </div>
        );
      }
    };

    return (
      <>
        <div>
          <button
            className="button is-light is-large is-fullwidth"
            onClick={() => setshowActivities(!showActivities)}
          >
            {showActivities ? 'Hide activities' : 'View activities'}
          </button>
        </div>
        {showActivities && (
          <div>
            <ul>
              {oneTypeAct.map(item => (
                <li key={item.date + item.amount} onClick={() => setWorkoutSelected(item)}>
                  <span
                    style={{
                      fontFamily: 'verdana',
                      fontSize: 'larger',
                      fontWeight: '700',
                      color: '#0f0f0f'
                    }}
                  >
                    {moment(item.date).format('ddd MMM Do')}
                  </span>
                  {' \u00b7 '}
                  <span
                    style={{
                      fontFamily: 'verdana',
                      fontSize: 'larger',
                      fontWeight: '700',
                      color: '#ff2457'
                    }}
                  >
                    {item.amount}
                  </span>
                </li>
              ))}
            </ul>
            <div>{updateCall()}</div>
            {workoutSelected && <p onClick={() => setWorkoutSelected(null)}> </p>}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div>{dayAndActivity()}</div>
    </>
  );
};
export default UpdateWorkout;
