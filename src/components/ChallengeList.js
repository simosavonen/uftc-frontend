import React from 'react';
import Challenge from './Challenge';

const ChallengeList = props => {
  return (
    <>
      {props.challenges.map(item => (
        <Challenge challenge={item} activities={props.activities} />
      ))}
    </>
  );
};
export default ChallengeList;
