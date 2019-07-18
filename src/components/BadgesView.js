import React, { useState } from 'react';
import posed, { PoseGroup } from 'react-pose';
import { checkAchievements } from '../badges/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Badge = ({ achievement, activity }) => {
  return (
    <div className="box">
      <article className="media">
        <p className="media-left">
          <FontAwesomeIcon
            icon={achievement.fontAwesomeIcon}
            size="2x"
            color={achievement.iconColor}
            style={{ width: '70px' }}
          />
        </p>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{achievement.name}</strong>
              <br />
              <small>
                Get {achievement.requirement} points from {activity.name}.
              </small>
              <br />
              <small className="has-text-primary">
                Reward: {achievement.pointsReward} extra points
              </small>
            </p>
          </div>
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
      <h1 className="title is-4">
        <FontAwesomeIcon icon="medal" size="2x" />
        Your badges
      </h1>

      <div className="is-size-5-mobile is-size-6-tablet">{badges}</div>
    </div>
  );
};

export default BadgesView;
