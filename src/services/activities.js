import axios from 'axios';
import { apiUrls } from '../config/config';

const baseUrl = apiUrls.activities;

const get = () => {
  return axios.get(baseUrl);
};

const add = (activity, token) => {
  axios.defaults.headers.common['Authorization'] = token;
  return axios.post(baseUrl, activity);
};

export default { get, add };
