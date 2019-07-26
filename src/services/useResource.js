import { useState, useEffect } from 'react';
import axios from 'axios';

const useResource = baseUrl => {
  const [data, setData] = useState([]);
  //console.log('useResource', baseUrl);

  useEffect(() => {
    const fetchData = async url => {
      console.log('fetchData', url);
      const response = await axios.get(url);
      console.log('set fetched data', response.data);
      setData(response.data);
    };

    fetchData(baseUrl);
  }, [baseUrl]);

  const add = async resource => {
    console.log('add', resource);
    const response = await axios.post(baseUrl, resource);
    console.log('set added data', response.data);
    setData(data.concat(response.data));
  };

  const service = {
    add
  };

  return [data, service];
};

export { useResource };
