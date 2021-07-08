import { isCancel } from './request';

const formatError = function formatError(error) {
  const formattedError = error;
  if (isCancel(error)) {
    formattedError.isCancel = true;
  }
  if (formattedError.response && formattedError.response.data) {
    formattedError.data = formattedError.response.data;
  }
  return formattedError;
};

export default formatError;
