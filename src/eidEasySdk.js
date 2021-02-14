// EidEasyAuthenticator.use(IdCard, SmartId, MobileId);
// const authenticator = new EidEasyAuthenticator({onSuccess: () => 'asfasf'});
// authenticator.idCard.authenticate([settings]);
// https://www.youtube.com/watch?v=ImwrezYhw4w&feature=youtu.be
//
// Probably better to use factroy functions
//
// https://github.com/webpack/webpack/tree/master/examples/multi-part-library
// https://webpack.js.org/guides/author-libraries/
// https://stackoverflow.com/questions/34072598/es6-exporting-importing-in-index-file
// what happens if I do

import smartId from './authenticationModules/smartId';
import idCard from './authenticationModules/idCard';

const createAuthenticatorCore = function createAuthenticatorCore({
  modules = [],
} = {}) {
  const state = {
    someProp: 'I am shared state',
  };
  const installedModules = {};

  modules.forEach((module) => {
    const instance = module(state);
    installedModules[instance.moduleName] = instance;
  });

  return Object.freeze(installedModules);
};

// configuration with all the authentication modules included
const createAuthenticator = function createAuthenticator() {
  return createAuthenticatorCore({
    modules: [
      idCard,
      smartId,
    ],
  });
};

// export the whole authenticator with all the modules included
// this will be used for the "script tag include" build
export default createAuthenticator;

// export the core and authentication modules separately, so that the developer
// can import only the modules that will be actually used and can therefore leverage tree shaking
export { createAuthenticatorCore, idCard, smartId };
