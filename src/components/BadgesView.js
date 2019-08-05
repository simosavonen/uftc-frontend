import React, { useState } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { checkAchievements, badgeRewardsTotal } from '../badges/utils';

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
            Get {achievement.requirement} points{' '}
            {activity
              ? `from ${activity.name}`
              : `total on ${moment(achievement.date).format('YYYY-MM-DD')}`}
            .
            <br />
            <span className="has-text-danger">Reward: {achievement.pointsReward} extra points</span>
          </p>
        </div>
      </article>
    </div>
  );
};

const BadgesView = props => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => setShowAll(!showAll);

  const myAchievements = checkAchievements(props.workouts, props.activities, props.achievements);

  const badges = myAchievements.map(a => (
    <Badge
      achievement={a}
      key={a.id}
      activity={props.activities.find(ac => ac.id === a.activity)}
    />
  ));

  const allAchievements = props.achievements
    .filter(a => a.activity)
    .map(a => (
      <Badge
        achievement={a}
        key={a.id}
        activity={props.activities.find(ac => ac.id === a.activity)}
      />
    ));

  // Daily challenge achievements have a null activity field
  const dailyChallenges = props.achievements
    .filter(a => !a.activity)
    .map(a => <Badge achievement={a} key={a.id} activity={a.activity} />);

  return (
    <div>
      <section className="section">
        <h1 className="title is-4">
          <FontAwesomeIcon icon="medal" size="2x" />
          Your badges
        </h1>
        <h2 className="subtitle">{`Total reward points: ${badgeRewardsTotal(myAchievements)}`}</h2>
        <div className="section is-size-6-mobile is-size-6-tablet">{badges}</div>
      </section>
      <section className="section">
        <h1 className="title is-4">
          <FontAwesomeIcon icon="medal" size="2x" />
          All achievements
        </h1>
        <button className="button title is-4" onClick={toggleShowAll}>
          {showAll ? 'Close' : 'Show all'}
        </button>
        {showAll && (
          <div className="section is-size-6-mobile is-size-6-tablet">{allAchievements}</div>
        )}
      </section>
      {showAll && (
        <section className="section">
          <h1 className="title is-4">
            <FontAwesomeIcon icon="medal" size="2x" />
            Daily challenges
          </h1>
          <div className="section is-size-6-mobile is-size-6-tablet">{dailyChallenges}</div>
        </section>
      )}
    </div>
  );
};

export default BadgesView;
