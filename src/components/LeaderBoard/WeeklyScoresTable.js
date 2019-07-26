import React, { useState, useEffect } from 'react';
import WorkoutChart from './WorkoutChart';
import workoutService from '../../services/workouts';

const compareBySums = (a, b) => {
  const aSum = a.data.reduce((sum, i) => sum + i, 0);
  const bSum = b.data.reduce((sum, i) => sum + i, 0);
  if (aSum > bSum) return -1;
  if (aSum < bSum) return 1;
  return 0;
};

const WeeklyScoresTable = ({
  weeklyData,
  weekFilter,
  setWeekFilter,
  locationFilters,
  seriesFilters
}) => {
  const [showUser, setShowUser] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [chartData, setChartData] = useState([]); // filtered weeklyData for showing in the chart

  useEffect(() => {
    if (showUser) {
      let usersWorkouts = workouts.filter(w => w.user.toString() === showUser);

      if (usersWorkouts.length === 0) {
        workoutService.getWorkoutsByUser(showUser).then(result => {
          setWorkouts(workouts.concat(result.data));
        });
        usersWorkouts = workouts.filter(w => w.user.toString() === showUser);
      }

      usersWorkouts = usersWorkouts.map(i => {
        return {
          name: i.activity.name,
          data: i.instances
            .sort((a, b) => {
              return new Date(b.date) - new Date(a.date);
            })
            .map(x => {
              return { x: x.date, y: x.amount };
            })
        };
      });
      setChartData(usersWorkouts);
    }
  }, [showUser, workouts]);

  const toggleShowUser = id => {
    showUser === id ? setShowUser('') : setShowUser(id);
  };

  return (
    <table className="table is-fullwidth is-narrow is-size-7-mobile is-size-6-tablet is-size-5-widescreen is-size-4-fullhd">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Series</th>
          <th>Location</th>
          {weeklyData.length !== 0 &&
            weeklyData[0].data.map((row, idx) => (
              <th
                key={idx}
                className={`is-clickable has-text-centered is-hidden-mobile hover-effect-green ${weekFilter ===
                  idx + 1 && 'is-selected has-text-dark'}`}
                onClick={() => setWeekFilter(idx + 1)}
              >
                W{idx + 1}
              </th>
            ))}
          <th
            className={`is-clickable has-text-centered hover-effect-green ${weekFilter === 0 &&
              'is-selected has-text-dark'}`}
            onClick={() => setWeekFilter(0)}
          >
            Total
          </th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Series</th>
          <th>Location</th>
          {weeklyData.length !== 0 &&
            weeklyData[0].data.map((row, idx) => (
              <th
                key={idx}
                className={`is-clickable has-text-centered is-hidden-mobile hover-effect-green ${weekFilter ===
                  idx + 1 && 'is-selected has-text-dark'}`}
                onClick={() => setWeekFilter(idx + 1)}
              >
                W{idx + 1}
              </th>
            ))}
          <th
            className={`is-clickable has-text-centered hover-effect-green ${weekFilter === 0 &&
              'is-selected has-text-dark'}`}
            onClick={() => setWeekFilter(0)}
          >
            Total
          </th>
        </tr>
      </tfoot>
      <tbody>
        {weeklyData
          .sort(compareBySums)
          .filter(l => locationFilters.includes(l.location))
          .filter(s => seriesFilters.includes(s.seriesTitle))
          .map((score, index) => (
            <React.Fragment key={score.id.toString()}>
              <tr
                onClick={() => toggleShowUser(score.id.toString())}
                className={`is-clickable hover-effect-green ${score.id.toString() === showUser &&
                  'is-selected has-text-dark'}`}
              >
                <td>{index + 1}</td>
                <td>{score.name}</td>
                <td>{score.seriesTitle}</td>
                <td>{score.location}</td>
                {score.data.map((week, idx) => (
                  <td key={idx} className="has-text-centered is-hidden-mobile">
                    {week}
                  </td>
                ))}
                <td className="has-text-centered">{score.data.reduce((sum, i) => sum + i, 0)}</td>
              </tr>
              {score.id.toString() === showUser && (
                <tr>
                  <td colSpan={5 + score.data.length} style={{ padding: '2vw' }}>
                    <div className="columns is-centered">
                      <div className="column is-4">
                        <table className="table is-fullwidth is-narrow is-size-7-mobile is-size-6-tablet is-size-5-widescreen is-size-4-fullhd">
                          <thead>
                            <tr>
                              <th>Activity</th>
                              <th className="has-text-centered">Amount</th>
                              <th className="has-text-centered">Points</th>
                            </tr>
                          </thead>
                          <tbody>
                            {workouts
                              .filter(w => w.user.toString() === showUser)
                              .map(w => {
                                const totalAmount = w.instances.reduce(
                                  (sum, i) => sum + i.amount,
                                  0
                                );
                                const points = w.activity.points;
                                return (
                                  <tr key={w.id}>
                                    <td>{w.activity.name}</td>
                                    <td className="has-text-centered">{totalAmount}</td>
                                    <td className="has-text-centered">{totalAmount * points}</td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                      <div className="column is-8 is-paddingless">
                        <WorkoutChart chartData={chartData} />
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
      </tbody>
    </table>
  );
};

export default WeeklyScoresTable;
