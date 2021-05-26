import createResultStore from './createResultStore';
/*
import { isCancel } from '../request';

jest.mock('../request', () => ({
  isCancel: jest.fn().mockImplementation(() => () => true),
}));
 */

describe('createResultStore', () => {
  let resultStore;
  let actions;
  let dummyRequestResult;
  let dummyRequestResultNested;
  let dummyRequestError;
  beforeEach(() => {
    resultStore = createResultStore();
    actions = resultStore.actions;
    dummyRequestResult = {
      data: {
        someProperty: 'somePropertyValue',
      },
    };
    dummyRequestResultNested = {
      result: {
        data: dummyRequestResult,
      },
    };
    dummyRequestError = {
      code: 'someErrorCode',
      response: {
        data: {
          someProperty: 'somePropertyValueForError',
        },
      },
    };
  });

  test('resultStore instance has action.addRequestResult', () => {
    expect(actions.addRequestResult).toBe('addRequestResult');
  });
  test('resultStore instance has action.addError', () => {
    expect(actions.addError).toBe('addError');
  });
  test('resultStore instance has action.addMessage', () => {
    expect(actions.addMessage).toBe('addMessage');
  });
  test('resultStore instance has a function "getState"', () => {
    expect(typeof resultStore.getState).toBe('function');
  });
  test('resultStore instance has a function "dispatch"', () => {
    expect(typeof resultStore.dispatch).toBe('function');
  });
  test('addRequestResult correctly adds request data', () => {
    const nextState = resultStore.dispatch(actions.addRequestResult, dummyRequestResult);
    expect(nextState.data).toEqual(dummyRequestResult.data);
  });
  test('addRequestResult correctly adds nested request data', () => {
    const nextState = resultStore.dispatch(actions.addRequestResult, dummyRequestResultNested);
    expect(nextState.data).toEqual(dummyRequestResultNested.result.data);
  });
  test('addRequestResult correctly adds errors', () => {
    const nextState = resultStore.dispatch(actions.addRequestResult, {
      error: dummyRequestError,
      data: dummyRequestResult.data,
    });
    expect(nextState).toEqual({
      error: dummyRequestError,
      data: dummyRequestResult.data,
    });
  });
  test('addRequestResult uses error.response.data if no other response data is provided', () => {
    const nextState = resultStore.dispatch(actions.addRequestResult, {
      error: dummyRequestError,
    });
    expect(nextState).toEqual({
      error: dummyRequestError,
      data: dummyRequestError.response.data,
    });
  });
});
