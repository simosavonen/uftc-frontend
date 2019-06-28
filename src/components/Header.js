import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../logos/plank_UFTC.svg';

const Header = props => {
  return (
    <nav className="navbar is-info">
      <div className="container" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
        <div className="navbar-brand">
          <div className="navbar-item">
            <Logo width={80} height={60} />
          </div>
        </div>
        <div id="navMenu" className="navbar-menu">
          <div className="navbar-start">
            {!props.user ? (
              <div className="navbar-item">Ultimate Functional Training Challenge</div>
            ) : (
              <>
                <Link className="navbar-item" to="/challenges">
                  challenges
                </Link>
                <Link className="navbar-item" to="/leaderboard">
                  leaderboard
                </Link>
                <Link className="navbar-item" to="/activities">
                  activities
                </Link>
              </>
            )}
          </div>
          <div className="navbar-end">
            {props.user && (
              <Link to="/" className="navbar-item" onClick={props.logout}>
                logout
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
