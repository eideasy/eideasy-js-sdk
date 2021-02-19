import makeApiClient from './apiClient/makeApiClient';
import makeApiEndpoints from './apiClient/makeApiEndpoints';
import makeSmartId from './authenticationModules/makeSmartId';
import makeIdCard from './authenticationModules/makeIdCard';

const idCard = function idCard(coreContext) {
  return makeIdCard({
    apiClient: makeApiClient(),
    coreContext,
  });
};

const smartId = function smartId(coreContext) {
  return makeSmartId({
    apiClient: makeApiClient(),
    coreContext,
  });
};

const makeAuthenticatorCore = function makeAuthenticatorCore({
  modules = [],
  settings = {},
} = {}) {
  const config = { ...settings };
  if (!config.apiEndpoints) {
    config.apiEndpoints = makeApiEndpoints({
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
const makeAuthenticator = function makeAuthenticator(settings = {}) {
  return makeAuthenticatorCore({
    settings,
    modules: [
      idCard,
      smartId,
    ],
  });
};

// export the whole authenticator with all the modules included
// this will be used for the "script tag include" build
export default makeAuthenticator;

// export the core and authentication modules separately, so that the developer
// can import only the modules that will be actually used and can therefore leverage tree shaking
export { makeAuthenticatorCore, idCard, smartId };
