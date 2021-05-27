import createClient from './main';

describe('main', () => {
  it('should default export createClient', () => {
    expect(createClient.name).toBe('createClient');
  });
});
