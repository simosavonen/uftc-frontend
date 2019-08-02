import React, { useState, useEffect } from 'react';
import userService from '../services/user';

const UpdateUserForm = props => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Please select one');

  useEffect(() => {
    if (props.user) {
      userService.setToken(props.user.token);
      userService.get().then(result => {
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

  return (
    <section className="section columns is-centered">
      <form onSubmit={submit} className="column is-6">
        <p>
          <label htmlFor="name">Display Name:</label>
          <input
            id="name"
            onChange={({ target }) => setName(target.value)}
            value={name}
            style={{ width: '200px' }}
          />
        </p>
        <p>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            onChange={({ target }) => setEmail(target.value)}
            value={email}
            style={{ width: '200px' }}
          />
        </p>
        <p>
          <label htmlFor="location">Location:</label>
          <select value={location} onChange={({ target }) => setLocation(target.value)}>
            <option>{location}</option>
            <option>Hämeenlinna</option>
            <option>Helsinki</option>
            <option>Joensuu</option>
            <option>Tampere</option>
            <option>Turku</option>
            <option>Tallinn</option>
            <option>Tartu</option>
          </select>
        </p>
        <button type="submit">Update user data</button>
      </form>
    </section>
  );
};

export default UpdateUserForm;
