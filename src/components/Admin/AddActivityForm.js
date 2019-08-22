import React, { useState, useEffect } from 'react';
import { icons } from '../../config/config';

const AddActivityForm = props => {
  const [name, setName] = useState('');
  const [points, setPoints] = useState(0);
  const [type, setType] = useState('');
  const [unit, setUnit] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [icon, setIcon] = useState('');
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (props.activities) {
      let names = [];
      for (let a of props.activities) {
        if (!names.includes(a.type)) {
          names.push(a.type);
        }
      }
      setTypes(names);
    }
  }, [props.activities]);

  const submit = event => {
    event.preventDefault();
    const newActivity = {
      name,
      points,
      type,
      unit,
      description,
      url,
      icon
    };
    props.addActivity(newActivity);
  };

  return (
    <section className="section is-centered columns">
      <form onSubmit={submit} className="column is-10">
        <div className="field is-horizontal">
          <div className="field-label">
            <label className="label" htmlFor="name">
              Activity name:
            </label>
          </div>
          <div className="field-body">
            <input
              className="input"
              onChange={({ target }) => setName(target.value)}
              value={name}
              required
            />
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label">
            <label className="label" htmlFor="type">
              Activity type:
            </label>
          </div>
          <div className="field-body">
            <input
              className="input"
              id="type"
              onChange={({ target }) => setType(target.value)}
              value={type}
              list="typelist"
              required
            />
            <datalist id="typelist">
              {types.map(t => (
                <option key={t} value={t} />
              ))}
            </datalist>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label">
            <label className="label" htmlFor="unit">
              Activity unit:
            </label>
          </div>
          <div className="field-body">
            <input
              className="input"
              id="unit"
              onChange={({ target }) => setUnit(target.value)}
              value={unit}
              required
            />
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label">
            <label className="label" htmlFor="points">
              Point value per unit:
            </label>
          </div>
          <div className="field-body">
            <input
              className="input"
              id="points"
              type="number"
              onChange={({ target }) => setPoints(target.value)}
              value={points}
            />
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label">
            <label className="label" htmlFor="description">
              Description:
            </label>
          </div>
          <div className="field-body">
            <input
              className="input"
              id="description"
              onChange={({ target }) => setDescription(target.value)}
              value={description}
              required
            />
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label">
            <label className="label" htmlFor="url">
              Video URL:
            </label>
          </div>
          <div className="field-body">
            <input
              className="input"
              id="url"
              onChange={({ target }) => setUrl(target.value)}
              value={url}
            />
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label">
            <label className="label" htmlFor="icon">
              Icon:
            </label>
          </div>
          <div className="field-body">
            <input
              className="input"
              id="icon"
              onChange={({ target }) => setIcon(target.value)}
              value={icon}
              list="iconlist"
            />
            <datalist id="iconlist">
              {icons.map(i => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label" />
          <div className="field-body">
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-info">
                  Add new activity
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddActivityForm;
