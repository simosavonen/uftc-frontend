import React from 'react';
import { useField } from '../hooks';

const AddChallengeForm = props => {
  const [name, nameReset] = useField('text');
  const [startDate, startDateReset] = useField('date');
  const [endDate, endDateReset] = useField('date');
  const [releaseDate, releaseDateReset] = useField('date');
  const [deadLine, deadLineReset] = useField('date');
  const [pointsLimit, pointsLimitReset] = useField('number');

  const submit = event => {
    event.preventDefault();
    const newChallenge = {
      name: name.value,
      startDate: startDate.value,
      endDate: endDate.value,
      releaseDate: releaseDate.value,
      deadLine: deadLine.value,
      pointsLimit: parseInt(pointsLimit.value, 10)
    };
    props.addChallenge(newChallenge);
    nameReset();
    startDateReset();
    endDateReset();
    releaseDateReset();
    deadLineReset();
    pointsLimitReset();
  };
  return (
    <form onSubmit={submit}>
      <p>
        <label htmlFor="name">Challenge name:</label>
        <input id="name" {...name} />
      </p>
      <p>
        <label htmlFor="startdate">Start date:</label>
        <input id="startdate" {...startDate} />
      </p>
      <p>
        <label htmlFor="endDate">End date:</label>
        <input id="endDate" {...endDate} />
      </p>
      <p>
        <label htmlFor="releaseDate">Release date:</label>
        <input id="releaseDate" {...releaseDate} />
      </p>
      <p>
        <label htmlFor="deadLine">Deadline:</label>
        <input id="deadLine" {...deadLine} />
      </p>
      <p>
        <label htmlFor="pointsLimit">Points limit:</label>
        <input id="pointsLimit" {...pointsLimit} />
      </p>
      <button type="submit">Add new challenge</button>
    </form>
  );
};

export default AddChallengeForm;
