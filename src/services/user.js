import axios from 'axios';
import { apiUrls } from '../config/config';

const baseUrl = apiUrls.users;

const setToken = newToken => {
  axios.defaults.headers.common['Authorization'] = newToken;
};

const login = userDetails => {
  return axios.post(baseUrl + '/login', userDetails);
};

const register = userDetails => {
  return axios.post(baseUrl + '/register', userDetails);
};

const get = () => {
  return axios.get(baseUrl);
};

const me = () => {
  return axios.get(baseUrl + '/me');
};

const update = userDetails => {
  return axios.put(baseUrl + '/' + userDetails.id, userDetails);
};

export default { login, register, get, me, update, setToken };
