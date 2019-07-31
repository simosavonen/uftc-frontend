import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer is-hidden-mobile is-size-6-tablet">
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
          Admin tools:
          <p>
            <Link to="/addchallenge">add challenge</Link>
          </p>
          <p>
            <Link to="/addactivity">add activity</Link>
          </p>
          <p>
            <Link to="/updateuser">update user</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
