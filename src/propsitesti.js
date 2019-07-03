import React from 'react';

const Propsitesti = props => {
  const { activity = { name: 'nimi' }, user = { username: 'teuvoTestaaja' } } = props;
  return (
    <div>
      {activity.name}
      {user.username}
    </div>
  );
};

export default Propsitesti;
