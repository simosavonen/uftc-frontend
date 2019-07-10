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

const FrontPage = props => {
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
        <div className="column is-3">
          <Ikonipallo sarja="Defaults" osallistujia={37} iconName="couch" bgColor="#ff2457" />
        </div>
        <div className="column is-3">
          <Ikonipallo
            sarja="Latecomers"
            osallistujia={0}
            iconName="stopwatch"
            bgColor="#ff245750"
          />
        </div>
        <div className="column is-3">
          <Ikonipallo sarja="Pros" osallistujia={9} iconName="swimmer" bgColor="#ff2457" />
        </div>
      </section>

      <section className="columns is-mobile is-centered is-size-6-mobile is-size-5-tablet is-size-4">
        <div className="column is-3 has-text-centered">For standard humans.</div>
        <div className="column is-3 has-text-centered">Not yet started!</div>
        <div className="column is-3 has-text-centered">Earn 20% less points.</div>
      </section>
    </div>
  );
};

export default FrontPage;
