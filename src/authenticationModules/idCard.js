const idCard = function idCard(state) {
  return {
    moduleName: 'idCard',
    authenticate: function authenticate() {
      console.log('I am idCard');
      console.log(state);
    },
  };
};

export default idCard;
