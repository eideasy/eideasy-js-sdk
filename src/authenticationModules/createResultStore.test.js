import createResultStore, { actionTypes } from './createResultStore';

jest.mock('../request', () => ({
  isCancel: jest.fn().mockImplementation(() => () => true),
}));

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
  let dummyMessage;
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
    dummyMessage = 'I am a dummy message';
  });

  test('addMessage action correctly adds message', () => {
    store.dispatch(actionTypes.addMessage, dummyMessage);
    expect(store.getState().message).toEqual(dummyMessage);
  });
  test('addResult action correctly adds request data', () => {
    store.dispatch(actionTypes.addResult, dummyRequestResult);
    expect(store.getState().data).toEqual(dummyRequestResult.data);
  });
  test('addResult correctly adds nested request data', () => {
    store.dispatch(actionTypes.addResult, dummyRequestResultNested);
    expect(store.getState().data).toEqual(dummyRequestResultNested.result.data);
  });
  test('cancelled is true', () => {
    store.dispatch(actionTypes.addResult, {
      error: dummyRequestError,
    });
    expect(store.getState().cancelled).toBe(true);
  });
  test('addRequestResult correctly adds errors', () => {
    store.dispatch(actionTypes.addResult, {
      error: dummyRequestError,
      data: dummyRequestResult.data,
    });
    expect(store.getState()).toMatchObject({
      error: dummyRequestError,
      data: dummyRequestResult.data,
    });
  });
  test('addRequestResult uses error.response.data if no other response data is provided', () => {
    store.dispatch(actionTypes.addResult, {
      error: dummyRequestError,
    });
    expect(store.getState()).toMatchObject({
      error: dummyRequestError,
      data: dummyRequestError.response.data,
    });
  });
});
