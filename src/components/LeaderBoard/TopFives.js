import React, { useState, useEffect } from 'react';
import scoreService from '../../services/scores';
import { customIcon } from '../../utils/icons';
import { toast } from 'react-toastify';
import { locations } from '../../config/config';

const TopFives = ({ activities, challenges }) => {
  const [totals, setTotals] = useState([]);
  const [series, setSeries] = useState([]);
  const [seriesFilters, setSeriesFilters] = useState([]);

  useEffect(() => {
    scoreService
      .getByActivity()
      .then(result => {
        setTotals(result.data);
      })
      .catch(error => toast.warn('Failed to load the top 5 scores.'));
  }, []);

  useEffect(() => {
    const titles = [];
    for (let c of challenges) {
      titles.push(c.seriesTitle);
    }
    setSeriesFilters(titles);
    setSeries(titles);
  }, [challenges]);

  const toggleSeries = ser => {
    if (seriesFilters.includes(ser)) {
      setSeriesFilters(seriesFilters.filter(s => s !== ser));
    } else {
      setSeriesFilters(seriesFilters.concat(ser));
    }
  };

  if (activities.length === 0 || challenges.length === 0)
    return <div className="section">Loading...</div>;

  return (
    <section className="section">
      <div className="container" style={{ marginBottom: '2em' }}>
        <div className="columns is-mobile">
          <div className="column">
            <h1 className="title is-4">Top 5 by activity</h1>
          </div>
          <div className="column buttons has-text-right">
            <h1 className="title is-6 is-marginless" style={{ paddingBottom: '0.2em' }}>
              Filter by series
            </h1>
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
        </div>
      </div>
      <div className="container topfivecards">
        {Object.keys(totals).map(t => (
          <div key={t} className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="icon is-medium">
                    {customIcon(activities.find(a => a.id === t).icon, '#000000', 'lg')}
                  </figure>
                </div>
                <div className="media-content" style={{ marginBottom: '0.5em' }}>
                  <p className="is-size-4">{activities.find(a => a.id === t).name}</p>
                </div>
              </div>
              <table className="table is-fullwidth is-striped is-narrow is-size-6">
                <tbody>
                  {totals[t]
                    .sort((a, b) => {
                      return b.total - a.total;
                    })
                    .filter(user => seriesFilters.includes(user.series))
                    .slice(0, 5)
                    .map(row => (
                      <tr key={row.name}>
                        <td>{row.name}</td>
                        <td title={row.location}>
                          {customIcon('globe', locations[row.location], '1x')}
                        </td>
                        <td className="has-text-centered" title="total amount">
                          {row.total}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <div key="colorcodes" className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="icon is-medium">
                  {customIcon('map-marker-alt', '#000000', 'lg')}
                </figure>
              </div>
              <div className="media-content" style={{ marginBottom: '0.5em' }}>
                <p className="is-size-4">Locations</p>
              </div>
            </div>

            <ul>
              {Object.keys(locations).map(row => (
                <li key={row}>
                  <span className="icon is-small" style={{ margin: '0 0.5em' }}>
                    {customIcon('globe', locations[row], 'sm')}
                  </span>
                  {row}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopFives;
