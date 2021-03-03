import createApiClient from './apiClient/createApiClient';
import createApiEndpoints from './apiClient/createApiEndpoints';
import createSmartId from './authenticationModules/createSmartId';
import createIdCard from './authenticationModules/createIdCard';
import createMobileId from './authenticationModules/createMobileId';

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

const createAuthenticatorCore = function createAuthenticatorCore({
  modules = [],
  settings = {},
} = {}) {
  const config = { ...settings };
  if (!config.apiEndpoints) {
    config.apiEndpoints = createApiEndpoints({
      mode: config.sandbox ? 'sandbox' : 'production',
      countryCode: config.countryCode,
    });
  }
  const installedModules = {};

  modules.forEach((module) => {
    const instance = module({
      config,
    });
    installedModules[instance.config.moduleName] = instance;
  });

  return Object.freeze(installedModules);
};

// configuration with all the authentication modules included
const createAuthenticator = function createAuthenticator(settings = {}) {
  return createAuthenticatorCore({
    settings,
    modules: [
      idCard,
      smartId,
      mobileId,
    ],
  });
};

// export the whole authenticator with all the modules included
// this will be used for the "script tag include" build
export default createAuthenticator;

// export the core and authentication modules separately, so that the developer
// can import only the modules that will be actually used and can therefore leverage tree shaking
export {
  createAuthenticatorCore, idCard, smartId, mobileId,
};
