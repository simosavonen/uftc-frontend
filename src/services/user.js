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

export default { login, register, setToken };
