import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../logos/plank_UFTC.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = props => {
  const [burgerActive, setBurgerActive] = useState(false);
  return (
    <nav className="navbar is-size-5-mobile is-size-5-tablet is-size-4-desktop">
      <div className="navbar-brand">
        <div className="navbar-item">
          <Logo width={100} height={40} />
        </div>
        {props.user && (
          <button
            className={`navbar-burger burger button is-info is-shadowless ${burgerActive &&
              'is-active'}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navMenu"
            onClick={() => setBurgerActive(!burgerActive)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        )}
      </div>
      <div id="navMenu" className={`navbar-menu ${burgerActive && 'is-active'}`}>
        <div className="navbar-start">
          {!props.user ? (
            <div className="navbar-item">Ultimate Functional Training Challenge</div>
          ) : (
            <>
              <Link className="navbar-item" to="/leaderboard">
                leaderboard
              </Link>
              <Link className="navbar-item" to="/badges">
                earned badges
              </Link>
              <Link className="navbar-item" to="/activities">
                your activities
              </Link>
            </>
          )}
        </div>
        <div className="navbar-end">
          {props.user ? (
            <Link
              to="/"
              className="navbar-item"
              onClick={() => {
                setBurgerActive(false);
                props.logout();
              }}
              style={{ marginRight: '1.5rem' }}
            >
              log out
            </Link>
          ) : (
            <div className="navbar-item" style={{ marginRight: '1.5rem' }}>
              Day 11 <FontAwesomeIcon icon="slash" transform={{ rotate: 75 }} /> 70
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
