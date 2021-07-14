import {
  createIdCard, createSmartId, createMobileId, createEParakstsMobile,
} from './identificationModules';

describe('identificationModules', () => {
  const modules = [createIdCard, createSmartId, createMobileId, createEParakstsMobile];
  const initializedModules = modules.map((module) => module({
    coreContext: {
      config: {},
      i18n: {},
    },
  }));

  test.each(initializedModules)('module %p should have method "start"', (module) => {
    expect(typeof module.start).toBe('function');
  });

  test.each(initializedModules)('module %p should have MODULE_NAME with a typeof string', (module) => {
    expect(typeof module.MODULE_NAME).toBe('string');
  });
});
