import axios from 'axios';
import { apiUrls } from '../config/config';

const baseUrl = apiUrls.challenges;

const get = () => {
  return axios.get(baseUrl);
};

const add = challenge => {
  return axios.post(baseUrl, challenge);
};

export default { get, add };
