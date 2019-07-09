import axios from 'axios';
import { apiUrls } from '../config/config';

const baseUrl = apiUrls.scores;

const get = () => {
  return axios.get(baseUrl);
};

export default { get };
