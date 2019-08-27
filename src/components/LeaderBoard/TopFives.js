import React, { useState, useEffect } from 'react';
import scoreService from '../../services/scores';
import { locations } from '../../config/config';
import { customIcon } from '../../utils/icons';

const TopFives = ({ activities }) => {
  const [totals, setTotals] = useState([]);

  useEffect(() => {
    scoreService
      .getByActivity()
      .then(result => {
        setTotals(result.data);
      })
      .catch(error => console.log('total amounts', error.message));
  }, []);

  if (activities.length === 0) return <div className="section">Loading activities...</div>;

  return (
    <section className="section">
      <div className="container" style={{ marginBottom: '2em' }}>
        <h1 className="title is-4">Top 5 by activity</h1>
        <h2 className="subtitle is-6">sorted by total amount of workouts</h2>
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
              <table className="table is-fullwidth is-striped is-size-6">
                <tbody>
                  {totals[t]
                    .sort((a, b) => {
                      return b.total - a.total;
                    })
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
      </div>
    </section>
  );
};

export default TopFives;
