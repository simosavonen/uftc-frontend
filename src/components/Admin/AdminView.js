import React from 'react';
import { Link } from 'react-router-dom';

const AdminView = () => {
  return (
    <div>
      <p>
        <Link to="/addchallenge">add challenge</Link>
      </p>
      <p>
        <Link to="/addactivity">add activity</Link>
      </p>
      <p>
        <Link to="/addachievement">add achievement</Link>
      </p>
    </div>
  );
};

export default AdminView;
