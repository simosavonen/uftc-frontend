import React from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';

const CircleProgress = ({ workouts, activities, challenge }) => {
  if (!activities.length) return <div>No activities found.</div>;
  if (!workouts.length) return <div>No workouts found.</div>;
  if (!challenge) return <div>Pick a series first.</div>;

  const monday = moment().isoWeekday(1);
  const sunday = moment().isoWeekday(7);
  const today = moment();
  const values = [0, 0, 0]; // challenge, weekly, daily

  const bonus = challenge.pointBonus;

  for (const workout of workouts) {
    const points = activities.find(act => {
      return act.id === workout.activity;
    }).points;

    for (const instance of workout.instances) {
      const result = instance.amount * points * bonus;
      if (
        monday.isSameOrBefore(instance.date, 'day') &&
        sunday.isSameOrAfter(instance.date, 'day')
      ) {
        values[1] += result;
      }
      if (today.isSame(instance.date, 'day')) {
        values[2] += result;
      }
      values[0] += result;
    }
  }

  // hardcoded 750 and 7500 should come from props.challenge
  const series = [
    Math.floor((100 * values[0]) / 7500),
    Math.floor((100 * values[1]) / 750),
    Math.floor((100 * values[2]) / (750 / 7))
  ];

  const options = {
    plotOptions: {
      radialBar: {
        offsetY: -15,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 0,
          size: '25%',
          background: 'transparent'
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            show: true,
            fontSize: '28px',
            offsetY: 10
          }
        }
      }
    },
    colors: ['#1ab7ea', '#0084ff', '#39539E'],
    labels: ['Challenge', 'Weekly', 'Daily'],
    legend: {
      show: true,
      floating: true,
      fontFamily: 'Raleway',
      fontSize: '20px',
      position: 'left',
      width: 300,
      offsetX: -120,
      offsetY: 17,
      labels: {
        useSeriesColors: true
      },
      markers: {
        width: 0,
        height: 0
      },
      formatter: function(seriesName, opts) {
        return seriesName + ':  ' + Math.round(values[opts.seriesIndex]);
      },
      itemMargin: {
        horizontal: 4
      },
      onItemClick: {
        toggleDataSeries: false
      }
    }
  };

  return (
    <div className="has-text-right" style={{ width: 400, margin: 'auto' }}>
      <Chart options={options} type={'radialBar'} series={series} height="400" />
    </div>
  );
};

export default CircleProgress;
