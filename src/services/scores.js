import axios from 'axios';
import { apiUrls } from '../config/config';

const baseUrl = apiUrls.scores;

const get = () => {
  return axios.get(baseUrl);
};

const getWeekly = () => {
  return axios.get(baseUrl + '/weekly');
};

export default { get, getWeekly };
