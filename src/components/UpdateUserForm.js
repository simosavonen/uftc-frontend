import React, { useState, useEffect } from 'react';
import userService from '../services/user';
import { useResource } from '../services/useResource';
import { apiUrls } from '../config/config';
import { locations } from '../config/config';

const UpdateUserForm = props => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Please select one');
  const [counter, setCounter] = useState(0);
  const [challenges] = useResource(apiUrls.challenges);

  useEffect(() => {
    if (props.user) {
      userService.setToken(props.user.token);
      userService.me().then(result => {
        setId(result.data.id);
        setName(result.data.name);
        setEmail(result.data.email);
        setLocation(result.data.location);
      });
    }
  }, [props.user]);

  const submit = event => {
    event.preventDefault();
    const userDetails = {
      id,
      name,
      email,
      location
    };

    props.updateUser(userDetails);
  };

  const locationNames = Object.keys(locations);

  return (
    <section className="section columns is-centered">
      <form onSubmit={submit} className="column is-6">
        <h1 className="title is-5">Update user profile</h1>
        <div className="field">
          <label className="label">Display Name:</label>
          <div className="control">
            <input
              className="input"
              type="text"
              onChange={({ target }) => setName(target.value)}
              value={name}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Email:</label>
          <div className="control">
            <input
              className="input"
              type="email"
              onChange={({ target }) => setEmail(target.value)}
              value={email}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Location:</label>
          <div className="select">
            <select value={location} onChange={({ target }) => setLocation(target.value)}>
              {locationNames.map(loc => (
                <option key={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-info">save changes</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default UpdateUserForm;
