// EidEasyAuthenticator.use(IdCard, SmartId, MobileId);
// const authenticator = new EidEasyAuthenticator({onSuccess: () => 'asfasf'});
// authenticator.idCard.authenticate([settings]);
// https://www.youtube.com/watch?v=ImwrezYhw4w&feature=youtu.be
//
// Probably better to use factroy functions
//
//
//

const idCard = function idCard(state) {
  return {
    moduleName: 'idCard',
    authenticate: function authenticate() {
      console.log('I am idCard');
      console.log(state);
    },
  };
};

const smartId = function smartId(state) {
  return {
    moduleName: 'smartId',
    authenticate: function authenticate() {
      console.log('I am smartId');
      console.log(state);
    },
  };
};

const createAuthenticator = function createAuthenticator({
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

export default createAuthenticator;
export { idCard, smartId };
