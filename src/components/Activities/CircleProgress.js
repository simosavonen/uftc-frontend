import React from 'react';
import Chart from 'react-apexcharts';

const CircleProgress = ({ workouts, activities, challenge }) => {
  const options = {
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        dataLabels: {
          name: {
            fontSize: '22px',
            offsetY: -25
          },
          value: {
            fontSize: '16px',
            offsetY: -15
          }
        }
      }
    },
    labels: ['Challenge', 'Weekly', 'Daily']
  };

  const series = [15, 66, 85];
  return (
    <div>
      <Chart options={options} height={350} type={'radialBar'} series={series} />
      <p>Challenge 300 / 7500</p>
      <p>Weekly 620 / 750</p>
      <p>Daily 72 / 110</p>
    </div>
  );
};

export default CircleProgress;
