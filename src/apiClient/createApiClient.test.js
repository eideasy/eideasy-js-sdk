import createApiClient from './createApiClient';

describe('createApiClient', () => {
  let apiClient;
  beforeEach(() => {
    apiClient = createApiClient();
  });

  test('apiClient has method get', () => {
    expect(typeof apiClient.get).toBe('function');
  });

  test('apiClient has method post', () => {
    expect(typeof apiClient.post).toBe('function');
  });

  test('apiClient has method CancelToken', () => {
    expect(typeof apiClient.CancelToken).toBe('function');
  });
});
