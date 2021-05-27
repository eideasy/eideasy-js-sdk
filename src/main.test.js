import createAuthenticatorDefault, {
  createAuthenticator, createAuthenticatorCore, idCard, smartId, mobileId, eParakstsMobile,
} from './main';

describe('main', () => {
  it('should default export createAuthenticator', () => {
    expect(createAuthenticatorDefault.name).toBe('createAuthenticator');
  });
});
