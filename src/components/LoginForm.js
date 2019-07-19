import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import kettlebeach from '../media/kettlebeach.mp4';
import { ReactComponent as Logo } from '../logos/plank_UFTC.svg';

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
    <>
      <video autoPlay muted loop id="myVideo">
        <source src={kettlebeach} type="video/mp4" />
      </video>
      <section className="hero is-fullheight">
        <div className="hero-head loginHeader columns is-centered is-mobile has-text-white-ter is-size-4">
          <div className="column">
            <Logo width={80} height={40} />
          </div>
          <div className="column" />
          <div className="column has-text-right">15 / 70</div>
        </div>
        <div className="hero-body columns is-centered is-mobile">
          <div
            className="column has-text-white-bis is-hidden-mobile is-5-tablet is-5-desktop is-5-widescreen is-5-fullhd"
            style={{ fontSize: '3.1vw' }}
          >
            <p>
              <span className="boxedLetter">U</span>ltimate
            </p>
            <p>
              <span className="boxedLetter">F</span>unctional
            </p>
            <p>
              <span className="boxedLetter">T</span>raining
            </p>
            <p>
              <span className="boxedLetter">C</span>hallenge
            </p>
          </div>
          <div className="column is-6-tablet is-5-desktop is-4-widescreen is-4-fullhd">
            <form className="box" onSubmit={submit}>
              <h1 className="title is-4 is-marginless">Welcome to the UFTC</h1>
              <h2 className="subtitle is-5 is-marginless">
                {isNewUser ? 'A new challenger appears' : 'Challenger, please log in'}
              </h2>
              <p>
                temp link to <Link to="/passwordreset">password reset</Link>
              </p>
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
        </div>
        <div className="hero-foot footer has-text-white-ter">
          <div className="columns is-centered is-mobile">
            <div className="column has-text-centered">
              Capstone Project
              <p>University of Turku</p>
            </div>
            <div className="column has-text-centered is-hidden-mobile">
              Middle Thingy
              <p>Just In Case</p>
            </div>
            <div className="column has-text-centered">
              admin tools
              <p>link</p>
              <p>link</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
