import cloneDeep from './cloneDeep';
import formatError from './formatError';

const formatResult = function formatResult(result) {
  const { data, message } = result;
  const formattedResult = cloneDeep({
    message,
  });

  if (data) {
    formattedResult.data = data;
  } else if (result.result && result.result.data) {
    // polling functions return {error, result}
    // that's why we are checking whether the result contains a response object
    formattedResult.data = result.result.data;
  }

  return formattedResult;
};

const getError = function getError(result) {
  return result.error;
};

// step functions can return errors that are inside of some object
// step functions can also throw regular js Error objects
// when there's an error in a step, then next steps should not be executed
// however, the whole execution should not crash, as we still need to
// call the success or fail callbacks in the end
const createStep = function createStep(fn) {
  return async function runStep(...args) {
    const result = await fn(...args);
    const error = getError(result);
    if (error) {
      throw formatError(error);
    }
    return formatResult(result);
  };
};

export default createStep;
