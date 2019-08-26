import React, { useState, useEffect } from 'react';
import passwordService from '../services/passwords';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PasswordResetForm = ({ resetToken, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    passwordService
      .verifyResetToken(resetToken)
      .then(response => {
        if (response.status === 200) {
          console.log(response);
          setEmail(response.data.email);
        }
      })
      .catch(error => {
        console.log('verifyResetToken', error.message);
      });
  }, [resetToken]);

  useEffect(() => {
    setIsValid(password.length > 7);
  }, [password]);

  const submit = event => {
    event.preventDefault();
    passwordService
      .resetPassword(resetToken, password)
      .then(response => {
        if (response.status === 200) {
          toast.success('Password updated OK');
          history.push('/');
        }
      })
      .catch(error => {
        toast.error('Failed to change password.');
        console.log('resetPassword', error.message);
      });
  };

  return (
    <div className="blue-gradient">
      <div className="section container is-fullheight">
        <h1 className="title has-text-white">Reset your password</h1>
        <form onSubmit={submit}>
          <div className="field">
            <label className="label has-text-white">Email</label>
            <p className="control">
              <input
                className="input is-static has-text-white"
                type="email"
                value={email}
                autoComplete={email}
              />
            </p>
          </div>

          <div className="field">
            <label className="label has-text-white">Password</label>
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                placeholder="new password"
                autoComplete="new-password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon="lock" />
              </span>
            </p>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button
                className={`button ${isValid && 'is-success'} has-text-weight-bold`}
                disabled={!isValid}
              >
                Reset password
              </button>
            </div>
            <div className="control">
              <button
                className="button is-text has-text-weight-bold"
                onClick={event => {
                  event.preventDefault();
                  history.push('/');
                }}
              >
                cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(PasswordResetForm);
