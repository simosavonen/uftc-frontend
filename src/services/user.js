import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/users';

const login = userDetails => {
  return axios.post(baseUrl + '/login', userDetails);
};

const register = userDetails => {
  return axios.post(baseUrl + '/register', userDetails);
};

export default { login, register };
