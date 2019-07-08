import axios from 'axios';
import { apiUrls } from '../config/config';

const baseUrl = apiUrls.users;

const login = userDetails => {
  return axios.post(baseUrl + '/login', userDetails);
};

const register = userDetails => {
  return axios.post(baseUrl + '/register', userDetails);
};

export default { login, register };
