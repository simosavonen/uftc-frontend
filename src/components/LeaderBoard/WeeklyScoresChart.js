import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { locations } from '../../config/config';

const caseInsensitiveNameSort = (a, b) => {
  return a.name.toLowerCase() > b.name.toLowerCase()
    ? 1
    : a.name.toLowerCase() < b.name.toLowerCase()
    ? -1
    : 0;
};

const WeeklyScoresChart = ({ weekFilter, weeklyData }) => {
  const [data, setData] = useState([{ data: [] }]); // empty [] causes a warning
  const [categories, setCategories] = useState([]); // array of names
  const [colors, setColors] = useState([]);

  useEffect(() => {
    let filteredData = [];
    if (!weekFilter) {
      filteredData = [
        {
          name: 'Total',
          data: weeklyData
            .sort(caseInsensitiveNameSort)
            .map(d => d.pointsFromAchievements + d.data.reduce((sum, item) => sum + item, 0))
        }
      ];
      setData(filteredData);
    } else {
      filteredData = [
        {
          name: `Week ${weekFilter}`,
          data: weeklyData.sort(caseInsensitiveNameSort).map(d => d.data[weekFilter - 1])
        }
      ];
      setData(filteredData);
    }
    setCategories(weeklyData.sort(caseInsensitiveNameSort).map(d => d.name));
    setColors(weeklyData.sort(caseInsensitiveNameSort).map(d => locations[d.location]));
  }, [weekFilter, weeklyData]);

  let options = {
    colors: colors,
    plotOptions: {
      bar: {
        distributed: true
      }
    },
    dataLabels: {
      enabled: false
    },
    yaxis: {
      decimalsInFloat: 0
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: colors,
          fontSize: '14px'
        }
      }
    },
    annotations: {
      position: 'front',
      yaxis: [
        {
          label: {
            text: ' '
          },
          y: weekFilter === 0 ? 7490 : 740,
          y2: weekFilter === 0 ? 7510 : 760,
          fillColor: '#00E396'
        }
      ]
    },
    noData: {
      text: 'No data? Still loading, or the filters are too strict.',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: '#000000',
        fontSize: '22px',
        fontFamily: 'Raleway'
      }
    }
  };

  return <Chart type="bar" height="300" options={options} series={data} />;
};

export default WeeklyScoresChart;
