import React from 'react';
import Challenge from './Challenge';

const ChallengeList = props => {
  return (
    <div>
      {props.challenges.map(item => (
        <Challenge challenge={item} />
      ))}
    </div>
  );
};
export default ChallengeList;
