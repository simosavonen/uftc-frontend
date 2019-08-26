import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PreviewSeries from './PreviewSeries';
import EditChallengeForm from './EditChallengeForm';
import { toast } from 'react-toastify';
import ConfirmButton from '../ConfirmButton';

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

  const [editingChallenge, setEditingChallenge] = useState(false);
  const [editingSeries, setEditingSeries] = useState(null);

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

  useEffect(() => {
    if (editingSeries) {
      setSeriesTitle(editingSeries.seriesTitle);
      setDescription(editingSeries.description ? editingSeries.description : '');
      setPointBonus(editingSeries.pointBonus);
      setIcon(editingSeries.icon);
    }
  }, [editingSeries]);

  const addOrEdit = async event => {
    event.preventDefault();
    if (!editingSeries) {
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
      try {
        await props.challengeService.add(newChallenge);
        toast.success('Challenge or series created.');
      } catch (error) {
        toast.warn('Failed to create a challenge or series.');
      }
    } else {
      try {
        await props.challengeService.update({
          id: editingSeries.id,
          seriesTitle,
          description,
          pointBonus,
          icon
        });
        toast.success('Series updated.');
      } catch (error) {
        toast.warn('Failed to update the series.');
      }
    }
  };

  const addOrganizer = async event => {
    event.preventDefault();
    try {
      for (let c of props.challenges) {
        await props.challengeService.update({
          id: c.id,
          organizers: organizers.concat([newOrganizer])
        });
      }
      setNewOrganizer('');
      toast.success('New organizer added.');
    } catch (error) {
      toast.warn('Failed to add an organizer.');
    }
  };

  const deleteSeries = async event => {
    try {
      await props.challengeService.remove({ id: editingSeries.id });
      toast.success('Series deleted.');
      reset();
    } catch (error) {
      toast.warn('Failed to delete the series.');
    }
  };

  const reset = () => {
    setEditingSeries(null);
    setSeriesTitle('');
    setDescription('');
    setPointBonus(1);
    setIcon('');
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
            <form onSubmit={addOrEdit}>
              {!editingSeries ? (
                <>
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
                </>
              ) : (
                <h1 className="title is-4">Edit the series</h1>
              )}

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
                  <textarea
                    className="textarea"
                    id="description"
                    onChange={({ target }) => setDescription(target.value)}
                    value={description}
                  />
                  <p className="help">
                    Can use{' '}
                    <a
                      href="https://bulma.io/documentation/elements/content/"
                      title="Bulma Content class documentation"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      a limited set
                    </a>{' '}
                    of HTML tags
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
                    For{' '}
                    <a
                      href="https://fontawesome.com/icons?d=gallery&s=solid&m=free"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Solid Style
                    </a>{' '}
                    icons like{' '}
                    <a
                      href="https://fontawesome.com/icons/couch?style=solid"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      fas fa-couch
                    </a>
                    , input <strong>couch</strong>
                    <br />
                    For{' '}
                    <a
                      href="https://fontawesome.com/icons?d=gallery&s=brands&m=free"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Brands Style
                    </a>{' '}
                    icons like{' '}
                    <a
                      href="https://fontawesome.com/icons/hotjar?style=brands"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      fab fa-hotjar
                    </a>
                    , input <strong>fab hotjar</strong>
                    <br />
                    For{' '}
                    <a
                      href="https://fontawesome.com/icons?d=gallery&s=regular&m=free"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Regular Style
                    </a>{' '}
                    icons like{' '}
                    <a
                      href="https://fontawesome.com/icons/trash-alt?style=regular"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      far fa-trash-alt
                    </a>
                    , input <strong>far trash-alt</strong>
                  </p>
                </div>
              </div>
              <div className="control">
                {editingSeries ? (
                  <div className="buttons">
                    <button className="button is-info">Save changes</button>
                    <button className="button is-text" onClick={reset}>
                      Cancel
                    </button>
                    <ConfirmButton
                      icon={['far', 'trash-alt']}
                      classNames="is-danger is-outlined"
                      texts={['delete', 'confirm']}
                      action={() => deleteSeries()}
                    />
                  </div>
                ) : (
                  <button className="button is-info">
                    {props.challenges.length ? 'Add a series' : 'Add a new challenge'}
                  </button>
                )}
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
            <PreviewSeries challenges={props.challenges} setEditingSeries={setEditingSeries} />
            <div className="notification is-danger">
              {editingChallenge ? (
                <EditChallengeForm
                  challenges={props.challenges}
                  challengeService={props.challengeService}
                  setEditingChallenge={setEditingChallenge}
                />
              ) : (
                <div className="columns">
                  <div className="column">
                    <div
                      className="button is-outlined is-light is-size-7-mobile is-size-7-tablet is-size-6-desktop"
                      onClick={() => setEditingChallenge(!editingChallenge)}
                    >
                      Edit the challenge
                    </div>
                  </div>
                  <div className="column is-7 is-size-7">
                    Changing the dates after the challenge has started can cause issues.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddChallengeForm;
