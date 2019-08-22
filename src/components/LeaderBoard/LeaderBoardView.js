import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import WeeklyScoresChart from './WeeklyScoresChart';
import WeeklyScoresTable from './WeeklyScoresTable';

import scoreService from '../../services/scores';
import { locations } from '../../config/config';

const LeaderBoardView = ({ challenges, user }) => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [weekFilter, setWeekFilter] = useState(0);

  const [showFilterButtons, setShowFilterButtons] = useState(false);
  const [locationFilters, setLocationFilters] = useState(Object.keys(locations));
  const [seriesFilters, setSeriesFilters] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    scoreService
      .getWeekly()
      .then(result => {
        setWeeklyData(result.data);
      })
      .catch(error => console.log('weeklyData', error.message));
  }, []);

  useEffect(() => {
    const seriesArray = challenges.map(c => c.seriesTitle);
    if (seriesArray.length) {
      setSeriesFilters(seriesArray);
      setSeries(seriesArray);
    }
  }, [challenges]);

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

  if (!challenges.length) {
    return (
      <div className="section container">
        <h1 className="title">No challenge found, please add one.</h1>
      </div>
    );
  }

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
              {Object.keys(locations).map((loc, idx) => (
                <button
                  key={loc}
                  style={{
                    backgroundColor: locationFilters.includes(loc) ? locations[loc] : '#ffffff',
                    color: locationFilters.includes(loc) ? '#ffffff' : '#000000'
                  }}
                  className="button is-small"
                  onClick={() => toggleLocations(loc)}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        )}

        <WeeklyScoresChart
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
        <WeeklyScoresTable
          weeklyData={weeklyData}
          weekFilter={weekFilter}
          setWeekFilter={setWeekFilter}
          locationFilters={locationFilters}
          seriesFilters={seriesFilters}
          user={user}
        />
      </div>
    </section>
  );
};

export default LeaderBoardView;
