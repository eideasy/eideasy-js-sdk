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

import smartId from './smartId';

const idCard = function idCard(state) {
  return {
    moduleName: 'idCard',
    authenticate: function authenticate() {
      console.log('I am idCard');
      console.log(state);
    },
  };
};

const createAuthenticatorCore = function createAuthenticatorCore({
  modules = [],
} = {}) {
  console.log('I am the creator');

  const state = {
    someProp: 'I am shared state',
  };

  console.log(modules);
  const installedModules = {};

  modules.forEach((module) => {
    const instance = module(state);
    console.log(instance);
    installedModules[instance.moduleName] = instance;
  });

  return Object.freeze(installedModules);
};

const createAuthenticator = function createAuthenticator() {
  return createAuthenticatorCore({
    modules: [
      idCard,
      smartId,
    ],
  });
};

export default createAuthenticator;
export { createAuthenticatorCore, idCard, smartId };
