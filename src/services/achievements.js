import axios from 'axios';
import { apiUrls } from '../config/config';

const baseUrl = apiUrls.achievements;
/*const setToken = newToken => {
  axios.defaults.headers.common['Authorization'] = newToken;
};*/

const get = () => {
  return axios.get(baseUrl);
};

const add = achievement => {
  // setToken(token);
  return axios.post(baseUrl, achievement);
};

export default { get, add };
