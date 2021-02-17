import apiClientFactory from '../apiClient/apiClientFactory';

// MODULE_NAME must match with the default export name
const MODULE_NAME = 'smartId';

const smartId = function smartId(context) {
  const config = {
    ...context.config,
    moduleName: MODULE_NAME,
  };

  const apiClient = apiClientFactory();

  const step1 = function step1() {
    console.log('step1');
  };

  const authenticate = async function authenticate() {
    step1();
  };

  return Object.freeze({
    config,
    authenticate,
  });
};

export default smartId;
