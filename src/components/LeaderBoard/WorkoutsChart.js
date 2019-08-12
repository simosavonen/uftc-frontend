import React from 'react';
import Chart from 'react-apexcharts';
import { isMobile } from 'react-device-detect';

const options = {
  chart: {
    id: 'activities-chart',
    type: 'line'
  },
  xaxis: {
    type: 'datetime'
  },
  stroke: {
    curve: 'smooth',
    width: isMobile ? 2 : 4
  },
  markers: {
    size: isMobile ? 3 : 5
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

const WorkoutsChart = ({ chartData }) => {
  return <Chart height={isMobile ? 300 : 'auto'} options={options} series={chartData} />;
};

export default WorkoutsChart;
