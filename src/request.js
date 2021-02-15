import axios from 'axios';

const request = function request(settings) {
  return axios(settings);
};

export default request;
