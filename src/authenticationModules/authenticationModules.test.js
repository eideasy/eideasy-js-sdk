import {
  idCard, smartId, mobileId, eParakstsMobile,
} from './authenticationModules';

describe('authenticationModules', () => {
  const modules = [idCard, smartId, mobileId, eParakstsMobile];
  const initializedModules = modules.map((module) => module({
    config: {},
  }));

  test.each(initializedModules)('module %p should have method "authenticate"', (module) => {
    expect(typeof module.authenticate).toBe('function');
  });

  test.each(initializedModules)('module %p should have MODULE_NAME with a typeof string', (module) => {
    expect(typeof module.MODULE_NAME).toBe('string');
  });
});
