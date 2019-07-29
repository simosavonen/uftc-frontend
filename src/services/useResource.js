import { useState, useEffect } from 'react';
import axios from 'axios';

const useResource = baseUrl => {
  const [data, setData] = useState([]);
  //console.log('useResource', baseUrl);

  const fetchData = async baseUrl => {
    // console.log('fetchData', baseUrl);
    const response = await axios.get(baseUrl);
    // console.log('set fetched data', response.data);
    setData(response.data);
  };

  useEffect(() => {
    fetchData(baseUrl);
  }, [baseUrl]);

  const add = async resource => {
    console.log('add', resource);
    const response = await axios.post(baseUrl, resource);
    console.log('set added data', response.data);
    setData(data.concat(response.data));
  };

  const update = async resource => {
    console.log('update', resource);
    const response = await axios.put(baseUrl + '/' + resource.id, resource);
    const resourceUpdated = resource.map(r => (r.id !== response.data.id ? r : response.data));
    console.log('set updated data', response.data);
    setData(resourceUpdated);
  };

  const service = {
    add,
    update
  };

  return [data, service];
};

export { useResource };
