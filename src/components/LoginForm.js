import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoginForm = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState('');
  const [name, setName] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

  const submit = event => {
    event.preventDefault();
    const userDetails = {
      email,
      password,
      name
    };
    isNewUser ? props.register(userDetails) : props.login(userDetails);
  };

  // show these if we're registering a new user
  const registerFields = (
    <>
      <div className="field">
        <label className="label">Enter the password again</label>
        <div className="control has-icons-left">
          <input
            className="input"
            type="password"
            value={verify}
            onChange={({ target }) => setVerify(target.value)}
            required
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon="lock" />
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label">Display name</label>
        <div className="control has-icons-left">
          <input
            className="input"
            type="text"
            value={name}
            placeholder="full name or nickname"
            onChange={({ target }) => setName(target.value)}
            required
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon="user" />
          </span>
        </div>
        <p className="help">surnames will be abbreviated</p>
      </div>
    </>
  );

  return (
    <section className="section columns is-centered">
      <div className="column is-7-tablet is-6-desktop is-5-widescreen is-4-fullhd">
        <form className="box" onSubmit={submit}>
          <h1 className="title is-4">Welcome to the UFTC</h1>
          <h2 className="subtitle is-5">
            {isNewUser ? 'A new challenger appears' : 'Challenger, please log in'}
          </h2>
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="email"
                placeholder="first.last@ambientia.fi"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                required
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon="at" />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                required
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon="lock" />
              </span>
            </div>
          </div>

          {isNewUser && registerFields}

          <div className="field">
            <button className="button is-info is-outlined">
              {isNewUser ? 'Create an account' : 'Log in'}
            </button>
            <button
              className="button is-text is-pulled-right"
              onClick={event => {
                event.preventDefault();
                setIsNewUser(!isNewUser);
              }}
            >
              {isNewUser ? 'cancel' : 'create an account'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
