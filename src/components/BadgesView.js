import React from 'react';
import { checkAchievements } from '../badges/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Badge = ({ achievement, activity }) => {
  return (
    <div className="box blue-white-gradient">
      <article className="media">
        <p className="media-left">
          <span className="fa-layers fa-fw" style={{ width: '70px', height: '70px' }}>
            <FontAwesomeIcon icon={'circle'} size="3x" color={'white'} />
            <FontAwesomeIcon
              icon={achievement.fontAwesomeIcon}
              size="2x"
              color={achievement.iconColor}
            />
          </span>
        </p>
        <div className="media-content">
          <p className="content">
            <strong>{achievement.name}</strong>
            <br />
            Get {achievement.requirement} points from {activity.name}.
            <br />
            <span className="has-text-danger">Reward: {achievement.pointsReward} extra points</span>
          </p>
        </div>
      </article>
    </div>
  );
};

const BadgesView = props => {
  const myAchievements = checkAchievements(props.workouts, props.activities, props.achievements);

  const badges = myAchievements.map(a => (
    <Badge
      achievement={a}
      key={a.id}
      activity={props.activities.find(ac => ac.id === a.activity)}
    />
  ));

  return (
    <div>
      <h1 className="title is-4 is-marginless">
        <FontAwesomeIcon icon="medal" size="2x" />
        Your badges
      </h1>

      <div className="section is-size-6-mobile is-size-6-tablet">{badges}</div>
    </div>
  );
};

export default BadgesView;
