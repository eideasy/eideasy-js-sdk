// we're using axios behind the scenes
// so it makes sense to use a similar request error format
// for our own api errors as well
// https://github.com/axios/axios/blob/master/lib/core/createError.js
const createRequestError = function createRequestError({
  message,
  config,
  code,
  request,
  response,
}) {
  const error = new Error(message);
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isRequestError = true;
  return error;
};

export default createRequestError;
