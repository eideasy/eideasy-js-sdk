const METHOD_TYPES = {
  identification: 'identification',
  signing: 'signing',
};

const allMethods = Object.freeze({
  [METHOD_TYPES.identification]: [
    {
      action_type: 'ee-id-login',
      handlingModule: 'idCard',
      countriesWhitelist: ['EE'],
    },
    {
      action_type: 'lv-id-login',
      handlingModule: 'idCard',
      countriesWhitelist: ['LV'],
    },
    {
      action_type: 'lt-id-login',
      handlingModule: 'idCard',
      countriesWhitelist: ['LT'],
    },
    {
      action_type: 'lv-eparaksts-mobile-login',
      handlingModule: 'eParakstsMobile',
      countriesWhitelist: ['LV'],
    },
    {
      action_type: 'lt-mobile-id',
      handlingModule: 'mobileId',
      countriesWhitelist: ['LT'],
    },
    {
      action_type: 'mid-login',
      handlingModule: 'mobileId',
      countriesWhitelist: ['EE'],
    },
    {
      action_type: 'smartid',
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
