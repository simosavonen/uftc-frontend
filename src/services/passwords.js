import axios from 'axios';
import { apiUrls } from '../config/config';

const baseUrl = apiUrls.forgotpassword;

const requestResetEmail = email => {
  return axios.post(baseUrl, { email });
};

const verifyResetToken = token => {
  return axios.post(baseUrl + '/verify', { token });
};

const resetPassword = (token, password) => {
  return axios.post(baseUrl + '/reset', { token, password });
};

export default { requestResetEmail, verifyResetToken, resetPassword };
