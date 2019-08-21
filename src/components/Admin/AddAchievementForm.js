import React, { useState } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import Select from 'react-select'
//import Async from 'react-select/async';

const AddAchievementForm = props => {
  const [name, setName] = useState('');
  const [requirement, setRequirement] = useState(0);
  const [pointsReward, setPointsReward] = useState(0);
  const [fontAwesomeIcon, setFontAwesomeIcon] = useState('');
  const [iconColor, setIconColor] = useState('');

  const today = new Date().toISOString().substring(0, 10);
  const [date, setDate] = useState(today);

  const submit = event => {
    event.preventDefault();
    const newAchievement = {
      name,
      requirement,
      pointsReward,
      date,
      fontAwesomeIcon,
      iconColor
    };
    console.log(' uusi saavutus ' + newAchievement.name);
    props.addAchievement(newAchievement);
  };

  const DayAchievement = (
    <p>
      <label htmlFor="date">Select the date for date achievement:</label>
      <input id="date" onChange={({ target }) => setDate(target.value)} type="date" value={date} />
    </p>
  );

  console.log('achievementform');
  return (
    <section className="section columns is-centered">
      <form onSubmit={submit} className="column is-6">
        <p>
          <label htmlFor="name">Achievement's name:</label>
          <input id="name" onChange={({ target }) => setName(target.value)} value={name} />
        </p>
        <p>
          <label htmlFor="requirement">Demanded points for the achievement:</label>
          <input
            id="requirement"
            onChange={({ target }) => setRequirement(target.value)}
            value={requirement}
          />
        </p>
        <p>
          <label htmlFor="pointsReward">Extra points when reached:</label>
          <input
            id="pointsReward"
            onChange={({ target }) => setPointsReward(target.value)}
            value={pointsReward}
          />
        </p>
        <p>
          <label htmlFor="fontAwesomeIcon">Select icon:</label>
          <select id="fontAwesomeIcon" onChange={({ target }) => setFontAwesomeIcon(target.value)}>
            <option value="medal">medal</option>
            <option value="crown">crown</option>
            <option value="trophy">trophy</option>
            <option value="award">award</option>
          </select>
        </p>
        <p>
          <label htmlFor="iconColor">icon's color:</label>
          <select id="iconColor" onChange={({ target }) => setIconColor(target.value)}>
            <option value="#CD7F32">bronze</option>
            <option value="#C0C0C0">silver</option>
            <option value="#FFD700">gold</option>
          </select>
        </p>
        {DayAchievement}
        <button type="submit">Add new achievement</button>
      </form>
    </section>
  );
};

export default AddAchievementForm;
