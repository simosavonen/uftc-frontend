import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ConfirmButton = ({ classNames = '', icon, texts, action }) => {
  const [clicks, setClicks] = useState(0);

  const handleClick = event => {
    event.preventDefault();
    event.stopPropagation();
    if (clicks + 1 >= texts.length) {
      action();
    } else {
      setClicks(clicks + 1);
    }
  };

  const reset = event => {
    event.preventDefault();
    setClicks(0);
  };

  return (
    <button className={`button ${classNames}`} onClick={handleClick} onBlur={reset}>
      <span className="icon">
        <FontAwesomeIcon icon={icon} />
      </span>
      <span>{texts[clicks]}</span>
    </button>
  );
};

export default ConfirmButton;
