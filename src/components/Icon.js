import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({ icon, ...other }) => {
  const terms = icon.split(' ');
  if (terms.length > 1) {
    return <FontAwesomeIcon icon={[terms[0], terms[1]]} {...other} />;
  } else {
    return <FontAwesomeIcon icon={icon} {...other} />;
  }
};

export default Icon;
