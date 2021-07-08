// ensure that the result format is consistent
const formatResult = function formatResult(result) {
  return result;
};

// step functions can return errors that are inside of some object
// step functions can also throw regular js Error objects
// when there's an error in a step, then next steps should not be executed
// however, the whole execution should not crash, as we still need to
// call the success or fail callbacks in the end
const createStep = function createStep(fn) {
  return async function runStep(...args) {
    const result = formatResult(await fn(...args));
    if (result.error) {
      throw result.error;
    }
    return result;
  };
};

export default createStep;
