import {
  idCard, smartId, mobileId, eParakstsMobile,
} from './identificationModules';

describe('identificationModules', () => {
  const modules = [idCard, smartId, mobileId, eParakstsMobile];
  const initializedModules = modules.map((module) => module({
    config: {},
  }));

  test.each(initializedModules)('module %p should have method "start"', (module) => {
    expect(typeof module.start).toBe('function');
  });

  test.each(initializedModules)('module %p should have MODULE_NAME with a typeof string', (module) => {
    expect(typeof module.MODULE_NAME).toBe('string');
  });
});
