import React, { useState } from 'react';
import moment from 'moment';
import Icon from './Icon';

const Ikonipallo = ({ series, iconName, handleClick, isSelected, isActiveChallenge }) => {
  let styles = {
    width: '20vw',
    minWidth: '110px',
    maxWidth: '200px',
    height: '20vw',
    minHeight: '110px',
    maxHeight: '200px',
    borderRadius: '20vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto'
  };
  if (isSelected && !isActiveChallenge) {
    styles = {
      ...styles,
      borderStyle: 'solid',
      borderColor: 'black',
      borderWidth: '6px'
    };
  }

  return (
    <div
      style={styles}
      className="red-circle-gradient is-clickable has-text-centered has-text-white-ter is-size-6-mobile is-size-5-tablet is-size-4-desktop is-size-3"
      onClick={() => {
        handleClick();
      }}
    >
      <Icon icon={iconName} size="2x" />
      <p>{series.seriesTitle}</p>
      <p style={{ color: '#000000', fontWeight: 'bold' }} title="participants">
        {series.participants ? series.participants : <>&nbsp;</>}
      </p>
    </div>
  );
};

const ChallengeSelectView = props => {
  const [selectedSeries, setSelectedSeries] = useState(null);

  const handleClickOnBall = seriesId => () => {
    return setSelectedSeries(seriesId);
  };

  const saveSelection = () => {
    const userDetails = {
      ...props.user,
      activeChallenge: selectedSeries
    };
    props.updateUser(userDetails);
  };

  const today = moment();
  const challengesToShow = props.challenges.filter(c =>
    moment(c.releaseDate).isSameOrBefore(today, 'day')
  );
  const challengeNames = Array.from(new Set(challengesToShow.map(c => c.name)));

  const showActiveChallenge = () => (
    <>
      <div className="ambientia-block" />
      <div>Your series</div>
    </>
  );

  const showSelectionButton = () => (
    <>
      <div className="has-text-weight-bold is-size-5-mobile is-size-4-tablet is-size-3">
        Pick this series?
      </div>
      <button onClick={saveSelection} className="button is-large is-success is-rounded">
        Yes, let's begin!
      </button>
    </>
  );

  const challengeSelections = challenges =>
    challenges.map(c => (
      <div className="column has-text-centered " key={c.id}>
        <Ikonipallo
          series={c}
          iconName={c.icon || 'stopwatch'}
          handleClick={handleClickOnBall(c.id)}
          isSelected={c.id === selectedSeries}
          isActiveChallenge={c.id === props.user.activeChallenge}
        />
        <div
          dangerouslySetInnerHTML={{ __html: c.description }}
          className="content is-size-6-mobile is-size-6-tablet is-size-5-desktop"
          style={{ padding: '0.5em' }}
        />
        <div className="has-text-weight-bold is-size-6-mobile is-size-5-tablet is-size-4">
          {props.user && props.user.activeChallenge === c.id && showActiveChallenge()}
        </div>
        <div>
          {props.user &&
            selectedSeries === c.id &&
            props.user.activeChallenge !== c.id &&
            showSelectionButton()}
        </div>
      </div>
    ));

  return (
    <>
      <section className="section has-text-centered" style={{ paddingBottom: '0.5em' }}>
        <h1 className="title is-3 ">Welcome to the UFTC!</h1>
        <h2 className="subtitle is-5">Ultimate Functional Training Challenge</h2>
        <p
          className="is-size-7-mobile is-size-6-tablet is-size-5-desktop"
          style={{ minWidth: '250px', maxWidth: '70%', margin: 'auto' }}
        >
          UFTC is a fun exercise competition where the participants record their workouts and earn
          points towards the challenge goal.
          <br />
          <br />
          Achieve enough points from a <strong>single activity</strong> or during a special{' '}
          <strong>one-day-challenge</strong> and you'll be rewarded with badges.
        </p>
      </section>
      {challengeNames.map(challengeName => (
        <section className="section has-text-centered" key={challengeName}>
          <div className="columns is-centered">
            <div className="column is-8-tablet is-7-desktop is-6-widescreen">
              <div
                className="notification is-danger is-size-6-mobile is-size-5-tablet is-size-4-desktop"
                dangerouslySetInnerHTML={{ __html: challengeName }}
              ></div>
            </div>
          </div>

          <br />
          <h2 className="title is-size-5-mobile is-size-4-tablet">
            Challenger, choose your series:
          </h2>

          <div className="columns is-centered">
            {challengeSelections(challengesToShow.filter(c => c.name === challengeName))}
          </div>
        </section>
      ))}
    </>
  );
};

export default ChallengeSelectView;
