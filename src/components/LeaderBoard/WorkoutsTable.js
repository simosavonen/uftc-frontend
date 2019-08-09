import React from 'react';

const WorkoutsTable = ({ workouts, showUser, pointBonus }) => {
  return (
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
            const totalAmount = w.instances.reduce((sum, i) => sum + i.amount, 0);
            const points = w.activity.points;
            return (
              <tr key={w.id}>
                <td>{w.activity.name}</td>
                <td className="has-text-centered">{totalAmount}</td>
                <td className="has-text-centered">
                  {Math.round(totalAmount * points * pointBonus * 10) / 10}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default WorkoutsTable;
