import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { checkAchievements, checkDailyChallenges, badgeRewardsTotal } from '../utils/badges';

const Badge = ({ achievement, activity }) => {
  return (
    <div className="box blue-white-gradient">
      <article className="media">
        <p className="media-left">
          <span
            className="is-flex has-backround-white"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'white',
              boxShadow: '2px 2px  rgba(0,0,0,0.6)',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <span className="fa-layers fa-fw" style={{ width: '50px', height: '50px' }}>
              <FontAwesomeIcon
                icon={achievement.fontAwesomeIcon}
                size="2x"
                color={achievement.iconColor}
              />
            </span>
          </span>
        </p>
        <div className="media-content">
          <p className="content">
            <span className="has-text-weight-semibold">{achievement.name}</span>
            <br />
            Get {achievement.requirement} points{' '}
            {activity
              ? `from ${activity.name}`
              : `total on ${moment(achievement.date).format('MMM Do')}`}
            .
            <br />
            {achievement.pointsReward > 0 && (
              <span className="has-text-danger">
                Reward: {achievement.pointsReward} extra points
              </span>
            )}
          </p>
        </div>
      </article>
    </div>
  );
};

const AchievementTable = ({ achievements, activities }) => {
  return (
    <div>
      <table className="table is-fullwidth is-narrow is-size-7-mobile is-size-6-tablet is-size-5-widescreen">
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Activity</th>
            <th>Target</th>
            <th>Reward</th>
          </tr>
        </thead>
        <tbody>
          {achievements.map(a => (
            <tr key={a.id}>
              <td>
                <span className="fa-fw" style={{ width: '1em', height: '1em' }}>
                  <FontAwesomeIcon icon={a.fontAwesomeIcon} size="1x" color={a.iconColor} />
                </span>
              </td>
              <td>{a.name}</td>
              <td>{activities.find(ac => ac.id === a.activity).name}</td>
              <td>{a.requirement}</td>
              <td>{a.pointsReward}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const DailyChallengeTable = ({ achievements }) => {
  return (
    <div>
      <table className="table is-fullwidth is-narrow is-size-7-mobile is-size-6-tablet is-size-5-widescreen">
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Date</th>
            <th>Target</th>
            <th>Reward</th>
          </tr>
        </thead>
        <tbody>
          {achievements.map(a => (
            <tr key={a.id}>
              <td>
                <span className="fa-fw" style={{ width: '1em', height: '1em' }}>
                  <FontAwesomeIcon icon={a.fontAwesomeIcon} size="1x" color={a.iconColor} />
                </span>
              </td>
              <td>{a.name}</td>
              <td>{moment(a.date).format('MMM Do')}</td>
              <td>{a.requirement}</td>
              <td>{a.pointsReward}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const BadgesView = props => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => setShowAll(!showAll);

  const [myBadges, setMyBadges] = useState([]);
  useEffect(() => {
    setMyBadges(
      checkAchievements(props.workouts, props.activities, props.achievements, props.challenge)
    );
  }, [props.achievements, props.activities, props.challenge, props.workouts]);

  const [myDailyBadges, setMyDailyBadges] = useState([]);
  useEffect(() => {
    setMyDailyBadges(
      checkDailyChallenges(props.workouts, props.activities, props.achievements, props.challenge)
    );
  }, [props.achievements, props.activities, props.challenge, props.workouts]);

  const badges = myBadges.map(a => (
    <div className="column is-6" key={a.id}>
      <Badge
        achievement={a}
        key={a.id}
        activity={props.activities.find(ac => ac.id === a.activity)}
      />
    </div>
  ));

  const dailyBadges = myDailyBadges.map(a => (
    <div className="column is-6" key={a.id}>
      <Badge
        achievement={a}
        key={a.id}
        activity={props.activities.find(ac => ac.id === a.activity)}
      />
    </div>
  ));

  const allAchievements = props.achievements.filter(a => a.activity);

  const allDailyChallenges = props.achievements.filter(a => !a.activity); // Daily challenge achievements have a null activity field

  return (
    <div className="container">
      <section className="section">
        <h1 className="title is-4 is-size-5-mobile ">
          <FontAwesomeIcon icon="medal" size="2x" />
          Your badges
        </h1>
        <h2 className="subtitle">{`Unlocked: ${myBadges.length} / ${allAchievements.length}`}</h2>
        <div className="columns is-multiline is-size-6-mobile is-size-6-tablet">{badges}</div>
        <h2 className="subtitle">{`Total reward points: ${badgeRewardsTotal(myBadges)}`}</h2>
      </section>
      <section className="section">
        <h1 className="title is-4 is-size-5-mobile">
          <FontAwesomeIcon icon="medal" size="2x" />
          Your daily challenge badges
        </h1>
        <h2 className="subtitle">{`Unlocked: ${myDailyBadges.length} / ${
          allDailyChallenges.length
        }`}</h2>
        <div className="columns is-multiline is-size-6-mobile is-size-6-tablet">{dailyBadges}</div>
        <h2 className="subtitle">{`Total reward points: ${badgeRewardsTotal(myDailyBadges)}`}</h2>
      </section>
      <section className="section">
        <div className="level is-mobile">
          <div className="level-left">
            <h1 className="title is-4 is-size-5-mobile level-item">
              <FontAwesomeIcon icon="medal" size="2x" />
              All badges
            </h1>
          </div>
          <div className="level-right">
            <button
              className="button title is-4 is-size-6-mobile level-item"
              onClick={toggleShowAll}
            >
              {showAll ? 'Close' : 'Show all'}
            </button>
          </div>
        </div>
        {showAll && (
          <AchievementTable
            achievements={props.achievements.filter(a => a.activity)}
            activities={props.activities}
          />
        )}
      </section>
      {showAll && (
        <section className="section">
          <h1 className="title is-4 is-size-5-mobile">
            <FontAwesomeIcon icon="medal" size="2x" />
            Daily challenges
          </h1>
          <div className=" is-size-6-mobile is-size-6-tablet">
            <DailyChallengeTable achievements={props.achievements.filter(a => !a.activity)} />
          </div>
        </section>
      )}
    </div>
  );
};

export { Badge };
export default BadgesView;
