import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as Logo } from '../logos/ambientia-fc-logo-white.svg';

const Footer = () => {
  return (
    <div className="footer is-hidden-mobile is-size-6-tablet red-linear-gradient has-text-light">
      <div className="columns is-mobile is-centered">
        <div className="column is-4 has-text-centered">
          <Logo height={70} />
        </div>
        <div className="column is-3 has-text-centered is-hidden-mobile">
          University of Turku
          <p>Capstone project 2019</p>
          <Link to="/about" className="has-text-light has-text-weight-bold">
            <p>About the app</p>
          </Link>
        </div>
        <div className="column is-4 has-text-centered">
          <p style={{ marginTop: '0.5em' }}>
            <Link to="/updateuser" className="has-text-light">
              <span className="icon">
                <FontAwesomeIcon icon="user-alt" />
              </span>
              User profile
            </Link>
          </p>
          <p>
            <Link to="/admin" className="has-text-light">
              <span className="icon">
                <FontAwesomeIcon icon="cog" />
              </span>
              Admin tools
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
