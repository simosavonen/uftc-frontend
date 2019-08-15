import React, { useState } from 'react';
import posed, { PoseGroup } from 'react-pose';
import AccordionItem from './AccordionItem';
//import ActivityRow from './ActivityRow';
import ActivityDetails from './ActivityDetails';
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
    <>
      <div
        className={'columns button is-large is-centered is-mobile is-clickable hover-effect-grey'}
        style={{ marginTop: '1em', marginBottom: '1em' }}
        onClick={handleClick}
      >
        <p className="column is-8 is-size-4 has-text-weight-semibold is-5-mobile is-4">
          {props.type}
        </p>

        <Icon className="column is-2" pose={opened ? 'up' : 'down'}>
          <FontAwesomeIcon icon="angle-up" />
        </Icon>
      </div>
      <PoseGroup>
        {props.activities.map(
          a =>
            opened && (
              <AccordionItem key={a.id}>
                <ActivityDetails activity={a} challenge={props.challenge} />
              </AccordionItem>
            )
        )}
      </PoseGroup>
    </>
  );
};

export default AccordionList;
