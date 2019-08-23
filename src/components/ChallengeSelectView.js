import React, { useState } from 'react';
import moment from 'moment';
import Icon from './Icon';

const Ikonipallo = ({ series, iconName, bgColor, handleClick, isSelected, isActiveChallenge }) => {
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
  const bulmaClass =
    'has-text-centered has-text-white-ter is-size-6-mobile is-size-5-tablet is-size-4-desktop is-size-3';
  let customClass = 'series-button-hoverable';
  if (isActiveChallenge) customClass = 'series-button';
  const className = bulmaClass + ' ' + customClass;

  return (
    <div
      style={styles}
      className={className}
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

const BraceLeft = () => (
  <span style={{ fontFamily: 'Verdana', color: '#ff2457', fontSize: 'larger' }}>&#x7b;</span>
);

const BraceRight = () => (
  <span style={{ fontFamily: 'Verdana', color: '#ff2457', fontSize: 'larger' }}>&#x7d;</span>
);

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
      <div> Your challenge</div>
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
          bgColor="#ff2457"
          handleClick={handleClickOnBall(c.id)}
          isSelected={c.id === selectedSeries}
          isActiveChallenge={c.id === props.user.activeChallenge}
        />
        <div
          dangerouslySetInnerHTML={{ __html: c.description }}
          className="content is-size-6-mobile is-size-5-tablet is-size-4"
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
      <section className="section has-text-centered">
        <h1 className="title is-3 ">Welcome to UFTC!</h1>
      </section>
      {challengeNames.map(challengeName => (
        <section className="section has-text-centered " key={challengeName}>
          <h1 className="is-size-4">
            <BraceLeft /> {challengeName} <BraceRight />
          </h1>
          <br />
          <h2 className="title is-5">Select series</h2>

          <div className="columns is-centered">
            {challengeSelections(challengesToShow.filter(c => c.name === challengeName))}
          </div>
        </section>
      ))}
    </>
  );
};

export default ChallengeSelectView;
