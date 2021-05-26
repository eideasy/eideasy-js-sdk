import { isCancel } from '../request';

const createResultStore = function createResultStore() {
  let state = {
    data: undefined,
    error: undefined,
    message: undefined,
    cancelled: undefined,
  };

  const actions = {
    addRequestResult(result) {
      const nextState = {
        ...state,
      };

      if (result.error) {
        nextState.error = result.error;
        if (isCancel(result.error)) {
          nextState.cancelled = true;
        }

        if (result.error.response && result.error.response.data) {
          nextState.data = result.error.response.data;
        }
      }

      if (result.data) {
        nextState.data = result.data;
      } else if (result.result && result.result.data) {
        // polling functions returns {error, result}
        // that's why we are checking whether the result contains a response object
        nextState.data = result.result.data;
      }

      return nextState;
    },
    addError(error) {
      const nextState = {
        ...state,
        error,
      };

      if (isCancel(error)) {
        nextState.cancelled = true;
      }

      if (error.response && error.response.data) {
        nextState.data = error.response.data;
      }

      return nextState;
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
