const idCard = function idCard(state) {
  const config = {
    moduleName: 'idCard',
  };

  const authenticate = function authenticate() {
    console.log('I am idCard');
    console.log(state);
  };

  return {
    config,
    authenticate,
  };
};

export default idCard;
