import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <div className="footer is-hidden-mobile is-size-6-tablet red-linear-gradient has-text-light">
      <div className="columns is-mobile is-centered">
        <div className="column is-4 has-text-centered">
          UFTC
          <p>Capstone project</p>
          <p>University of Turku</p>
        </div>
        <div className="column is-3 has-text-centered is-hidden-mobile">
          middle column
          <p>Just In Case</p>
          <p>We Need This</p>
        </div>
        <div className="column is-4 has-text-centered">
          <p>
            <Link to="/updateuser" className="has-text-light">
              <span className="icon is-medium">
                <FontAwesomeIcon icon="user-alt" />
              </span>
              User profile
            </Link>
          </p>
          <p>
            <Link to="/admin" className="has-text-light">
              <span className="icon is-medium">
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
