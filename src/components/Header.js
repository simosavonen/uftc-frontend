import React from 'react';
import { ReactComponent as Logo } from '../logos/plank_UFTC.svg';

const Header = props => {
  return (
    <nav className="navbar is-primary is-spaced">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">
            <Logo width={105} height={95} />
            Ultimate Functional Training Challenge
          </div>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">Logged in as {props.user.name}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
