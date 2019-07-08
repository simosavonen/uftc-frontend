import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/challenges';

const get = () => {
  return axios.get(baseUrl);
};

const add = challenge => {
  return axios.post(baseUrl, challenge);
};

export default { get, add };
