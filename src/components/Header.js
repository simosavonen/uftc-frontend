import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../logos/plank_UFTC.svg';

const Header = props => {
  const [burgerActive, setBurgerActive] = useState(false);

  return (
    <nav className="navbar has-text-weight-bold is-transparent is-size-5-mobile is-size-5-tablet is-size-4-desktop">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <Logo width={100} height={35} />
        </Link>
        <div
          className={`navbar-burger burger has-text-white ${burgerActive && 'is-active'}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navMenu"
          onClick={() => setBurgerActive(!burgerActive)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </div>
      </div>
      <div id="navMenu" className={`navbar-menu ${burgerActive && 'is-active'}`}>
        <div className="navbar-start">
          <NavLink
            className="navbar-item has-text-white"
            to="/activities"
            activeClassName="is-active has-text-grey-light"
          >
            activities
          </NavLink>
          <NavLink
            className="navbar-item has-text-white"
            to="/badges"
            activeClassName="is-active has-text-grey-light"
          >
            badges
          </NavLink>
          <NavLink
            className="navbar-item has-text-white"
            to="/leaderboard"
            activeClassName="is-active has-text-grey-light"
          >
            leaderboard
          </NavLink>
        </div>
        <div className="navbar-end">
          <Link
            to="/"
            className="navbar-item has-text-white"
            onClick={() => {
              setBurgerActive(false);
              props.logout();
            }}
            style={{ marginRight: '1.5rem' }}
          >
            log out
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
