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

// lets try to not use this
const getAll = token => {
  setToken(token);
  return axios.get(baseUrl + '/all');
};

const getWorkoutsByUser = id => {
  // needs token? to limit access to logged in users?
  return axios.get(baseUrl + `/${id}`);
};

const add = (workout, token) => {
  setToken(token);
  return axios.post(baseUrl, workout);
};

const update = (workout, token) => {
  setToken(token);
  return axios.put(baseUrl + '/' + workout.workoutid, workout);
};

export default { get, getAll, getWorkoutsByUser, add, update };
