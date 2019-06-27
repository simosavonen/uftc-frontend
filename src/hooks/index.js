import { useState } from 'react';

export const useField = type => {
  const [value, setValue] = useState(type === 'number' ? 0 : '');

  const onChange = event => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue(type === 'number' ? 0 : '');
  };

  return [
    {
      type,
      value,
      onChange
    },
    reset
  ];
};
