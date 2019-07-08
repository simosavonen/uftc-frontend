import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/workouts';

const get = token => {
  axios.defaults.headers.common['Authorization'] = token;
  return axios.get(baseUrl);
};

const getAll = token => {
  axios.defaults.headers.common['Authorization'] = token;
  return axios.get(baseUrl + '/all');
};

export default { get, getAll };
