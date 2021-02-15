import request from '../request';

const apiClientFactory = function apiClientFactory() {
  const get = function get(settings = {}) {
    return request({
      method: 'get',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
      },
      ...settings,
    });
  };

  const post = function post(settings = {}) {
    return request({
      method: 'post',
      cache: 'no-cache',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
      },
      ...settings,
    });
  };

  return Object.freeze({
    get,
    post,
  });
};

export default apiClientFactory;
