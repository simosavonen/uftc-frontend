import React from 'react';
import { Link } from 'react-router-dom';
import { icon } from './utils';
import slug from 'slug';

const ActivityDetails = ({ activity, challenge }) => {
  const points = challenge
    ? Math.round(activity.points * challenge.pointBonus * 10) / 10
    : activity.points;
  return (
    <Link to={`/activities/${slug(activity.name, { lower: true })}`}>
      <article
        className="media hover-effect-grey hover-svg-red"
        style={{ padding: '0.2em', marginBottom: '0.5em' }}
      >
        <figure className="media-left image is-48x48">{icon(activity.icon)}</figure>
        <div className="media-content">
          <div className="content">
            <p className="title is-5">{activity.name}</p>
            <p className="subtitle is-6">{activity.description}</p>
          </div>
        </div>
        <div className="media-right has-text-right">
          <h1 className="title is-5 has-text-danger">{points} points</h1>
          <h2 className="subtitle is-6">{activity.unit}</h2>
        </div>
      </article>
    </Link>
  );
};

export default ActivityDetails;
