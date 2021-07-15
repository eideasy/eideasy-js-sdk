const METHOD_TYPES = {
  identification: 'identification',
  signing: 'signing',
};

const allMethods = Object.freeze({
  [METHOD_TYPES.identification]: [
    {
      actionType: 'ee-id-login',
      handlingModule: 'idCard',
      countriesWhitelist: ['EE'],
    },
    {
      actionType: 'lv-id-login',
      handlingModule: 'idCard',
      countriesWhitelist: ['LV'],
    },
    {
      actionType: 'lt-id-login',
      handlingModule: 'idCard',
      countriesWhitelist: ['LT'],
    },
    {
      actionType: 'lv-eparaksts-mobile-login',
      handlingModule: 'eParakstsMobile',
      countriesWhitelist: ['LV'],
    },
    {
      actionType: 'lt-mobile-id',
      handlingModule: 'mobileId',
      countriesWhitelist: ['LT'],
    },
    {
      actionType: 'mid-login',
      handlingModule: 'mobileId',
      countriesWhitelist: ['EE'],
    },
    {
      actionType: 'smartid',
      handlingModule: 'smartId',
    },
  ],
  [METHOD_TYPES.signing]: [],
});

const getMethodByHandlingModule = function getMethodByHandlingModule(methodType, handlingModule, country) {
  const methods = allMethods[methodType];
  if (handlingModule && country) {
    return methods.find((method) => method.handlingModule === handlingModule
      && method.countriesWhitelist.includes(country));
  }
  return methods.find((method) => method.handlingModule === handlingModule);
};

/* eslint-disable */
export { METHOD_TYPES, allMethods, getMethodByHandlingModule };
/* eslint-enable */
