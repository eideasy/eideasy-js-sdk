import { isCancel } from '../request';

const createResultStore = function createResultStore() {
  let state = {
    data: undefined,
    error: undefined,
    message: undefined,
    cancelled: undefined,
  };

  function getErrorResponseData(error) {
    return error.response && error.response.data;
  }

  function getStateAfterError(stateBeforeError, error) {
    const nextState = {
      ...stateBeforeError,
    };

    nextState.error = error;

    if (isCancel(error)) {
      nextState.cancelled = true;
    }

    const errorResponseData = getErrorResponseData(error);
    if (errorResponseData) {
      nextState.data = errorResponseData;
    }

    return nextState;
  }

  const actions = {
    addRequestResult(result) {
      let nextState = {
        ...state,
      };

      if (result.error) {
        nextState = getStateAfterError(nextState, result.error);
      }

      if (result.data) {
        nextState.data = result.data;
      } else if (result.result && result.result.data) {
        // polling functions return {error, result}
        // that's why we are checking whether the result contains a response object
        nextState.data = result.result.data;
      }

      return nextState;
    },
    addError(error) {
      return getStateAfterError(state, error);
    },
    addMessage(message) {
      return {
        ...state,
        message,
      };
    },
  };

  const getState = function getState() {
    return state;
  };

  const dispatch = function dispatch(action, data) {
    const nextState = actions[action](data);
    state = nextState;
    return nextState;
  };

  return {
    getState,
    dispatch,
    actions: {
      addRequestResult: 'addRequestResult',
      addError: 'addError',
      addMessage: 'addMessage',
    },
  };
};

export default createResultStore;
