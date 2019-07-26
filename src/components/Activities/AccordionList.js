import React, { useState } from 'react';
import posed, { PoseGroup } from 'react-pose';
import AccordionItem from './AccordionItem';
import ActivityRow from './ActivityRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AccordionList = props => {
  const [opened, setOpened] = useState(false);

  const handleClick = () => {
    setOpened(!opened);
  };
  //<div className="control is-fluid accordion-list__item" key={a.id}>

  const Icon = posed.div({
    up: {
      rotate: '0deg'
    },
    down: {
      rotate: '180deg'
    }
  });

  return (
    <div className="container is-widescreen">
      <div
        className={`columns is-centered is-mobile has-text-white-ter is-size-6-mobile is-size-5-tablet is-size-4-desktop ${
          props.row % 2 ? 'menurow-odd' : 'menurow-even'
        }`}
        style={{ padding: '1vw', margin: '1vw 4vw' }}
        onClick={handleClick}
      >
        <div className="column is-11"> {props.type} </div>

        <Icon className="column is-1" pose={opened ? 'up' : 'down'}>
          <FontAwesomeIcon icon="angle-up" />
        </Icon>
      </div>
      <PoseGroup animateOnMount="true">
        {props.activities.map(
          a =>
            opened && (
              <AccordionItem key={a.id}>
                <ActivityRow activity={a} />
              </AccordionItem>
            )
        )}
      </PoseGroup>
    </div>
  );
};

export default AccordionList;
