import React from 'react';

const Footer = props => {
  if (!props.user) return null;

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
          <a href="http://localhost:3000/addchallenge" target="_blank" rel="noopener noreferrer">
            http://localhost:3000/addchallenge
          </a>
          </p>
          <p>
          <a href="http://localhost:3000/addactivity" target="_blank" rel="noopener noreferrer">
            http://localhost:3000/addactivity
          </a>
          </p>         
          <p>link</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
