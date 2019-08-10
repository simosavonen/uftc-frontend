import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const caseInsensitiveNameSort = (a, b) => {
  return a.name.toLowerCase() > b.name.toLowerCase()
    ? 1
    : a.name.toLowerCase() < b.name.toLowerCase()
    ? -1
    : 0;
};

const locations = {
  Hämeenlinna: '#008FFB',
  Helsinki: '#00E396',
  Joensuu: '#FEB019',
  Tampere: '#FF4560',
  Turku: '#775DD0',
  Tallinn: '#546E7A',
  Tartu: '#26a69a'
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
            .map(d => d.data.reduce((sum, item) => sum + item, 0))
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
      yaxis: [
        {
          y: weekFilter === 0 ? 7500 : 750,
          borderColor: '#00E396'
        }
      ]
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

  return <Chart type="bar" height="300" options={options} series={data} />;
};

export default WeeklyScoresChart;
