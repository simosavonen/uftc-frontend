import React, { useState } from 'react';
import posed, { PoseGroup } from 'react-pose';

const MenuBox = posed.div({
  enter: {
    opacity: 1,
    delay: 100
  },
  exit: {
    opacity: 0
  },
  idle: {
    height: '25vw',
    width: '25vw',
    delay: 100
  },
  selected: {
    height: '6.5vw',
    width: '50vw'
  }
});

const MenuContent = posed.div({
  enter: {
    opacity: 1,
    delay: 200
  },
  exit: {
    opacity: 0
  }
});

const menuStyles = {
  border: '1vw solid #ff2457',
  borderRadius: '2vw',
  margin: '1.5vw',
  textAlign: 'center',
  display: 'inline-flex',
  position: 'relative',
  maxWidth: '350px',
  maxHeight: '350px'
};

const menuTitle = {
  margin: 'auto'
};

const menuWrapper = {
  padding: '1vw',
  textAlign: 'center',
  maxWidth: '700px',
  margin: 'auto'
};

const BadgesView = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div style={menuWrapper}>
      <PoseGroup>
        {(selected === 0 || selected === 1) && (
          <MenuBox
            key={1}
            className="menuBox is-clickable is-size-6-mobile is-size-5-tablet is-size-4-desktop is-size-3-widescreen"
            style={menuStyles}
            onClick={() => setSelected(selected ? 0 : 1)}
            pose={selected === 1 ? 'selected' : 'idle'}
          >
            <span style={menuTitle}>Lihaskunto</span>
          </MenuBox>
        )}
        {(selected === 0 || selected === 2) && (
          <MenuBox
            key={2}
            className="menuBox is-clickable is-size-6-mobile is-size-5-tablet is-size-4-desktop is-size-3-widescreen"
            style={menuStyles}
            onClick={() => setSelected(selected ? 0 : 2)}
            pose={selected === 2 ? 'selected' : 'idle'}
          >
            <span style={menuTitle}>Työmatkaliikunta</span>
          </MenuBox>
        )}
        {(selected === 0 || selected === 3) && (
          <MenuBox
            key={3}
            className="menuBox is-clickable is-size-6-mobile is-size-5-tablet is-size-4-desktop is-size-3-widescreen"
            style={menuStyles}
            onClick={() => setSelected(selected ? 0 : 3)}
            pose={selected === 3 ? 'selected' : 'idle'}
          >
            <span style={menuTitle}>Joukkuelajit</span>
          </MenuBox>
        )}
        {(selected === 0 || selected === 4) && (
          <MenuBox
            key={4}
            className="menuBox is-clickable is-size-6-mobile is-size-5-tablet is-size-4-desktop is-size-3-widescreen"
            style={menuStyles}
            onClick={() => setSelected(selected ? 0 : 4)}
            pose={selected === 4 ? 'selected' : 'idle'}
          >
            <span style={menuTitle}>Special Fun Times</span>
          </MenuBox>
        )}
        {selected !== 0 && (
          <MenuContent
            key={5}
            className="is-size-6-mobile is-size-5-tablet is-size-4-desktop is-size-3-widescreen"
          >
            <p>Kahvakuula</p>
            <p>Leuanveto</p>
            <p>Punnerrus</p>
            <p>Burbee</p>
            <p>Naruhyppy</p>
            <p>Vatsalihas</p>
            <p>Kolmoisvoltti</p>
          </MenuContent>
        )}
      </PoseGroup>
    </div>
  );
};

export default BadgesView;
