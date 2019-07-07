import React, { useState, useEffect } from 'react';
import axios from 'axios';
import posed, { PoseGroup } from 'react-pose';
import ApexChart from './ApexChart';

const UserScores = posed.div({
  enter: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -300
  }
});

const ScoresTable = posed.div();

const ScoresView = props => {
  const [scores, setScores] = useState([]);
  const [showUser, setShowUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/scores/')
      .then(result => {
        setScores(result.data);
      })
      .catch(error => console.log('scores', error.message));
  }, []);

  useEffect(() => {
    if (props.token) {
      axios.defaults.headers.common['Authorization'] = props.token;
      axios
        .get('http://localhost:3001/api/workouts/all')
        .then(result => {
          setWorkouts(result.data);
        })
        .catch(error => console.log('workouts', error.message));
    }
  }, [props.token]);

  useEffect(() => {
    if (showUser) {
      const filtered = workouts
        .filter(w => w.user === showUser.id)
        .map(i => {
          return {
            name: i.activity.name,
            data: i.instances.map(x => {
              return { x: x.date, y: x.amount };
            })
          };
        });
      console.log('filtered', filtered);
      setChartData(filtered);
    }
  }, [showUser, workouts]);

  const total = scores.reduce((sum, item) => sum + item.totalPoints, 0);

  return (
    <PoseGroup>
      {showUser && (
        <UserScores key="userscores" className="section container">
          <div className="columns is-centered">
            <div className="column is-5">
              <h4 className="title is-size-5-mobile is-size-4">{showUser.name}</h4>
              <h5 className="subtitle is-size-6-mobile is-size-5">
                points received from activities
              </h5>
              <table className="table is-fullwidth is-narrow is-striped is-size-6-widescreen is-size-5-fullhd">
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th className="has-text-centered">Amount</th>
                    <th className="has-text-centered">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts
                    .filter(w => w.user === showUser.id)
                    .map(w => (
                      <tr key={w.id}>
                        <td>{w.activity.name}</td>
                        <td className="has-text-centered">{w.totalAmount}</td>
                        <td className="has-text-centered">{w.totalPoints}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <button onClick={() => setShowUser(null)} className="button is-outlined is-info">
                hide
              </button>
            </div>
            <div className="column is-7 is-hidden-mobile">
              <ApexChart chartData={chartData} />
            </div>
          </div>
        </UserScores>
      )}
      <ScoresTable key="scorestable" className="section container">
        <h4 className="title is-size-6-mobile is-size-4">
          {scores.length && scores[0].challenge.name} leaderboard
        </h4>
        <table className="table is-fullwidth is-hoverable is-size-5-widescreen is-size-4-fullhd">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Series</th>
              <th className="has-text-primary has-text-centered">Points</th>
              <th className="is-hidden-mobile">Progress</th>
              <th className="is-hidden-mobile">Goal</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Series</th>
              <th className="has-text-primary has-text-centered">Points</th>
              <th className="is-hidden-mobile">Progress</th>
              <th className="is-hidden-mobile">Goal</th>
            </tr>
          </tfoot>
          <tbody>
            {scores
              .sort((a, b) => {
                return b.totalPoints - a.totalPoints;
              })
              .map((score, index) => (
                <tr key={score.id} onClick={() => setShowUser(score.user)} className="is-clickable">
                  <td>{index + 1}</td>
                  <td>{score.user.name}</td>
                  <td>{score.challenge.seriesTitle}</td>
                  <td className="has-text-primary has-text-centered">{score.totalPoints}</td>
                  <td className="is-hidden-mobile" style={{ verticalAlign: 'middle' }}>
                    <progress
                      className="progress is-info"
                      value={score.totalPoints}
                      max={score.challenge.pointsGoal}
                    />
                  </td>
                  <td className="is-hidden-mobile">{score.challenge.pointsGoal}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div key="total" className="is-size-5-widescreen is-size-4-fullhd">
          <p>Total points: {total}</p>
          <p>Average: {total / scores.length}</p>
        </div>
      </ScoresTable>
    </PoseGroup>
  );
};

export default ScoresView;
