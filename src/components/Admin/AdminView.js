import React from 'react';
import { Link } from 'react-router-dom';
import { icon } from '../../utils/icons';

const AdminView = ({ challenges, user }) => {
  if (challenges.length === 0) {
    return <div className="section">Loading...</div>;
  }

  const isOrganizer = () => {
    return challenges[0].organizers.includes(user.id);
  };

  return (
    <section className="section">
      <div className="box">
        <h3 className="title is-3">
          <span className="icon is-large">{icon('cog', '#000000', '1x')}</span>
          <span>Admin tools</span>
        </h3>
        {!isOrganizer() ? (
          <h5 className="title is-5">
            <span className="icon is-large">{icon('exclamation-triangle', '#ff2457', '1x')}</span>
            <span>For organizers only!</span>
          </h5>
        ) : (
          <div className="columns is-centered">
            <div className="column has-text-centered">
              <Link to="/addchallenge" className="button is-large is-link">
                <span className="icon is-large">{icon('challenge.svg', '#ffffff')}</span>
                <span>Challenge</span>
              </Link>
              <p className="is-size-6" style={{ padding: '1em' }}>
                Edit the overall challenge details. Can also add or edit the series here.
              </p>
            </div>
            <div className="column has-text-centered">
              <Link to="/addactivity" className="button is-large is-link">
                <span className="icon is-large">{icon('olympics.svg', '#ffffff')}</span>
                <span>Activities</span>
              </Link>
              <p className="is-size-6" style={{ padding: '1em' }}>
                Add sports activities and edit their points, the category, the icon and write
                instructions.
              </p>
            </div>
            <div className="column has-text-centered">
              <Link to="/addachievement" className="button is-large is-link">
                <span className="icon is-large">{icon('medal', '#ffffff', '1x')}</span>
                <span>Achievements</span>
              </Link>
              <p className="is-size-6" style={{ padding: '1em' }}>
                Achievements can be added for a specific activity, or they can be set for a single
                date when points from all activities are taken into account.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminView;
