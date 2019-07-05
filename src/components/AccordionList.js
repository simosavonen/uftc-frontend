import React, { useState } from 'react';
import AccordionItem from './AccordionItem';

const AccordionList = props => {
  const [opened, setOpened] = useState(false);

  const handleClick = () => {
    setOpened(!opened);
  };
  //<div className="control is-fluid accordion-list__item" key={a.id}>

  return (
    <div className="container is-fluid">
      <button className="button is-info" onClick={handleClick}>
        {props.type}
      </button>

      {props.activities.map(a => (
        <AccordionItem pose={opened ? 'open' : 'closed'} key={a.id}>
          <div>{a.name}</div>
        </AccordionItem>
      ))}
    </div>
  );
};

export default AccordionList;
