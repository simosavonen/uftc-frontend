import React, { useState, useEffect } from 'react';
import passwordService from '../services/passwords';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RequestResetEmailForm = props => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setIsValid(email.match(re));
  }, [email]);

  const submit = event => {
    event.preventDefault();
    setIsWaiting(true);
    passwordService
      .requestResetEmail(email)
      .then(response => {
        toast.success('Password reset link sent.');
        setIsWaiting(false);
        setEmail('');
      })
      .catch(error => {
        // showing an error would let bots find working emails
        toast.success('Password reset link sent.');
        setIsWaiting(false);
        setEmail('');
      });
  };
  return (
    <div className="blue-gradient">
      <div className="section container is-fullheight">
        <h1 className="title is-size-5-mobile has-text-white">Forgot your password?</h1>
        <h2 className="subtitle is-size-6-mobile has-text-white">
          Email yourself a password reset link
        </h2>
        <form onSubmit={submit}>
          <div className="field">
            <label className="label has-text-white">Email</label>

            <div className="field">
              <div className="control is-expanded has-icons-left">
                <input
                  className="input"
                  type="email"
                  placeholder="first.last@ambientia.fi"
                  value={email}
                  onChange={({ target }) => setEmail(target.value.toLowerCase())}
                  required
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon="envelope" />
                </span>
              </div>
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button
                className={`button ${isWaiting && 'is-loading'} has-text-weight-bold ${isValid &&
                  'is-success'}`}
                disabled={!isValid}
              >
                Send reset link
              </button>
            </div>
            <div className="control">
              <button
                className="button is-text has-text-weight-bold"
                onClick={event => {
                  event.preventDefault();
                  props.history.goBack();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(RequestResetEmailForm);
