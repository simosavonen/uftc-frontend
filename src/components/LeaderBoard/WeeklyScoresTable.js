import React, { useState, useEffect } from 'react';
import WorkoutsChart from './WorkoutsChart';
import WorkoutsTable from './WorkoutsTable';
import workoutService from '../../services/workouts';
import { locations } from '../../config/config';

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
  seriesFilters,
  user
}) => {
  const [showUser, setShowUser] = useState('');
  const [pointBonus, setPointBonus] = useState(1);
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

      usersWorkouts = usersWorkouts
        .filter(w => w.instances.length > 0)
        .map(i => {
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

  const toggleShowUser = (id, pointBonus) => {
    setChartData([]);
    showUser === id ? setShowUser('') : setShowUser(id);
    setPointBonus(pointBonus);
  };

  return (
    <table className="table is-fullwidth is-narrow is-size-7-mobile is-size-7-tablet is-size-6-widescreen is-size-5-fullhd">
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
          <th className="has-text-centered">Badges</th>
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
          <th className="has-text-centered">Badges</th>
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
                onClick={() => toggleShowUser(score.id.toString(), score.pointBonus)}
                className={`${score.id === user.id &&
                  'has-text-weight-bold'} is-clickable hover-effect-green ${score.id.toString() ===
                  showUser && 'is-selected has-text-dark'}`}
              >
                <td>{index + 1}</td>
                <td className={score.id === user.id ? 'has-text-danger' : ''}>{score.name}</td>
                <td>{score.seriesTitle}</td>
                <td
                  style={{
                    borderLeftStyle: 'solid',
                    borderLeftWidth: 10,
                    borderLeftColor: locations[score.location]
                  }}
                >
                  {score.location}
                </td>
                {score.data.map((week, idx) => (
                  <td key={idx} className="has-text-centered is-hidden-mobile">
                    {week}
                  </td>
                ))}
                <td className="has-text-centered">{score.pointsFromAchievements}</td>
                <td className="has-text-centered">
                  {score.pointsFromAchievements +
                    Math.round(score.data.reduce((sum, i) => sum + i, 0) * 10) / 10}
                </td>
              </tr>
              {score.id.toString() === showUser && (
                <tr>
                  <td colSpan={5 + score.data.length} style={{ padding: '2vw' }}>
                    <div className="columns is-centered">
                      <div className="column is-4">
                        <WorkoutsTable
                          workouts={workouts}
                          showUser={showUser}
                          pointBonus={pointBonus}
                        />
                      </div>
                      <div className="column is-8 is-paddingless">
                        {chartData.length !== 0 ? (
                          <WorkoutsChart chartData={chartData} />
                        ) : (
                          'Loading chart data...'
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        {weeklyData.length === 0 && (
          <tr>
            <td colSpan={5}>Loading data...</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default WeeklyScoresTable;
