/*
  eslint-disable no-shadow, no-param-reassign
 */

import createStore from './createStore';

describe('createStore', () => {
  let state;
  let mutations;
  let actions;
  let store;

  beforeEach(() => {
    state = {
      someProp: 'somePropValue',
    };
    mutations = {
      SET_SOME_PROP(state, value) {
        state.someProp = value;
      },
    };
    actions = {
      changeProp(context, value) {
        context.commit('SET_SOME_PROP', value);
      },
    };
    store = createStore({
      state,
      actions,
      mutations,
    });
  });

  test('store has method: dispatch', () => {
    expect(typeof store.dispatch).toBe('function');
  });

  test('store should have initial state', () => {
    expect(store.getState()).toEqual(state);
  });

  test('dispatching changeProp action changes state.someProp to "newPropValue"', () => {
    store.dispatch('changeProp', 'newPropValue');
    expect(store.getState().someProp).toBe('newPropValue');
  });
});
