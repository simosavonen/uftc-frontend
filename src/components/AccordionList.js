import React, { useState } from 'react';
import AccordionItem from './AccordionItem';

const AccordionList = props => {
  const [opened, setClosed] = useState(false);

  const handleClick = () => {
    setClosed(!opened);
  };

  return (
    <div>
      <button className="accordion-section" onClick={handleClick}>
        {props.type}
      </button>
      <ul className="accordion-list">
        {opened &&
          props.activities.map(a => {
            return (
              <li className="accordion-list__item" key={a.id}>
                <AccordionItem {...a} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default AccordionList;
