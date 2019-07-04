import React, { useState } from 'react';

const AddActivityForm = props => {
  const [name, setName] = useState('');
  const [points, setPoints] = useState(0);
  const [type, setType] = useState('');
  const [unit, setUnit] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  const submit = event => {
    event.preventDefault();
    const newActivity = {
      name,
      points,
      type,
      unit,
      description,
      url
    };
    props.addActivity(newActivity);
  };
  return (
    <section className="section columns is-centered">
      <form onSubmit={submit} className="column is-6">
        <p>
          <label htmlFor="name">Activity name:</label>
          <input id="name" onChange={({ target }) => setName(target.value)} value={name} />
        </p>
        <p>
          <label htmlFor="points">Points:</label>
          <input
            id="points"
            type="number"
            onChange={({ target }) => setPoints(target.value)}
            value={points}
          />
        </p>
        <p>
          <label htmlFor="type">Activity type:</label>
          <input id="type" onChange={({ target }) => setType(target.value)} value={type} />
        </p>
        <p>
          <label htmlFor="unit">Activity unit:</label>
          <input id="unit" onChange={({ target }) => setUnit(target.value)} value={unit} />
        </p>
        <p>
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            onChange={({ target }) => setDescription(target.value)}
            value={description}
          />
        </p>
        <p>
          <label htmlFor="url">Url:</label>
          <input id="url" onChange={({ target }) => setUrl(target.value)} value={url} />
        </p>
        <button type="submit">Add new activity</button>
      </form>
    </section>
  );
};

export default AddActivityForm;
