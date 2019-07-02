import React from 'react';
import Challenge from './Challenge';

const ChallengeList = props => {
  return (
    <section className="section columns is-centered">
      <div className="column is-6">
        {props.challenges.map(item => (
          <Challenge challenge={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};
export default ChallengeList;
