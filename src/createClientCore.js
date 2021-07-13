import createI18n from './i18n/createI18n';
import createApiEndpoints from './apiClient/createApiEndpoints';
import createApiClient from './apiClient/createApiClient';

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
      coreContext: {
        config,
        i18n,
      },
      apiClient: createApiClient(),
    });
    installedAuthenticationModules[instance.MODULE_NAME] = instance;
  });

  const installedSigningModules = {};
  signingModules.forEach((module) => {
    const instance = module({
      coreContext: {
        config,
        i18n,
      },
      apiClient: createApiClient(),
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
    getServiceConfig: {

    },
    getAvailableMethods: {

    },
    setLanguage: i18n.setLanguage,
    setCountryCode,
  });
};

export default createClientCore;
