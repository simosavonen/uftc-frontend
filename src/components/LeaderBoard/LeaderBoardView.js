import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import WorkoutChart from './WorkoutChart';
import WeeklyScores from './WeeklyScores';
import workoutService from '../../services/workouts';
import scoreService from '../../services/scores';

// ugh, hardcoded
const locations = ['Hämeenlinna', 'Helsinki', 'Joensuu', 'Tampere', 'Turku', 'Tallinn', 'Tartu'];
const series = ['Defaults', 'Pros'];

const LeaderBoardView = props => {
  const [showUser, setShowUser] = useState('');
  const [workouts, setWorkouts] = useState([]);

  const [weeklyData, setWeeklyData] = useState([]);
  const [chartData, setChartData] = useState([]); // filtered weeklyData for showing in the chart
  const [weekFilter, setWeekFilter] = useState(0);

  const [showFilterButtons, setShowFilterButtons] = useState(false);
  const [locationFilters, setLocationFilters] = useState(locations);
  const [seriesFilters, setSeriesFilters] = useState(series);

  useEffect(() => {
    scoreService
      .getWeekly()
      .then(result => {
        setWeeklyData(result.data);
      })
      .catch(error => console.log('weeklyData', error.message));
  }, []);

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

  const compareBySums = (a, b) => {
    const aSum = a.data.reduce((sum, i) => sum + i, 0);
    const bSum = b.data.reduce((sum, i) => sum + i, 0);
    if (aSum > bSum) return -1;
    if (aSum < bSum) return 1;
    return 0;
  };

  const toggleShowUser = id => {
    showUser === id ? setShowUser('') : setShowUser(id);
  };

  const toggleSeries = series => {
    if (seriesFilters.includes(series)) {
      setSeriesFilters(seriesFilters.filter(s => s !== series));
    } else {
      setSeriesFilters(seriesFilters.concat(series));
    }
  };

  const toggleLocations = location => {
    if (locationFilters.includes(location)) {
      setLocationFilters(locationFilters.filter(l => l !== location));
    } else {
      setLocationFilters(locationFilters.concat(location));
    }
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-size-5-mobile is-size-4-tablet is-size-3-widescreen">
          {weekFilter === 0 ? 'Total scores' : `Scores for week #${weekFilter}`}

          <button
            className="button is-outlined is-small is-pulled-right"
            onClick={() => setShowFilterButtons(!showFilterButtons)}
          >
            <span className="icon">
              <FontAwesomeIcon icon="filter" />
            </span>
            <span>{showFilterButtons ? 'hide filters' : 'show filters'}</span>
          </button>
        </h1>
        {showFilterButtons && (
          <div className="notification is-clearfix">
            <div className="buttons is-pulled-left">
              {series.map(ser => (
                <button
                  key={ser}
                  className={`button is-small ${seriesFilters.includes(ser) && 'is-info'}`}
                  onClick={() => toggleSeries(ser)}
                >
                  {ser}
                </button>
              ))}
            </div>
            <div className="buttons is-pulled-right">
              {locations.map(loc => (
                <button
                  key={loc}
                  className={`button is-small ${locationFilters.includes(loc) && 'is-warning'}`}
                  onClick={() => toggleLocations(loc)}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        )}
        <WeeklyScores
          weekFilter={weekFilter}
          weeklyData={weeklyData
            .filter(l => locationFilters.includes(l.location))
            .filter(s => seriesFilters.includes(s.seriesTitle))}
        />
      </div>
      <div className="container buttons is-hidden-tablet">
        {weeklyData.length !== 0 &&
          weeklyData[0].data.map((row, idx) => (
            <button
              className={`button is-small ${weekFilter === idx + 1 && 'is-info'}`}
              key={idx}
              onClick={() => setWeekFilter(idx + 1)}
            >
              W{idx + 1}
            </button>
          ))}
        <button
          className={`button is-small ${weekFilter === 0 && 'is-info'}`}
          onClick={() => setWeekFilter(0)}
        >
          Total
        </button>
      </div>
      <div className="container">
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
                    className={`is-clickable hover-effect-green ${score.id.toString() ===
                      showUser && 'is-selected has-text-dark'}`}
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
                    <td className="has-text-centered">
                      {score.data.reduce((sum, i) => sum + i, 0)}
                    </td>
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
                                    const points = props.activities.find(a => {
                                      return a.id === w.activity.id;
                                    }).points;
                                    return (
                                      <tr key={w.id}>
                                        <td>{w.activity.name}</td>
                                        <td className="has-text-centered">{totalAmount}</td>
                                        <td className="has-text-centered">
                                          {totalAmount * points}
                                        </td>
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
      </div>
    </section>
  );
};

export default LeaderBoardView;
