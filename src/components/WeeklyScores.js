import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import faker from 'faker';

// size = how many random people to generate
// weeks = number of weeks the challenge lasts
// (in case the challenge doesn't last 10 weeks)
// eslint-disable-next-line
const generateSampleData = (size, weeks) => {
  let sampleData = [];

  for (let i = 0; i < size; i++) {
    const baseLevel = Math.floor(Math.random() * 1000);
    const startWeek = Math.floor(Math.random() * 5 + 1);
    let points = [];
    for (let x = 1; x <= weeks; x++) {
      const value = x < startWeek ? 0 : Math.abs(baseLevel + Math.floor(Math.random() * 400 - 200));
      points.push(value);
    }
    const abbreviated = faker.name.firstName() + ' ' + faker.name.lastName().substr(0, 1) + '.';
    const entry = {
      name: abbreviated,
      data: points
    };

    sampleData.push(entry);
  }

  return sampleData;
};

const WeeklyScores = ({ weekFilter, weeklyData }) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    let filtered = [];
    if (!weekFilter) {
      filtered = [
        {
          name: 'Total',
          data: weeklyData
            .map(d => ({
              x: d.name,
              y: d.data.reduce((sum, item) => sum + item, 0)
            }))
            .sort((a, b) => (a.x > b.x ? 1 : a.x < b.x ? -1 : 0))
        }
      ];
      //console.log('total points', filtered);
      setFilteredData(filtered);
    } else {
      filtered = [
        {
          name: `Week ${weekFilter}`,
          data: weeklyData
            .map(d => ({
              x: d.name,
              y: d.data[weekFilter - 1]
            }))
            .sort((a, b) => (a.x > b.x ? 1 : a.x < b.x ? -1 : 0))
        }
      ];
      //console.log('filtered by week', filtered);
      setFilteredData(filtered);
    }
  }, [weekFilter, weeklyData]);

  let options = {
    dataLabels: {
      enabled: false
    },
    colors: [
      function({ value, seriesIndex, w }) {
        if (value > 7499) {
          return '#ff2457';
        } else if (value > 749) {
          return '#248aff';
        } else {
          return '#57ff24';
        }
      }
    ],
    annotations: {
      yaxis: [
        {
          y: weekFilter === 0 ? 7500 : 750,
          borderColor: '#00E396'
        }
      ]
    },
    grid: {
      yaxis: {
        lines: {
          show: false
        }
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

  return <Chart type="bar" height="300" options={options} series={filteredData} />;
};

export default WeeklyScores;
