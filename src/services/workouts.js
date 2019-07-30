import axios from 'axios';
import { apiUrls } from '../config/config';

const baseUrl = apiUrls.workouts;

const get = () => {
  return axios.get(baseUrl);
};

const getWorkoutsByUser = id => {
  return axios.get(baseUrl + `/${id}`);
};

const add = workout => {
  return axios.post(baseUrl, workout);
};

const update = workout => {
  return axios.put(baseUrl + '/' + workout.id, workout);
};

export default { get, getWorkoutsByUser, add, update };
