import createResultStore, { actionTypes } from './createResultStore';
/*
import { isCancel } from '../request';

jest.mock('../request', () => ({
  isCancel: jest.fn().mockImplementation(() => () => true),
}));
 */

describe('actionTypes', () => {
  test('has property addMessage', () => {
    expect(actionTypes.addResult).not.toBe(undefined);
  });
  test('has property addResult', () => {
    expect(actionTypes.addResult).not.toBe(undefined);
  });
});

describe('createResultStore', () => {
  let store;
  let dummyRequestResult;
  let dummyRequestResultNested;
  let dummyRequestError;
  beforeEach(() => {
    store = createResultStore();
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

  test('addResult action correctly adds request data', () => {
    store.dispatch(actionTypes.addResult, dummyRequestResult);
    expect(store.state.data).toEqual(dummyRequestResult.data);
  });
  test('addResult correctly adds nested request data', () => {
    store.dispatch(actionTypes.addResult, dummyRequestResultNested);
    expect(store.state.data).toEqual(dummyRequestResultNested.result.data);
  });
  test('addRequestResult correctly adds errors', () => {
    store.dispatch(actionTypes.addResult, {
      error: dummyRequestError,
      data: dummyRequestResult.data,
    });
    expect(store.state).toEqual({
      error: dummyRequestError,
      data: dummyRequestResult.data,
    });
  });
  test('addRequestResult uses error.response.data if no other response data is provided', () => {
    store.dispatch(actionTypes.addResult, {
      error: dummyRequestError,
    });
    expect(store.state).toEqual({
      error: dummyRequestError,
      data: dummyRequestError.response.data,
    });
  });
});
