import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScoresView = () => {
  const [scores, setScores] = useState([]);
  const [showUser, setShowUser] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/scores/')
      .then(result => {
        setScores(result.data);
      })
      .catch(error => console.log('scores', error.message));
  }, []);

  return (
    <>
      {showUser && (
        <div className="section container">
          {showUser}
          <button onClick={() => setShowUser(null)} className="button is-outlined is-info">
            hide
          </button>
        </div>
      )}
      <div className="section container">
        <h4 className="title is-4">{scores.length && scores[0].challenge.name} leaderboard</h4>
        <table className="table is-fullwidth is-hoverable is-size-5-widescreen is-size-4-fullhd">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Series</th>
              <th>Points</th>
              <th className="is-hidden-mobile">Progress</th>
              <th className="is-hidden-mobile">Goal</th>
            </tr>
          </thead>
          <tbody>
            {scores
              .sort((a, b) => {
                return b.totalPoints - a.totalPoints;
              })
              .map((score, index) => (
                <tr key={score.id} onClick={() => setShowUser(score.user.id)}>
                  <td>{index + 1}</td>
                  <td>{score.user.name}</td>
                  <td>{score.challenge.seriesTitle}</td>
                  <td>{score.totalPoints}</td>
                  <td className="is-hidden-mobile">
                    <progress
                      className="progress is-primary"
                      value={score.totalPoints}
                      max={score.challenge.pointsGoal}
                    />
                  </td>
                  <td className="is-hidden-mobile">{score.challenge.pointsGoal}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ScoresView;
