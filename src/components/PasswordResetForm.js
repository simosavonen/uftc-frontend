import React, { useState, useEffect } from 'react';
import passwordService from '../services/passwords';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

const PasswordResetForm = ({ resetToken, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <div className="section container">
      <h1 className="title">Reset your password</h1>
      <form onSubmit={submit}>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Email</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  className="input is-static"
                  type="email"
                  value={email}
                  autoComplete={email}
                />
              </p>
            </div>
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Password</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="new password"
                  autoComplete="new-password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </p>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-link">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default withRouter(PasswordResetForm);
