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
    <div className="container is-fluid">
      <button className="button title is-4 is-marginless is-info" onClick={handleClick}>
        {props.type}
      </button>
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
