import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../logos/plank_UFTC.svg';
import { ReactComponent as AmbientiaLogo } from '../logos/ambientia-fc-logo-white.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { locations } from '../config/config';

const LoginForm = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('Please select one');
  const [isNewUser, setIsNewUser] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    let invalidFields = 0;

    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    !email.match(re) && (invalidFields += 1);

    password.length < 8 && (invalidFields += 1);

    if (isNewUser) {
      location === 'Please select one' && (invalidFields += 1);
      name.length < 3 && (invalidFields += 1);
    }

    setIsValid(invalidFields === 0);
  }, [email, password, name, location, isNewUser]);

  const formatEmail = value => {
    const formatted = value
      .replace(/ä/g, 'a')
      .replace(/ö/g, 'o')
      .replace(/å/g, 'a');
    setEmail(formatted);
  };

  const submit = event => {
    event.preventDefault();
    const userDetails = {
      email,
      password
    };
    if (isNewUser) {
      userDetails.name = name;
      userDetails.location = location;
      userDetails.secret = props.secret ? props.secret : '';
      props.register(userDetails);
    } else {
      props.login(userDetails);
    }
  };

  const locationNames = Object.keys(locations);

  // show these if we're registering a new user
  const registerFields = (
    <>
      <div className="field" style={{ width: '100%' }}>
        <label className="label has-text-white">Location</label>
        <div className="control has-icons-left is-expanded">
          <div className="select is-fullwidth">
            <select
              value={location}
              id="Location"
              onChange={({ target }) => setLocation(target.value)}
            >
              <option disabled>Please select one</option>
              {locationNames.map(loc => (
                <option key={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div className="icon is-small is-left">
            <FontAwesomeIcon icon="map-marker-alt" />
          </div>
        </div>
      </div>

      <div className="field" style={{ width: '100%' }}>
        <label className="label has-text-white">Display name</label>
        <div className="control has-icons-left">
          <input
            className="input"
            type="text"
            value={name}
            placeholder="full name or nickname"
            id="Fullname"
            onChange={({ target }) => setName(target.value)}
            required
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon="user" />
          </span>
        </div>
        <p className="help has-text-white has-text-right">surnames will be abbreviated</p>
      </div>
    </>
  );

  return (
    <div className="kettlebeach">
      <section className="is-fullheight">
        <div className="columns is-centered is-fullheight is-marginless">
          <div className="column is-4 is-hidden-mobile" />
          <div className="column is-7-tablet is-6-desktop is-5-widescreen blue-white-gradient is-fullheight is-paddingless">
            <form
              className="is-fullheight"
              onSubmit={submit}
              style={{
                padding: 'calc(0.5em + 1vh) calc(1em + 3vw)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div
                id="top"
                className={`has-text-centered ${isNewUser ? 'logobox-small' : 'logobox-big'}`}
              >
                <Logo height="80%" />
                <h1
                  className="is-size-6-mobile is-size-6-tablet is-size-5 has-text-white has-text-weight-bold"
                  style={{ marginTop: '0.5vh' }}
                >
                  Ultimate Functional Training Challenge
                </h1>
              </div>

              <div id="middle" style={{ width: '100%' }}>
                <div className="field" style={{ width: '100%' }}>
                  <label className="label has-text-white">Email</label>
                  <div className="control is-expanded has-icons-left">
                    <input
                      className="input"
                      id="Email"
                      type="email"
                      placeholder="first.last@ambientia.fi"
                      value={email}
                      onChange={({ target }) => formatEmail(target.value.toLowerCase())}
                      required
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon="envelope" />
                    </span>
                  </div>
                </div>

                <div className="field" style={{ width: '100%' }}>
                  <label className="label has-text-white">Password</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      id="Password"
                      type="password"
                      value={password}
                      onChange={({ target }) => setPassword(target.value)}
                      required
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon="lock" />
                    </span>
                  </div>
                  <Link
                    to="/passwordreset"
                    className={`help has-text-white has-text-right ${isNewUser && 'is-hidden'}`}
                  >
                    forgot your password?
                  </Link>
                </div>

                {isNewUser && registerFields}

                <div className="field is-grouped">
                  <div className="control is-expanded">
                    <button
                      className={`button is-fullwidth has-text-weight-bold ${isValid &&
                        'is-success'}`}
                      disabled={!isValid}
                      id="Create"
                      title={isValid ? '' : 'Check the form fields'}
                    >
                      {isNewUser ? 'Create an account' : 'Log in'}
                    </button>
                  </div>
                  <div className="control">
                    <button
                      className="button is-text has-text-weight-bold"
                      onClick={event => {
                        event.preventDefault();
                        setIsNewUser(!isNewUser);
                      }}
                      disabled={props.secret === undefined}
                      title={'Use the link provided by the organizers'}
                    >
                      {isNewUser ? 'cancel' : 'create an account'}
                    </button>
                  </div>
                </div>
              </div>
              <div
                id="bottom"
                className={`has-text-centered ${isNewUser ? 'logobox-small' : 'logobox-big'}`}
              >
                <AmbientiaLogo width="70%" />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;
