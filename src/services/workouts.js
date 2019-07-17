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
//to={`/activities/${activity.id.substr(0, 8)}`}
const update = (workout, token) => {
  console.log('workouts update', baseUrl + '/' + workout.workoutid);
  setToken(token);
  return axios.put(baseUrl + '/' + workout.workoutid, workout);
  //console.log('workouts update', baseUrl + '/' + workout.instance.id);
};

export default { get, getAll, add, update };
