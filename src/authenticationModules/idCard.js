import apiClientFactory from '../apiClient/apiClientFactory';

const idCard = function idCard(context) {
  const config = {
    ...context.config,
    moduleName: 'idCard',
  };

  const apiClient = apiClientFactory();

  const step1 = function step1() {

  };

  const authenticate = function authenticate() {
    console.log('I am idCard');
    console.log(context);
  };

  return {
    config,
    authenticate,
  };
};

export default idCard;
