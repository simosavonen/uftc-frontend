import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const sampleActivity = {
  name: 'Kahvakuulanosto',
  points: 3,
  type: 'Lihaskuntoharjoitus',
  unit: '5 nostoa',
  description: 'Nosta kahvakuula maan tasolta hartioiden yläpuolelle',
  url: 'https://www.youtube.com/watch?v=4JCuW2RtXy0',
  id: '5d1b565dd5a1bf1f482b2c35'
};

const sampleBadges = [
  {
    id: '3d1b329d0919c12538a61c12',
    date: '2019-06-25',
    user: '5d1b62dc79f30c32ec7b3372',
    achievement: '1111565dd5a1bf1f482b2c35'
  },
  {
    id: '4d1b329d4564c12538a61c99',
    date: '2019-07-02',
    user: '5d1b62dc79f30c32ec7b3372',
    achievement: '2222565dd5a1bf1f482b2c35'
  }
];

const sampleAchievements = [
  {
    id: '1111565dd5a1bf1f482b2c35',
    name: 'Try New Things',
    requirement: 10,
    pointsReward: 25,
    activity: '5d1b565dd5a1bf1f482b2c35'
  },
  {
    id: '2222565dd5a1bf1f482b2c35',
    name: 'Keep At It',
    requirement: 1000,
    pointsReward: 100,
    activity: '5d1b565dd5a1bf1f482b2c35'
  },
  {
    id: '3333565dd5a1bf1f482b2c35',
    name: 'Kettlebell Champion',
    requirement: 3000,
    pointsReward: 300,
    activity: '5d1b565dd5a1bf1f482b2c35'
  }
];

const ActivityRow = props => {
  const {
    activity = sampleActivity,
    badges = sampleBadges,
    achievements = sampleAchievements
  } = props;

  const randomColor = () => {
    const colors = [
      '#ff2457',
      '#57ff24',
      '#248aff',
      '#ffe524',
      '#ff4124',
      '#ff24c5',
      '#24ff99',
      '#c5ff24',
      '#ff7824'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const randomIcon = () => {
    const icons = ['medal', 'crown', 'trophy', 'award'];
    return icons[Math.floor(Math.random() * icons.length)];
  };

  return (
    <Link
      to={`/activities/${activity.id.substr(0, 8)}`}
      className="columns is-centered is-mobile is-clickable"
    >
      <div className="column is-5 has-text-right is-size-5-mobile is-size-4">
        {badges.map(badge => (
          <FontAwesomeIcon
            key={badge.id}
            icon={randomIcon()}
            size="2x"
            color={randomColor()}
            style={{ width: '70px' }}
          />
        ))}
      </div>
      <div className="column is-7 has-text-left">
        <div>
          <h4 className="title is-size-5-mobile is-size-4 is-marginless">{activity.name}</h4>
          <p className="is-size-6-mobile is-size-5">
            next badge at{' '}
            <span className="has-text-info">{achievements[badges.length].requirement} points</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ActivityRow;
