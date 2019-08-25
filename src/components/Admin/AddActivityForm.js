import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { icons } from '../../config/config';
import { customIcon } from '../../utils/icons';

const AddActivityForm = props => {
  const [name, setName] = useState('');
  const [points, setPoints] = useState(1);
  const [type, setType] = useState('');
  const [unit, setUnit] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [icon, setIcon] = useState('');

  const [types, setTypes] = useState([]);
  const [editingActivity, setEditingActivity] = useState(null);

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

  useEffect(() => {
    if (editingActivity) {
      setName(editingActivity.name);
      setPoints(editingActivity.points);
      setType(editingActivity.type);
      setUnit(editingActivity.unit);
      setDescription(editingActivity.description);
      setUrl(editingActivity.url);
      setIcon(editingActivity.icon);
    }
  }, [editingActivity]);

  const submit = async event => {
    event.preventDefault();
    if (!editingActivity) {
      const newActivity = {
        name,
        points,
        type,
        unit,
        description,
        url,
        icon
      };
      try {
        await props.activityService.add(newActivity);
        toast.success('Activity added.');
        reset();
      } catch (error) {
        toast.warn('Failed to add an activity.');
      }
    } else {
      try {
        await props.activityService.update({
          id: editingActivity.id,
          name,
          points,
          type,
          unit,
          description,
          url,
          icon
        });
        toast.success('Activity updated.');
        reset();
      } catch (error) {
        toast.warn('Failed to update the activity.');
      }
    }
  };

  const reset = () => {
    setName('');
    setPoints(1);
    setType('');
    setUnit('');
    setDescription('');
    setUrl('');
    setIcon('');
    setEditingActivity(null);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column">
            <form onSubmit={submit}>
              <h1 className="title is-4">{editingActivity ? 'Edit' : 'Add'} an activity</h1>
              <div className="field is-grouped">
                <div className="control is-expanded">
                  <label className="label">Name</label>
                  <input
                    className="input"
                    onChange={({ target }) => setName(target.value)}
                    value={name}
                    required
                  />
                  <p className="help">The shorter the better</p>
                </div>
                <div className="control is-expanded">
                  <label className="label">Type</label>
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
                  <p className="help">Suggests existing types</p>
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control is-expanded">
                  <label className="label">Unit</label>
                  <input
                    className="input"
                    id="unit"
                    onChange={({ target }) => setUnit(target.value)}
                    value={unit}
                    required
                  />
                  <p className="help">5 lifts, 60 seconds, 10 km</p>
                </div>

                <div className="control is-expanded">
                  <label className="label">Points / Unit</label>
                  <input
                    className="input"
                    id="points"
                    type="number"
                    onChange={({ target }) => setPoints(target.value)}
                    value={points}
                  />
                  <p className="help">Gets multiplied by the point bonus</p>
                </div>
              </div>

              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    id="description"
                    onChange={({ target }) => setDescription(target.value)}
                    value={description}
                    required
                  />
                  <p className="help">
                    The first sentence (ending with a dot) is used in the activities menu, make it
                    succinct.
                  </p>
                </div>
              </div>

              <div className="field">
                <label className="label">Video URL</label>
                <div className="control">
                  <input
                    className="input"
                    id="url"
                    onChange={({ target }) => setUrl(target.value)}
                    value={url}
                  />
                  <p className="help">Can be left blank, shown as a simple text link</p>
                </div>
              </div>

              <div className="field">
                <label className="label">Icon</label>
                <div className="control">
                  <input
                    className="input"
                    id="icon"
                    onChange={({ target }) => setIcon(target.value.toLowerCase())}
                    value={icon}
                    list="iconlist"
                  />
                  <datalist id="iconlist">
                    {icons.map(i => (
                      <option key={i} value={i} />
                    ))}
                  </datalist>
                  <p className="help">
                    Select one of the suggested SVG files or give a FontAwesome icon: <br />
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

              <div className="field">
                <div className="control">
                  {editingActivity ? (
                    <div className="buttons">
                      <button className="button is-info">Save changes</button>
                      <button className="button is-text" onClick={() => reset()}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button className="button is-info">Add new activity</button>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className="column">
            {props.activities.length > 0 && (
              <div className="box">
                <h1 className="title is-size-6">Summary of the activities</h1>
                <table className="table is-size-7 is-fullwidth is-hoverable is-narrow">
                  <thead>
                    <tr>
                      <th>Icon</th>
                      <th>Name</th>
                      <th className="is-hidden-touch">Type</th>
                      <th>Unit</th>
                      <th title="points per unit" className="has-text-centered">
                        P
                      </th>
                      <th title="description" className="has-text-centered">
                        D
                      </th>
                      <th title="video URL" className="has-text-centered">
                        V
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.activities.map(a => (
                      <tr key={a.id} className="is-clickable" onClick={() => setEditingActivity(a)}>
                        <td
                          className="has-text-centered"
                          style={{ width: '35px', height: '30px' }}
                          title={a.icon}
                        >
                          {customIcon(a.icon, '#000000', '1x')}
                        </td>
                        <td>{a.name}</td>
                        <td className="is-hidden-touch">{a.type}</td>
                        <td>{a.unit}</td>
                        <td className="has-text-centered">{a.points}</td>
                        <td
                          className="has-text-centered"
                          title={a.description ? a.description : ''}
                        >
                          {a.description ? 'Y' : ''}
                        </td>
                        <td className="has-text-centered" title={a.url ? a.url : ''}>
                          {a.url ? (
                            <a href={a.url} target="_blank" rel="noopener noreferrer">
                              Y
                            </a>
                          ) : (
                            ''
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="has-text-right is-size-7">click on a row to edit the activity</p>
              </div>
            )}

            <div className="box">
              <h1 className="title is-size-6">Preview of the imported SVG files</h1>
              <div className="is-clearfix">
                {icons.map(i => (
                  <div
                    key={i}
                    className="has-text-centered is-pulled-left is-clickable hover-effect-grey"
                    style={{ padding: '0.5em' }}
                    onClick={() => setIcon(i)}
                  >
                    <div className="image is-48x48" style={{ margin: 'auto' }}>
                      {customIcon(i, '#000000', '1x')}
                    </div>
                    <p className="is-size-7">{i}</p>
                  </div>
                ))}
              </div>
              <p className="is-size-7 has-text-right">can select the icon by clicking</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddActivityForm;
