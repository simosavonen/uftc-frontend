import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Ikonipallo = ({ sarja, osallistujia, iconName, bgColor }) => {
  const styles = {
    backgroundColor: bgColor,
    width: '16vw',
    minWidth: '110px',
    height: '16vw',
    minHeight: '110px',
    borderRadius: '16vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto'
  };

  return (
    <div
      style={styles}
      className="has-text-centered has-text-white-ter is-size-6-mobile is-size-5-tablet is-size-4-desktop is-size-3"
      onClick={() => console.log('klikkasit', sarja)}
    >
      <FontAwesomeIcon icon={iconName} size="2x" />
      <p>{sarja}</p>
      <p style={{ color: '#000000', fontWeight: 'bold' }}>
        {osallistujia ? osallistujia : <>&nbsp;</>}
      </p>
    </div>
  );
};

const ChallengeSelect = ({ challenge, iconName, bgColor }) => {
  const styles = {
    backgroundColor: bgColor,
    width: '16vw',
    minWidth: '110px',
    height: '16vw',
    minHeight: '110px',
    borderRadius: '16vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto'
  };

  return (
    <>
      <div
        style={styles}
        className="has-text-centered has-text-white-ter is-size-6-mobile is-size-5-tablet is-size-4-desktop is-size-3"
        onClick={() => console.log('klikkasit', challenge)}
      >
        <FontAwesomeIcon icon={iconName} size="2x" />
        <p>{challenge.seriesTitle}</p>
      </div>
    </>
  );
};

const FrontPage = props => {
  console.log(props.challenges);

  const challengeSelections = props.challenges.map(c => (
    <div className="column is-3">
      <ChallengeSelect challenge={c} iconName="stopwatch" bgColor="#ff2457" key={c.id} />
    </div>
  ));
  const challengeDescriptions = props.challenges.map(c => (
    <div className="column is-3 has-text-centered">Description text here.</div>
  ));

  return (
    <div>
      <section className="section has-text-centered">
        <h1 className="title is-2">
          <span style={{ fontFamily: 'Verdana', color: '#ff2457' }}>&#x7b;</span> haasteen nimi{' '}
          <span style={{ fontFamily: 'Verdana', color: '#ff2457' }}>&#x7d;</span>
        </h1>
        <h2 className="title is-3">Valitse sarja</h2>
      </section>
      <section className="columns is-mobile is-centered is-vcentered">
        {challengeSelections}
      </section>
      <section className="columns is-mobile is-centered is-size-6-mobile is-size-5-tablet is-size-4">
        {challengeDescriptions}
      </section>
    </div>
  );
};

export default FrontPage;
