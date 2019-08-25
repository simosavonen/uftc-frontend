import React, { useState } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import Select from 'react-select'
//import Async from 'react-select/async';

const AddAchievementForm = props => {
  const [isOneDayChallenge, setIsOneDayChallenge] = useState(true);
  const [name, setName] = useState('');
  const [requirement, setRequirement] = useState(100);
  const [pointsReward, setPointsReward] = useState(0);
  const [fontAwesomeIcon, setFontAwesomeIcon] = useState('medal');
  const [iconColor, setIconColor] = useState('#CD7F32');
  const [activity, setActivity] = useState(null);

  const today = moment().format('YYYY-MM-DD');
  const [date, setDate] = useState(today);

  const submit = event => {
    event.preventDefault();
    const newAchievement = {
      name,
      requirement,
      pointsReward,
      activity,
      date,
      fontAwesomeIcon,
      iconColor
    };
    props.addAchievement(newAchievement);
  };

  const OneDayChallenge = (
    <div className="field">
      <label className="label" htmlFor="date">
        The date for the one-day-challenge
      </label>
      <div className="control">
        <input
          className="input"
          id="date"
          onChange={({ target }) => setDate(target.value)}
          type="date"
          value={date}
          required
        />
        <p className="help">
          Workouts from all activities set for this date are taken into account
        </p>
      </div>
    </div>
  );

  const ActivityBadge = (
    <div className="field">
      <label className="label" htmlFor="activity">
        Activity
      </label>
      <div className="select">
        <select id="activity" onChange={({ target }) => setActivity(target.value)} value={activity}>
          {props.activities.map(a => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const switchBadgeTypeState = () => {
    if (isOneDayChallenge) {
      setIsOneDayChallenge(false);
      setDate(null);
      setActivity(props.activities[0].id);
    } else {
      setIsOneDayChallenge(true);
      setActivity(null);
      setDate(today);
    }
  };

  const SelectButton = () => {
    return (
      <div className="field">
        <div className="label">Choose achievement type</div>
        <div className="buttons has-addons" onClick={() => switchBadgeTypeState()}>
          <span className={isOneDayChallenge ? 'button is-success is-selected' : 'button'}>
            One-day-challenge
          </span>
          <span className={!isOneDayChallenge ? 'button is-success is-selected' : 'button'}>
            Activity badge
          </span>
        </div>
      </div>
    );
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column">
            <form onSubmit={submit}>
              <SelectButton />

              {isOneDayChallenge ? OneDayChallenge : ActivityBadge}

              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    className="input"
                    id="name"
                    onChange={({ target }) => setName(target.value)}
                    value={name}
                    required
                  />
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control is-expanded">
                  <label className="label">Points requirement</label>
                  <input
                    className="input"
                    id="requirement"
                    onChange={({ target }) => setRequirement(target.value)}
                    value={requirement}
                    required
                  />
                </div>

                <div className="control is-expanded">
                  <label className="label">Points reward</label>
                  <input
                    className="input"
                    id="pointsReward"
                    onChange={({ target }) => setPointsReward(target.value)}
                    value={pointsReward}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Icon</label>
                <div className="control has-icons-left">
                  <div className="select">
                    <select
                      id="fontAwesomeIcon"
                      value={fontAwesomeIcon}
                      onChange={({ target }) => setFontAwesomeIcon(target.value)}
                    >
                      <option value="medal">medal</option>
                      <option value="crown">crown</option>
                      <option value="trophy">trophy</option>
                      <option value="award">award</option>
                    </select>
                  </div>
                  <span className="icon is-left">
                    <FontAwesomeIcon icon={fontAwesomeIcon} color={iconColor} />
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Icon color</label>
                <div className="control">
                  <div className="select">
                    <select
                      id="iconColor"
                      value={iconColor}
                      onChange={({ target }) => setIconColor(target.value)}
                    >
                      <option value="#CD7F32">bronze</option>
                      <option value="#C0C0C0">silver</option>
                      <option value="#FFD700">gold</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <button className="button is-link">
                  Add new {isOneDayChallenge ? 'one-day-challenge' : 'activity badge'}
                </button>
              </div>
            </form>
          </div>
          <div className="column">
            {props.achievements.length > 0 && (
              <div className="box">
                <h1 className="title is-5">Summary of the achievements</h1>
                <table className="table is-hoverable is-fullwidth is-narrow">
                  <thead>
                    <tr>
                      <th>Icon</th>
                      <th>Name</th>
                      <th>Req</th>
                      <th>Rew</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.achievements
                      .filter(a => a.date === null)
                      .map(a => (
                        <tr key={a.id}>
                          <td>
                            <FontAwesomeIcon icon={a.fontAwesomeIcon} color={a.iconColor} />
                          </td>
                          <td>{a.name}</td>
                          <td>{a.requirement}</td>
                          <td>{a.pointsReward}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddAchievementForm;
