import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PreviewSeries from './PreviewSeries';

const AddChallengeForm = props => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [pointsGoal, setPointsGoal] = useState(0);
  const [pointBonus, setPointBonus] = useState(1.0);
  const [seriesTitle, setSeriesTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    if (props.challenges.length) {
      setName(props.challenges[0].name);
      setStartDate(moment(props.challenges[0].startDate).format('YYYY-MM-DD'));
      setEndDate(moment(props.challenges[0].endDate).format('YYYY-MM-DD'));
      setReleaseDate(moment(props.challenges[0].releaseDate).format('YYYY-MM-DD'));
      setDeadline(moment(props.challenges[0].deadline).format('YYYY-MM-DD'));
      setPointsGoal(props.challenges[0].pointsGoal);
    }
  }, [props.challenges]);

  const submit = event => {
    event.preventDefault();
    const newChallenge = {
      name,
      startDate,
      endDate,
      releaseDate,
      deadline,
      pointsGoal,
      pointBonus,
      seriesTitle,
      description,
      icon
    };
    props.addChallenge(newChallenge);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column" id="addChallengeForm">
            <form onSubmit={submit}>
              <h1 className="title is-4">
                {props.challenges.length
                  ? `Add a series to ${props.challenges[0].name}`
                  : 'Add the challenge'}
              </h1>
              <h2 className="subtitle is-6">
                {props.challenges.length
                  ? `Give the series it's own icon, title, description and a point bonus.`
                  : 'You will be set as the organizer, can add more later'}
              </h2>
              <div className="field is-grouped">
                <div className="control is-expanded">
                  <label className="label" htmlFor="name">
                    Challenge name
                  </label>
                  <input
                    className="input"
                    id="name"
                    onChange={({ target }) => setName(target.value)}
                    value={name}
                    title="All series should share the same challenge name"
                    readOnly={props.challenges.length !== 0}
                  />
                </div>
                <div className="control is-expanded">
                  <label className="label" htmlFor="pointsGoal">
                    Points goal
                  </label>
                  <input
                    className={`input ${props.challenges.length && 'is-warning'}`}
                    id="pointsGoal"
                    type="number"
                    onChange={({ target }) => setPointsGoal(target.value)}
                    value={pointsGoal}
                  />
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control is-expanded">
                  <label className="label" htmlFor="startdate">
                    Start date
                  </label>
                  <input
                    className={`input ${props.challenges.length && 'is-warning'}`}
                    title={props.challenges.length ? 'All series should share a start date' : ''}
                    id="startdate"
                    type="date"
                    onChange={({ target }) => setStartDate(target.value)}
                    value={startDate}
                  />
                </div>

                <div className="control is-expanded">
                  <label className="label" htmlFor="endDate">
                    End date
                  </label>
                  <input
                    className={`input ${props.challenges.length && 'is-warning'}`}
                    id="endDate"
                    type="date"
                    onChange={({ target }) => setEndDate(target.value)}
                    value={endDate}
                    title={`Duration: ${moment(endDate).diff(moment(startDate), 'days')} days`}
                  />
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control is-expanded">
                  <label className="label" htmlFor="releaseDate">
                    Release date
                  </label>
                  <input
                    className={`input ${props.challenges.length && 'is-warning'}`}
                    id="releaseDate"
                    type="date"
                    onChange={({ target }) => setReleaseDate(target.value)}
                    value={releaseDate}
                    title="The date when the series is revealed to users"
                  />
                </div>

                <div className="control is-expanded">
                  <label className="label" htmlFor="deadline">
                    Deadline
                  </label>
                  <input
                    className={`input ${props.challenges.length && 'is-warning'}`}
                    id="deadline"
                    type="date"
                    onChange={({ target }) => setDeadline(target.value)}
                    value={deadline}
                    title="Last day to save workouts"
                  />
                </div>
              </div>
              <div className="field is-grouped" />
              <div className="field">
                <label className="label" htmlFor="seriesTitle">
                  Series title
                </label>
                <div className="control">
                  <input
                    className="input"
                    id="seriesTitle"
                    onChange={({ target }) => setSeriesTitle(target.value)}
                    value={seriesTitle}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="description">
                  Description
                </label>
                <div className="control">
                  <input
                    className="input"
                    id="description"
                    onChange={({ target }) => setDescription(target.value)}
                    value={description}
                  />
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control is-expanded">
                  <label className="label" htmlFor="pointBonus">
                    Point bonus factor
                  </label>
                  <input
                    className="input"
                    id="pointBonus"
                    type="number"
                    step=".01"
                    min="0.1"
                    onChange={({ target }) => setPointBonus(target.value)}
                    value={pointBonus}
                    title="Decimal value, +20% bonus = 1.2"
                  />
                </div>

                <div className="control is-expanded">
                  <label className="label" htmlFor="icon">
                    FontAwesome icon
                  </label>
                  <input
                    className="input"
                    id="icon"
                    onChange={({ target }) => setIcon(target.value)}
                    value={icon}
                  />
                </div>
              </div>
              <div className="control">
                <button className="button is-info" type="submit">
                  {props.challenges.length ? 'Add a series' : 'Add new challenge'}
                </button>
              </div>
            </form>
          </div>
          <div className="column" id="previewOfSeries">
            <PreviewSeries challenges={props.challenges} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddChallengeForm;
