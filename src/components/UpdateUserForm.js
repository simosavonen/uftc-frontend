import React, { useState, useEffect } from 'react';
import userService from '../services/user';
import { useResource } from '../services/useResource';
import { apiUrls } from '../config/config';

const UpdateUserForm = props => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Please select one');
  const [counter, setCounter] = useState(0);
  const [challenges] = useResource(apiUrls.challenges);

  const isUserOrganizer = challenges.filter(
    c => c.organizers.toString() === props.user.id.toString()
  );

  const setToValue = value => setCounter(value);

  const buttonInfoTable = [
    {
      id: 1,
      text: 'Delete user data!',
      colour: 'button is-success',
      disabled: ''
    },
    {
      id: 2,
      text: 'Are you sure?',
      colour: 'button is-warning',
      disabled: ''
    },
    {
      id: 3,
      text: 'By pressing this button user data will be deleted!',
      colour: 'button is-danger',
      disabled: ''
    },
    {
      id: 4,
      text: 'Deleted! Press to continue ...',
      colour: 'button is-danger',
      disabled: ''
    },
    {
      id: 5,
      text: 'Deleted!',
      colour: 'button is-danger',
      disabled: 'disabled'
    }
  ];

  const buttonInfoTableForOrganizer = [
    {
      id: 1,
      text: 'You are the organizator of the challenge!',
      colour: 'button is-success',
      disabled: 'disabled'
    }
  ];

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

    if (counter === 0) {
      props.updateUser(userDetails);
    }

    if (counter === buttonInfoTable.length - 2) {
      console.log('Add code to delete user information.');
      setId('');
      setName('');
      setEmail('');
      setLocation('');
      //setToValue(0);
      //props.deleteUser(userDetails);
    }
  };

  const generalConfirmButton = (table, counter) => {
    return (
      <>
        <button
          type="submit"
          className={table[counter].colour}
          disabled={table[counter].disabled}
          onClick={() => setToValue(counter + 1)}
        >
          {table[counter].text} ({counter + 1} / {table.length})
        </button>
      </>
    );
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
        <br />
        <p>
          <button
            type="submit"
            className="button is-success"
            disabled={counter}
            onClick={() => setToValue(0)}
          >
            {!counter ? 'Update user data' : 'Cannot Update user data'}
          </button>
        </p>
        <br />
        <p>
          {!isUserOrganizer.length
            ? generalConfirmButton(buttonInfoTable, counter)
            : generalConfirmButton(buttonInfoTableForOrganizer, counter)}
        </p>
      </form>
    </section>
  );
};

export default UpdateUserForm;
