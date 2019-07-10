import React, { useState } from 'react';
import { PoseGroup } from 'react-pose';
import AccordionItem from './AccordionItem';
import ActivityRow from './ActivityRow';

const AccordionList = props => {
  const [opened, setOpened] = useState(false);

  const handleClick = () => {
    setOpened(!opened);
  };
  //<div className="control is-fluid accordion-list__item" key={a.id}>

  return (
    <div className="container">
      <div
        className={`has-text-white-ter is-size-6-mobile is-size-5-tablet is-size-4-desktop ${
          props.row % 2 ? 'menurow-odd' : 'menurow-even'
        }`}
        style={{ padding: '1vw', margin: '1vw 4vw' }}
        onClick={handleClick}
      >
        {props.type}
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
