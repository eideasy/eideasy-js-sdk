/*
  eslint-disable no-shadow, no-param-reassign
 */

import { isCancel } from '../request';
import createStore from '../createStore';

const mutationTypes = {
  SET_MESSAGE: 'SET_MESSAGE',
  SET_ERROR: 'SET_ERROR',
  SET_CANCELLED: 'SET_CANCELLED',
  SET_DATA: 'SET_DATA',
};

const actionTypes = {
  addMessage: 'addMessage',
  addResult: 'addResult',
};

function getErrorResponseData(error) {
  return error.response && error.response.data;
}

const createResultStore = function createResultStore() {
  const state = {
    data: undefined,
    error: undefined,
    message: undefined,
    cancelled: undefined,
  };

  const mutations = {
    [mutationTypes.SET_MESSAGE](state, message) {
      state.message = message;
    },
    [mutationTypes.SET_ERROR](state, error) {
      state.error = error;
    },
    [mutationTypes.SET_CANCELLED](state, cancelled) {
      state.cancelled = cancelled;
    },
    [mutationTypes.SET_DATA](state, data) {
      state.data = data;
    },
  };

  const actions = {
    [actionTypes.addMessage](context, message) {
      context.commit(mutationTypes.SET_MESSAGE, message);
    },
    [actionTypes.addResult](context, result) {
      const { error, data } = result;
      if (error) {
        context.commit(mutationTypes.SET_ERROR, error);

        const errorResponseData = getErrorResponseData(error);
        if (errorResponseData) {
          context.commit(mutationTypes.SET_DATA, errorResponseData);
        }

        if (isCancel(error)) {
          context.commit(mutationTypes.SET_CANCELLED, true);
        }
      }

      if (data) {
        context.commit(mutationTypes.SET_DATA, data);
      } else if (result.result && result.result.data) {
        // polling functions return {error, result}
        // that's why we are checking whether the result contains a response object
        context.commit(mutationTypes.SET_DATA, result.result.data);
      }
    },
  };

  return createStore({
    state,
    mutations,
    actions,
  });
};

export default createResultStore;
export {
  actionTypes,
};
