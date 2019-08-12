import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import { isMobile } from 'react-device-detect';
import moment from 'moment';

const WorkoutsChart = ({ chartData }) => {
  const today = moment().valueOf();
  const weekAgo = moment()
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
      min: weekAgo,
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
