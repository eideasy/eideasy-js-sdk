import clone from './clone';

const createStore = function createStore(options = {}) {
  const state = { ...options.state };
  const { actions, mutations } = options;

  function commit(type, payload) {
    const mutation = mutations[type];
    if (!mutation) {
      throw new Error(`[Error] mutation ${type} is undefined`);
    }
    if (typeof mutation !== 'function') {
      throw new Error(`[Error] Expected mutation ${type} to be a function, got ${typeof mutation}`);
    }

    mutation(state, payload);
  }

  function dispatch(actionName, payload) {
    const action = actions[actionName];
    if (!action) {
      throw new Error(`[Error] action ${actionName} is undefined`);
    }
    if (typeof action !== 'function') {
      throw new Error(`[Error] Expected action ${actionName} to be a function, got ${typeof action}`);
    }
    action({
      commit,
      state: clone(state),
    }, payload);
  }

  return {
    state,
    dispatch,
  };
};

export default createStore;
