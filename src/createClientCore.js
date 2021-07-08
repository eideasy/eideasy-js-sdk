import createI18n from './i18n/createI18n';
import createApiEndpoints from './apiClient/createApiEndpoints';

const createClientCore = function createClientCore({
  authenticationModules = [],
  signingModules = [],
  settings = {},
  i18n = createI18n({ currentLanguage: 'en' }),
} = {}) {
  const config = { ...settings };

  config.apiEndpoints = createApiEndpoints({
    countryCode: config.countryCode,
    sandbox: config.sandbox,
  }, config.apiEndpoints);

  i18n.setLanguage(config.language);

  const setCountryCode = function setCountryCode(countryCode) {
    config.countryCode = countryCode;
  };

  const installedAuthenticationModules = {};
  authenticationModules.forEach((module) => {
    const instance = module({
      config,
      i18n,
    });
    installedAuthenticationModules[instance.MODULE_NAME] = instance;
  });

  const installedSigningModules = {};
  signingModules.forEach((module) => {
    const instance = module({
      config,
      i18n,
    });
    installedSigningModules[instance.MODULE_NAME] = instance;
  });

  return Object.freeze({
    authentication: {
      ...installedAuthenticationModules,
    },
    signature: {
      ...installedSigningModules,
    },
    setLanguage: i18n.setLanguage,
    setCountryCode,
  });
};

export default createClientCore;
