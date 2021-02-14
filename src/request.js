import { fetch as fetchPolyfill } from 'whatwg-fetch';

let { fetch } = window;
if (!fetch) {
  fetch = fetchPolyfill;
}

const request = function request(url, settings) {
  return fetch(url, settings);
};

export default request;
