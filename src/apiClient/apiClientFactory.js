import request from '../request';

const apiClientFactory = function apiClientFactory() {
  const config = {
    credentials: 'same-origin',
    Accept: 'application/json',
  };

  const get = function get(url) {
    return request(url, { ...config });
  };

  const post = function post(url, settings = {}) {
    const defaultSettings = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    };

    return request(url, { ...defaultSettings, ...settings });
  };

  return Object.freeze({
    get,
    post,
  });
};

export default apiClientFactory;
