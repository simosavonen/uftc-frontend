import { useState, useEffect } from 'react';
import axios from 'axios';

const useResource = (baseUrl, user) => {
  const [data, setData] = useState([]);

  const fetchData = async baseUrl => {
    const response = await axios.get(baseUrl);
    setData(response.data);
  };

  useEffect(() => {
    if (user) {
      fetchData(baseUrl);
    }
  }, [baseUrl, user]);

  const add = async resource => {
    const response = await axios.post(baseUrl, resource);
    setData(data.concat(response.data));
  };

  const update = async resource => {
    const response = await axios.put(baseUrl + '/' + resource.id, resource);
    setData(function(data) {
      return data.map(r => (r.id !== response.data.id ? r : response.data));
    });
  };

  const service = {
    add,
    update
  };

  return [data, service];
};

export { useResource };
