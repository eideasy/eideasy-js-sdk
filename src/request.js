import axios from 'axios';
import createRequestError from './createRequestError';

const { CancelToken, isCancel } = axios;

axios.interceptors.response.use((response) => {
  // eidEasy api returns some errors with a status code 200
  // so we have to intercept those requests and throw errors like
  // axios normally does.
  if (response.data && response.data.status === 'error') {
    return Promise.reject(createRequestError({
      message: `Request failed with status code ${response.status}`,
      config: response.config,
      request: response.request,
      response,
    }));
  }
  return response;
});

const request = function request(settings) {
  return axios(settings);
};

export default request;
export { CancelToken, isCancel };
