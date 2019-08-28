import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../logos/plank_UFTC.svg';

const Header = props => {
  const [burgerActive, setBurgerActive] = useState(false);

  return (
    <nav className="navbar has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-desktop">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/selectseries">
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
        <div
          id="navMenu"
          className={`navbar-menu is-size-6-mobile is-size-5-tablet  ${burgerActive &&
            'is-active'}`}
        >
          <div className="navbar-start">
            <NavLink
              className="navbar-item has-text-white"
              to="/activities"
              activeClassName="is-active has-text-dark"
            >
              activities
            </NavLink>
            <NavLink
              className="navbar-item has-text-white"
              to="/badges"
              activeClassName="is-active has-text-dark"
            >
              badges
            </NavLink>
            <NavLink
              className="navbar-item has-text-white"
              to="/leaderboard"
              activeClassName="is-active has-text-dark"
            >
              leaderboard
            </NavLink>
            <NavLink
              className="navbar-item has-text-white"
              to="/topfives"
              activeClassName="is-active has-text-dark"
            >
              top5
            </NavLink>
            <NavLink
              className="navbar-item has-text-white is-hidden-tablet"
              to="/updateuser"
              activeClassName="is-active has-text-dark"
            >
              profile
            </NavLink>
            <NavLink
              className="navbar-item has-text-white is-hidden-tablet"
              to="/about"
              activeClassName="is-active has-text-dark"
            >
              about
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
      </div>
    </nav>
  );
};

export default Header;
