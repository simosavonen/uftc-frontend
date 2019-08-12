import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import { isMobile } from 'react-device-detect';
import moment from 'moment';

const sampleData = [
  {
    name: 'Kahvakuulanosto',
    data: [{ x: '2019-06-01', y: 21 }, { x: '2019-07-02', y: 11 }, { x: '2019-08-01', y: 31 }]
  },
  {
    name: 'Uinti',
    data: [{ x: '2019-07-03', y: 2 }, { x: '2019-08-04', y: 12 }, { x: '2019-09-05', y: 22 }]
  },
  {
    name: 'Kävelykokous',
    data: [{ x: '2019-08-12', y: 34 }, { x: '2019-08-22', y: 24 }, { x: '2019-09-02', y: 14 }]
  },
  {
    name: 'Työmatkapyöräily',
    data: [{ x: '2019-08-17', y: 42 }, { x: '2019-08-27', y: 40 }, { x: '2019-09-07', y: 45 }]
  },
  {
    name: 'Burbee',
    data: [{ x: '2019-06-3', y: 45 }, { x: '2019-06-26', y: 22 }, { x: '2019-08-01', y: 2 }]
  },
  {
    name: 'Lankutus',
    data: [{ x: '2019-07-025', y: 43 }, { x: '2019-08-14', y: 20 }, { x: '2019-9-10', y: 55 }]
  }
];

const WorkoutsChart = ({ chartData = sampleData }) => {
  const today = moment().valueOf();
  const twoWeeksAgo = moment()
    .subtract(7, 'days')
    .valueOf();
  // fixes an issue with a series remaining toggled off
  // when we hide or unhide the div containing the chart
  useEffect(() => {
    ApexCharts.exec('activities-chart', 'resetSeries');
  }, [chartData]);

  const options = {
    chart: {
      id: 'activities-chart',
      type: 'line'
    },
    xaxis: {
      type: 'datetime',
      min: twoWeeksAgo,
      max: today
    },
    stroke: {
      curve: 'smooth',
      width: 4
    },
    markers: {
      size: 5
    },
    colors: [
      '#ff2457',
      '#57ff24',
      '#248aff',
      '#ffe524',
      '#ff4124',
      '#ff24c5',
      '#24ff99',
      '#c5ff24',
      '#ff7824'
    ],
    grid: {
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      }
    },
    noData: {
      text: 'Unable to find any data.',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: '#ff2457',
        fontSize: '14px',
        fontFamily: 'Raleway'
      }
    }
  };

  if (isMobile) {
    options.stroke = { curve: 'smooth', width: 2 };
    options.markers = { size: 3 };
  }

  return <Chart height={isMobile ? 300 : 'auto'} options={options} series={chartData} />;
};

export default WorkoutsChart;
