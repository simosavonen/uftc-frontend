import React from 'react';
import { VictoryLine, VictoryScatter, VictoryChart } from 'victory';

const sampleData = [
  [
    { date: '2019-06-01', amount: 5 },
    { date: '2019-07-05', amount: 2 },
    { date: '2019-07-09', amount: 11 },
    { date: '2019-08-17', amount: 21 },
    { date: '2019-08-25', amount: 7 }
  ],
  [
    { date: '2019-06-06', amount: 1 },
    { date: '2019-06-24', amount: 11 },
    { date: '2019-07-22', amount: 34 },
    { date: '2019-07-28', amount: 22 },
    { date: '2019-08-15', amount: 12 },
    { date: '2019-08-22', amount: 42 }
  ]
];

const Chart = ({ chartData = sampleData }) => {
  return (
    <VictoryChart scale={{ x: 'linear' }} domain={{ x: ['2019-06-01', '2019-08-30'] }}>
      {chartData.map((cd, index) => (
        <VictoryLine
          key={index}
          interpolation="monotoneX"
          data={cd.map(d => ({ date: d.date, amount: d.amount }))}
          x="date"
          y="amount"
          animate={{
            animationWhitelist: ['style', 'data', 'size'], // Try removing "size"
            onExit: {
              duration: 500,
              before: () => ({ opacity: 0.3, _y: 0 })
            },
            onEnter: {
              duration: 500,
              before: () => ({ opacity: 0.3, _y: 0 }),
              after: datum => ({ opacity: 1, _y: datum._y })
            }
          }}
        />
      ))}

      {chartData.map((cd, index) => (
        <VictoryScatter
          key={index + 1000}
          data={cd.map(d => ({ date: d.date, amount: d.amount }))}
          x="date"
          y="amount"
        />
      ))}
    </VictoryChart>
  );
};

export default Chart;
