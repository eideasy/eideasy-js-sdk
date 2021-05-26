import createResultStore from './createResultStore';

describe('createResultStore', () => {
  let resultStore;
  let testData;
  beforeEach(() => {
    resultStore = createResultStore();
    testData = {
      data: {
        someProperty: 'somePropertyValue',
      },
      message: 'I am a test message',
    };
  });

  test('action name "addRequestResult" is returned', () => {
    expect(resultStore.actions.addRequestResult).toBe('addRequestResult');
  });
  test('action name "addError" is returned', () => {
    expect(resultStore.actions.addError).toBe('addError');
  });
  test('action name "addMessage" is returned', () => {
    expect(resultStore.actions.addMessage).toBe('addMessage');
  });
  test('function getState is a returned', () => {
    expect(typeof resultStore.getState).toBe('function');
  });
  test('function dispatch is a returned', () => {
    expect(typeof resultStore.dispatch).toBe('function');
  });
});
