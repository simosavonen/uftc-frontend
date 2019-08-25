import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConfirmButton from '../ConfirmButton';

const AddAchievementForm = props => {
  const [isOneDayChallenge, setIsOneDayChallenge] = useState(true);
  const [name, setName] = useState('');
  const [requirement, setRequirement] = useState(100);
  const [pointsReward, setPointsReward] = useState(0);
  const [fontAwesomeIcon, setFontAwesomeIcon] = useState('medal');
  const [iconColor, setIconColor] = useState('#CD7F32');
  const [activity, setActivity] = useState('');

  const today = moment().format('YYYY-MM-DD');
  const [date, setDate] = useState(today);

  const [editingAchievement, setEditingAchievement] = useState(null);

  useEffect(() => {
    if (editingAchievement) {
      setName(editingAchievement.name);
      setRequirement(editingAchievement.requirement);
      setPointsReward(editingAchievement.pointsReward);
      setFontAwesomeIcon(editingAchievement.fontAwesomeIcon);
      setIconColor(editingAchievement.iconColor);
      setDate(editingAchievement.date ? moment(editingAchievement.date).format('YYYY-MM-DD') : '');
      setActivity(editingAchievement.activity ? editingAchievement.activity : '');
    }
  }, [editingAchievement]);

  // code refers to props.activities[0].id, activities can be an empty array
  if (props.activities.length === 0) {
    return (
      <div className="section">
        <h1 className="title is-5">Add an activity before using this form.</h1>
      </div>
    );
  }

  const reset = () => {
    if (isOneDayChallenge) {
      setDate(today);
      setActivity('');
    } else {
      setDate('');
      setActivity(props.activities[0].id);
    }
    setName('');
    setRequirement(100);
    setPointsReward(0);
    setFontAwesomeIcon('medal');
    setIconColor('#CD7F32');
    setEditingAchievement(null);
  };

  const submit = event => {
    event.preventDefault();
    const newAchievement = {
      name,
      requirement,
      pointsReward,
      activity: activity === '' ? null : activity,
      date: date === '' ? null : date,
      fontAwesomeIcon,
      iconColor
    };
    props.achievementService.add(newAchievement);
  };

  const activityNameById = id => {
    const activity = props.activities.find(a => a.id === id);
    if (activity) {
      return activity.name;
    }
    return '';
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
      setDate('');
      setActivity(props.activities[0].id);
    } else {
      setIsOneDayChallenge(true);
      setActivity('');
      setDate(today);
    }
  };

  const SelectButton = () => {
    return (
      <div className="field">
        <div className="label">Choose what type of achievement to add</div>
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
              {!editingAchievement ? (
                <SelectButton />
              ) : (
                <h1 className="title is-5">Edit the achievement</h1>
              )}

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
                {editingAchievement ? (
                  <div className="buttons">
                    <button className="button is-link">Save changes</button>
                    <button className="button is-text" onClick={() => reset()}>
                      Cancel
                    </button>
                    <ConfirmButton
                      icon={['far', 'trash-alt']}
                      classNames="is-danger is-outlined"
                      texts={['delete', 'confirm']}
                      action={() => {
                        props.achievementService.remove({ id: editingAchievement.id });
                        reset();
                      }}
                    />
                  </div>
                ) : (
                  <button className="button is-link">
                    Add new {isOneDayChallenge ? 'one-day-challenge' : 'activity badge'}
                  </button>
                )}
              </div>
            </form>
          </div>
          <div className="column">
            {props.achievements.length > 0 && (
              <div className="box">
                <h1 className="title is-5">Summary of the achievements</h1>
                <table className="table is-hoverable is-fullwidth is-narrow is-size-7">
                  <thead>
                    <tr>
                      <th className="has-text-centered">Icon</th>
                      <th>Name</th>
                      <th>Activity</th>
                      <th className="has-text-centered" title="Points requirement">
                        Req
                      </th>
                      <th className="has-text-centered" title="Points reward">
                        Rew
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.achievements
                      .filter(a => a.date === null)
                      .map(a => (
                        <tr
                          key={a.id}
                          className="is-clickable"
                          onClick={() => {
                            setEditingAchievement(a);
                            setIsOneDayChallenge(false);
                          }}
                        >
                          <td className="has-text-centered">
                            <FontAwesomeIcon icon={a.fontAwesomeIcon} color={a.iconColor} />
                          </td>
                          <td>{a.name}</td>
                          <td>{activityNameById(a.activity)}</td>
                          <td className="has-text-centered">{a.requirement}</td>
                          <td className="has-text-centered">{a.pointsReward}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                <table className="table is-hoverable is-fullwidth is-narrow is-size-7">
                  <thead>
                    <tr>
                      <th className="has-text-centered">Icon</th>
                      <th>Name</th>
                      <th>Date</th>
                      <th className="has-text-centered" title="Points requirement">
                        Req
                      </th>
                      <th className="has-text-centered" title="Points reward">
                        Rew
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.achievements
                      .filter(a => a.date !== null)
                      .map(a => (
                        <tr
                          key={a.id}
                          className="is-clickable"
                          onClick={() => {
                            setEditingAchievement(a);
                            setIsOneDayChallenge(true);
                          }}
                        >
                          <td className="has-text-centered">
                            <FontAwesomeIcon icon={a.fontAwesomeIcon} color={a.iconColor} />
                          </td>
                          <td>{a.name}</td>
                          <td>{moment(a.date).format('YYYY-MM-DD')}</td>
                          <td className="has-text-centered">{a.requirement}</td>
                          <td className="has-text-centered">{a.pointsReward}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <p className="is-size-7 has-text-right">click on a row to edit the achievement</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddAchievementForm;
