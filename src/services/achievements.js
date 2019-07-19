import axios from 'axios';
import { apiUrls } from '../config/config';

const baseUrl = apiUrls.achievements;

/*const setToken = newToken => {
  axios.defaults.headers.common['Authorization'] = newToken;
};
*/

const get = () => {
  return axios.get(baseUrl);
};

const add = achievement => {
  //setToken(token);
  return axios.post(baseUrl, achievement);
};

const getByActivity = activityId => {
  return axios.get(baseUrl + '/' + activityId);
};

const getDailyToday = () => {
  return axios.get(baseUrl + '/daily');
};

const getDailyByDate = date => {
  return axios.get(baseUrl + '/daily/' + date);
};

export default { get, getByActivity, getDailyToday, getDailyByDate, add };
