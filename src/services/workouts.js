import axios from 'axios';
import { apiUrls } from '../config/config';

const baseUrl = apiUrls.workouts;

const setToken = newToken => {
  axios.defaults.headers.common['Authorization'] = newToken;
};

const get = token => {
  setToken(token);
  return axios.get(baseUrl);
};

const getAll = token => {
  setToken(token);
  return axios.get(baseUrl + '/all');
};

const add = (workout, token) => {
  setToken(token);
  return axios.post(baseUrl, workout);
};

export default { get, getAll, add };
