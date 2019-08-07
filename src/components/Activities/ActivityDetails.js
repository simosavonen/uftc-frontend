import React from 'react';
import { Link } from 'react-router-dom';
import { icon } from './utils';

const ActivityDetails = ({ activity }) => {
  return (
    <Link to={`/activities/${activity.id.substr(0, 8)}`}>
      <article
        className="media hover-effect-grey hover-svg-red"
        style={{ padding: '0.2em', marginBottom: '0.5em' }}
      >
        <figure className="media-left image is-48x48">{icon(activity.icon)}</figure>
        <div className="media-content">
          <div className="content">
            <p className="title is-4">{activity.name}</p>
            <p className="subtitle is-6">{activity.description}</p>
          </div>
        </div>
        <div className="media-right" />
      </article>
    </Link>
  );
};

export default ActivityDetails;
