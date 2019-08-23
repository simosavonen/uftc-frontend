import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as Icon } from '../icons/icon.svg'; // placeholder box
import { ReactComponent as KettleBell } from '../icons/kettlebell.svg';
import { ReactComponent as Walking } from '../icons/walking.svg';
import { ReactComponent as Cycling } from '../icons/cycling.svg';
import { ReactComponent as Plank } from '../icons/plank.svg';
import { ReactComponent as PullUp } from '../icons/pullup.svg';
import { ReactComponent as PushUp } from '../icons/pushup.svg';

const icon = iconName => {
  if (!iconName.toLowerCase().endsWith('.svg')) {
    return <FontAwesomeIcon icon={iconName} size="2x" color="black" />;
  }
  switch (iconName) {
    case 'kettlebell.svg':
      return <KettleBell />;
    case 'walking.svg':
      return <Walking />;
    case 'cycling.svg':
      return <Cycling />;
    case 'plank.svg':
      return <Plank />;
    case 'pullup.svg':
      return <PullUp />;
    case 'pushup.svg':
      return <PushUp />;
    default:
      return <Icon />;
  }
};

export { icon };
