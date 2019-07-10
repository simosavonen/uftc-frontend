import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Ikonipallo = ({ sarja, osallistujia, iconName, bgColor }) => {
  const styles = {
    backgroundColor: bgColor,
    width: '16vw',
    height: '16vw',
    borderRadius: '8vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    fontSize: '2vw'
  };

  return (
    <div
      style={styles}
      className="has-text-centered has-text-white-ter"
      onClick={() => console.log('klikkasit', sarja)}
    >
      <FontAwesomeIcon icon={iconName} size="2x" />
      <p>{sarja}</p>
      <p style={{ fontSize: '2.5vw', color: '#000000', fontWeight: 'bold' }}>{osallistujia}</p>
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
          <Ikonipallo sarja="Professionals" osallistujia={9} iconName="swimmer" bgColor="#ff2457" />
        </div>
      </section>

      <section className="columns is-mobile is-centered" style={{ fontSize: '2vw' }}>
        <div className="column is-3 has-text-centered" />
        <div className="column is-3 has-text-centered">Not yet started!</div>
        <div className="column is-3 has-text-centered">Earn 20% less points</div>
      </section>
    </div>
  );
};

export default FrontPage;
