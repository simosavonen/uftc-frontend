import React, { useState } from 'react';
import passwordService from '../services/passwords';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

const RequestResetEmailForm = props => {
  const [email, setEmail] = useState('');

  const submit = event => {
    event.preventDefault();
    passwordService
      .requestResetEmail(email)
      .then(response => {
        if (response.status === 200) {
          toast.success('Password reset link sent.');
        }
      })
      .catch(error => {
        toast.error('Unknown email.');
        console.log('requestResetEmail', error.message);
      });
  };
  return (
    <div className="section container">
      <h1 className="title">Forgotten your password?</h1>
      <h2 className="subtitle">Ask for a password reset link in email</h2>
      <form onSubmit={submit}>
        <div className="field">
          <label className="label">Email</label>

          <div className="field">
            <p className="control">
              <input
                className="input"
                type="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </p>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">Submit</button>
          </div>
          <div className="control">
            <button
              className="button is-text"
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
  );
};

export default withRouter(RequestResetEmailForm);
