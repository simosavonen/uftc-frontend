import axios from 'axios';
import { apiUrls } from '../config/config';

const baseUrl = apiUrls.workouts;

const get = token => {
  axios.defaults.headers.common['Authorization'] = token;
  return axios.get(baseUrl);
};

const getAll = token => {
  axios.defaults.headers.common['Authorization'] = token;
  return axios.get(baseUrl + '/all');
};

export default { get, getAll };
