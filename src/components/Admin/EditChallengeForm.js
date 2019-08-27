import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';

const EditChallengeForm = props => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [pointsGoal, setPointsGoal] = useState(0);

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

  const submit = async event => {
    event.preventDefault();
    try {
      for (let c of props.challenges) {
        await props.challengeService.update({
          id: c.id,
          name,
          startDate,
          endDate,
          releaseDate,
          deadline,
          pointsGoal
        });
      }
      toast.success('Challenge updated.');
      props.setEditingChallenge(false);
    } catch (error) {
      toast.warn('Failed to update challenge.');
    }
  };

  return (
    <form onSubmit={submit}>
      <div className="field">
        <div className="control is-expanded">
          <label className="label has-text-light" htmlFor="name">
            Challenge name
          </label>
          <input
            className="input"
            id="name"
            onChange={({ target }) => setName(target.value)}
            value={name}
            required
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
      <div className="field is-grouped">
        <div className="control is-expanded">
          <label className="label has-text-light" htmlFor="startdate">
            Start date
          </label>
          <input
            className="input"
            id="startdate"
            type="date"
            onChange={({ target }) => setStartDate(target.value)}
            value={startDate}
            required
          />
        </div>

        <div className="control is-expanded">
          <label className="label has-text-light" htmlFor="endDate">
            End date (zero hour)
          </label>
          <input
            className="input"
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
          <label className="label has-text-light" htmlFor="releaseDate">
            Release date
          </label>
          <input
            className="input"
            id="releaseDate"
            type="date"
            onChange={({ target }) => setReleaseDate(target.value)}
            value={releaseDate}
            required
          />
        </div>

        <div className="control is-expanded">
          <label className="label has-text-light" htmlFor="deadline">
            Deadline
          </label>
          <input
            className="input"
            id="deadline"
            type="date"
            onChange={({ target }) => setDeadline(target.value)}
            value={deadline}
            title="The date for publishing results, ie. last day to save workouts."
            required
          />
        </div>
      </div>
      <div className="field">
        <div className="control is-expanded">
          <label className="label has-text-light" htmlFor="pointsGoal">
            Points goal
          </label>
          <input
            className="input"
            id="pointsGoal"
            type="number"
            onChange={({ target }) => setPointsGoal(target.value)}
            value={pointsGoal}
            required
          />
        </div>
      </div>
      <div className="buttons">
        <button className="button is-light is-outlined">Save changes</button>
        <span
          className="button is-light is-outlined"
          onClick={() => props.setEditingChallenge(false)}
        >
          Cancel
        </span>
      </div>
    </form>
  );
};

export default EditChallengeForm;
