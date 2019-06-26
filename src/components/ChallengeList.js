import React from 'react';
import Challenge from './Challenge';

const ChallengeList = props => {
  return (
    <>
      {props.challenges.map(item => (
        <Challenge challenge={item} />
      ))}
    </>
  );
};
export default ChallengeList;
