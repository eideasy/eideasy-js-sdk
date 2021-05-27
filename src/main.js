import createApiClient from './apiClient/createApiClient';
import createApiEndpoints from './apiClient/createApiEndpoints';
import createI18n from './i18n/createI18n';
import createSmartId from './authenticationModules/createSmartId';
import createIdCard from './authenticationModules/createIdCard';
import createMobileId from './authenticationModules/createMobileId';
import createEParakstsMobile from './authenticationModules/createEParakstsMobile';
import modes from './modes';

const idCard = function idCard(coreContext) {
  return createIdCard({
    apiClient: createApiClient(),
    coreContext,
  });
};

const smartId = function smartId(coreContext) {
  return createSmartId({
    apiClient: createApiClient(),
    coreContext,
  });
};

const mobileId = function mobileId(coreContext) {
  return createMobileId({
    apiClient: createApiClient(),
    coreContext,
  });
};

// Latvian mobile ID just redirects and doesn't need the apiClient
const eParakstsMobile = function eParakstsMobile(coreContext) {
  return createEParakstsMobile({
    coreContext,
  });
};

const createClientCore = function createClientCore({
  authenticationModules = [],
  signingModules = [],
  settings = {},
  i18n = createI18n({ currentLanguage: 'en' }),
} = {}) {
  const config = { ...settings };
  if (!config.apiEndpoints) {
    config.apiEndpoints = createApiEndpoints({
      mode: config.sandbox ? modes.sandbox : modes.production,
      countryCode: config.countryCode,
    });
  }
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

// configuration with all the authentication modules included
const createClient = function createClient(settings = {}) {
  return createClientCore({
    settings,
    authenticationModules: [
      idCard,
      smartId,
      mobileId,
      eParakstsMobile,
    ],
  });
};

// export the whole authenticator with all the modules included
// this will be used for the "script tag include" build
export default createClient;
