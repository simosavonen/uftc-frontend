import React from 'react';
import { Link } from 'react-router-dom';

const AdminView = () => {
  return (
    <div>
      <section className="section">
        <h1 className="title is-4">Admin tools</h1>
        <h2 className="subtitle is-6">For organizers only!</h2>
        <div className="menu">
          <ul className="menu-list">
            <li>
              <Link to="/addchallenge">Add challenge</Link>
            </li>
            <li>
              <Link to="/addactivity">Add activity</Link>
            </li>
            <li>
              <Link to="/addachievement">Add achievement</Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AdminView;
