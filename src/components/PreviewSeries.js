import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

const SeriesRow = ({ challenge }) => {
  return (
    <tr>
      <td className="has-text-centered" title={challenge.icon}>
        <FontAwesomeIcon icon={challenge.icon} size="2x" />
      </td>
      <td>{challenge.seriesTitle}</td>
      <td>{challenge.description}</td>
      <td className="has-text-centered">{challenge.pointBonus}</td>
    </tr>
  );
};

const PreviewSeries = ({ challenges }) => {
  if (!challenges.length) return null;

  return (
    <div className="box">
      <h1 className="title is-4">Summary of the challenge</h1>
      <div className="field is-grouped is-grouped-multiline">
        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-dark">Start date</span>
            <span className="tag is-info">
              {moment(challenges[0].startDate).format('YYYY-MM-DD')}
            </span>
          </div>
        </div>

        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-dark">End date</span>
            <span className="tag is-info">
              {moment(challenges[0].endDate).format('YYYY-MM-DD')}
            </span>
          </div>
        </div>

        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-dark">Release date</span>
            <span className="tag is-info">
              {moment(challenges[0].releaseDate).format('YYYY-MM-DD')}
            </span>
          </div>
        </div>

        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-dark">Deadline</span>
            <span className="tag is-info">
              {moment(challenges[0].deadline).format('YYYY-MM-DD')}
            </span>
          </div>
        </div>

        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-dark">Points goal</span>
            <span className="tag is-warning">{challenges[0].pointsGoal}</span>
          </div>
        </div>

        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-dark">Duration in weeks</span>
            <span className="tag is-danger">
              {Math.ceil(
                moment(challenges[0].endDate).diff(moment(challenges[0].startDate), 'weeks', true)
              )}
            </span>
          </div>
        </div>

        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-dark">Duration in days</span>
            <span className="tag is-danger">
              {moment(challenges[0].endDate).diff(moment(challenges[0].startDate), 'days')}
            </span>
          </div>
        </div>
      </div>

      <table className="table is-fullwidth">
        <thead>
          <tr>
            <td className="has-text-centered">Icon</td>
            <td>Series Title</td>
            <td>Description</td>
            <td title="Point Bonus" className="has-text-centered">
              PB
            </td>
          </tr>
        </thead>
        <tbody>
          {challenges.map(c => (
            <SeriesRow key={c.id} challenge={c} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PreviewSeries;
