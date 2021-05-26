import createRequestError from './createRequestError';

describe('createRequestError', () => {
  let requestError;
  const errorSettings = {
    message: 'A mock error',
    config: 'asdfasf',
    code: 'mockErrorCode',
    request: 'asfdasf',
    response: {},
  };

  beforeAll(() => {
    requestError = createRequestError(errorSettings);
  });

  test('requestError\'s isRequestError property value is true', () => {
    expect(requestError.isRequestError).toBe(true);
  });

  test('requestError property values match the settings', () => {
    const actualValues = {
      message: requestError.message,
      config: requestError.config,
      code: requestError.code,
      request: requestError.request,
      response: requestError.response,
    };

    expect(actualValues).toEqual(errorSettings);
  });

  test('requestError is instanceof Error', () => {
    expect(requestError instanceof Error).toBe(true);
  });
});
