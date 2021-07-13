import { isCancel } from './request';

const formatError = function formatError(error) {
  const formattedError = error;
  if (isCancel(error)) {
    formattedError.isCancel = true;
  }
  if (formattedError.response && formattedError.response.data) {
    if (formattedError.response.data.message) {
      formattedError.userMessage = formattedError.response.data.message;
    }
    if (formattedError.response.data.errors) {
      formattedError.userDetails = formattedError.response.data.errors;
    }
  }
  return formattedError;
};

export default formatError;
