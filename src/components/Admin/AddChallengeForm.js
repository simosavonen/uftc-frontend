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
  const [users, setUsers] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [newOrganizer, setNewOrganizer] = useState('');

  useEffect(() => {
    if (props.challenges.length) {
      setName(props.challenges[0].name);
      setStartDate(moment(props.challenges[0].startDate).format('YYYY-MM-DD'));
      setEndDate(moment(props.challenges[0].endDate).format('YYYY-MM-DD'));
      setReleaseDate(moment(props.challenges[0].releaseDate).format('YYYY-MM-DD'));
      setDeadline(moment(props.challenges[0].deadline).format('YYYY-MM-DD'));
      setPointsGoal(props.challenges[0].pointsGoal);
      setOrganizers(props.challenges[0].organizers);
    }
  }, [props.challenges]);

  useEffect(() => {
    if (props.user) {
      props.userService
        .get()
        .then(result => {
          setUsers(result.data);
        })
        .catch(error => console.log('users', error.response.data));
    }
  }, [props.userService, props.user]);

  const addChallengeOrSeries = event => {
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
      icon,
      organizers
    };
    props.challengeService.add(newChallenge);
  };

  const addOrganizer = event => {
    event.preventDefault();
    for (let c of props.challenges) {
      props.challengeService.update({
        id: c.id,
        organizers: organizers.concat([newOrganizer])
      });
    }
    setNewOrganizer('');
  };

  const nameById = id => {
    const result = users.find(u => u.id === id);
    if (result) {
      return result.name;
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column" id="addChallengeForm">
            <form onSubmit={addChallengeOrSeries}>
              <h1 className="title is-4">
                {props.challenges.length
                  ? `Add a series to ${props.challenges[0].name}`
                  : 'Add the challenge'}
              </h1>
              <h2 className="subtitle is-6">
                {props.challenges.length
                  ? `Give the series it's own title, description, point bonus and an icon.`
                  : 'You will be set as the organizer, can add more later'}
              </h2>

              <div className={props.challenges.length ? 'is-hidden' : ''}>
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
                      required
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
                      title="All series should share the same points goal"
                      required
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
                      required
                    />
                  </div>

                  <div className="control is-expanded">
                    <label className="label" htmlFor="endDate">
                      End date (zero hour)
                    </label>
                    <input
                      className={`input ${props.challenges.length && 'is-warning'}`}
                      id="endDate"
                      type="date"
                      onChange={({ target }) => setEndDate(target.value)}
                      value={endDate}
                      title="Stored with time set at 00:00. If you want the challenge to end on sunday, pick the next monday"
                      required
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
                      required
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
                      title="The date for publishing results, ie. last day to save workouts."
                      required
                    />
                  </div>
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
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="description">
                  Description
                </label>
                <div className="control">
                  <testarea
                    className="textarea"
                    id="description"
                    onChange={({ target }) => setDescription(target.value)}
                    value={description}
                    required
                  />
                  <p className="help">
                    HTML is <a href="https://bulma.io/documentation/elements/content/">allowed</a>
                  </p>
                </div>
              </div>
              <div className="field">
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
              </div>
              <div className="field">
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
                  <p className="help">
                    For <a href="https://fontawesome.com/icons?d=gallery&s=solid">Solid Style</a>{' '}
                    icons like{' '}
                    <a href="https://fontawesome.com/icons/couch?style=solid">fas fa-couch</a>,
                    input <strong>couch</strong>
                    <br />
                    For <a href="https://fontawesome.com/icons?d=gallery&s=brands">
                      Brands Style
                    </a>{' '}
                    icons like{' '}
                    <a href="https://fontawesome.com/icons/hotjar?style=brands">fab fa-hotjar</a>,
                    input <strong>fab hotjar</strong>
                    <br />
                    For{' '}
                    <a href="https://fontawesome.com/icons?d=gallery&s=regular">
                      Regular Style
                    </a>{' '}
                    icons like{' '}
                    <a href="https://fontawesome.com/icons/trash-alt?style=regular">
                      far fa-trash-alt
                    </a>
                    , input <strong>far trash-alt</strong>
                  </p>
                </div>
              </div>
              <div className="control">
                <button className="button is-info" type="submit">
                  {props.challenges.length ? 'Add a series' : 'Add new challenge'}
                </button>
              </div>
            </form>

            {organizers.length > 0 && (
              <form style={{ marginTop: '2em' }} onSubmit={addOrganizer}>
                <h1 className="title is-4">Organizers</h1>
                <div className="field is-grouped is-grouped-multiline">
                  {organizers.map((organizer, idx) => (
                    <div key={organizer} className="control">
                      <div className="tags has-addons">
                        <span className="tag is-dark">#{idx + 1}</span>
                        <span className="tag is-danger">{nameById(organizer)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="field is-grouped">
                  <div className="control">
                    <div className="select">
                      <select
                        value={newOrganizer}
                        onChange={({ target }) => setNewOrganizer(target.value)}
                      >
                        <option value="">Add a user to organizers</option>
                        {users
                          .filter(u => !organizers.includes(u.id))
                          .map(u => (
                            <option key={u.id} value={u.id}>
                              {u.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="control">
                    <button className="button is-info is-outlined" disabled={newOrganizer === ''}>
                      add
                    </button>
                  </div>
                </div>
              </form>
            )}
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
