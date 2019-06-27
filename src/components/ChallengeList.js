import React from 'react';
import Challenge from './Challenge';

const ChallengeList = props => {
  return (
    <>
      {props.challenges.map(item => (
        <Challenge challenge={item} key={item.id} />
      ))}
    </>
  );
};
export default ChallengeList;
