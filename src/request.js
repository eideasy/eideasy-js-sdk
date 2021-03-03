import axios from 'axios';

axios.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  if (response.data && response.data.status === 'error') {
    return Promise.reject(response.data);
  }
  return response;
});

const request = function request(settings) {
  return axios(settings);
};

export default request;
