import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/activities';

const get = () => {
  return axios.get(baseUrl);
};

const add = (activity, token) => {
  axios.defaults.headers.common['Authorization'] = token;
  return axios.post(baseUrl, activity);
};

export default { get, add };
