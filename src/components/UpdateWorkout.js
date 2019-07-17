import React, { useState } from 'react';
//import ActivityRow from './ActivityRow';
import UpdateWorkoutForm from './UpdateWorkoutForm';
/*
const initialList = ['1', '2', '3'];
const [value, setValue] = useState('');
  const [list, setList] = useState(initialList);

const handleChange = event => {
      setValue(event.target.value);
    };
    const handleSubmit = event => {
      if (value) {
        setList(list.concat(value));
      }
      setValue('');
      event.preventDefault();
    };

        <ul>
          {list.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <form onSubmit={handleSubmit}>
          <input type="text" value={value} onChange={handleChange} />
          <button type="submit">clicked</button>
        </form>
const Jotain = () => {
      console.log('Jotain');
      return (
        <>
          <UpdateWorkoutForm workout={props.workouts} activity={props.activity} />
        </>
      );
    };

*/
const UpdateWorkout = props => {
  const [workoutSelected, setWorkoutSelected] = useState(null);

  let oneTypeActLenght;

  console.log('update workouts', props.workouts);
  console.log('update activity', props.activity);
  const dayAndActivity = () => {
    const actNameTbl = [];
    let oneTypeAct = [];

    if (!props.workouts) return 'workouts oli null tai undefined';

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
    const setWorkoutSelected = (activity, amount, date) => {
      console.log('activity', activity);
      if (activity) {
        console.log('if return');
        console.log('amount', amount);
        console.log('date', date);
        //workoutSelected = activity;
        //setWorkoutSelected(activity);
        console.log('workoutselected', workoutSelected);
        /*
        return (
          <div>
            <UpdateWorkoutForm
              workout={props.workouts}
              activity={activity}
              amount={amount}
              date={date}
            />
          </div>
        );

        //return <UpdateWorkoutForm {...workoutSelected} />;

          return (
          <p>
            {amount} {activity} {date}
          </p>
        );
      } else {
        console.log('else return');
        return 'activity oli null tai undefined';
      }
    };
*/
    const updateCall = () => {
      console.log('workoutselected updatecall', workoutSelected);
      if (workoutSelected) {
        console.log('workoutselected updatecall');
        return <UpdateWorkoutForm workout={workoutSelected} updateWorkout={props.updateWorkout} />;
        // return 0;
      }
    };

    return (
      <>
        <h1 className="title is-size-4-mobile is-size-3">Your activities</h1>
        <ul>
          {oneTypeAct.map(item => (
            <li key={item.date + item.amount} onClick={() => setWorkoutSelected(item)}>
              {item.date.substr(0, 10)}
              {' \u00b7 '}
              <span style={{ fontSize: 'larger', color: '#ff2457' }}>{item.amount}</span>
            </li>
          ))}
        </ul>
        <div>{updateCall()}</div>
        {workoutSelected && <p onClick={() => setWorkoutSelected(null)}> </p>}
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
