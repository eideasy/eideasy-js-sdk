const methodTypes = {
  IDENTIFICATION: 'identification',
  SIGNING: 'signing',
};

const methodActionTypes = {
  EE_ID_LOGIN: 'ee-id-login',
  LV_ID_LOGIN: 'lv-id-login',
  LT_ID_LOGIN: 'lt-id-login',
  EE_MOBILE_ID: 'mid-login',
  LV_EPARAKSTS_MOBILE_LOGIN: 'lv-eparaksts-mobile-login',
  LT_MOBILE_ID: 'lt-mobile-id',
  SMART_ID: 'smartid',
};

// we should probably use different names for the signing modules
// something like idCardSigning or idCardSignature
const moduleNames = {
  idCard: 'idCard',
  mobileId: 'mobileId',
  eParakstsMobile: 'eParakstsMobile',
  smartId: 'smartId',
};

const allMethods = Object.freeze({
  [methodTypes.IDENTIFICATION]: [
    {
      actionType: methodActionTypes.EE_ID_LOGIN,
      handlingModule: moduleNames.idCard,
      countriesWhitelist: ['EE'],
    },
    {
      actionType: methodActionTypes.LV_ID_LOGIN,
      handlingModule: moduleNames.idCard,
      countriesWhitelist: ['LV'],
    },
    {
      actionType: methodActionTypes.LT_ID_LOGIN,
      handlingModule: moduleNames.idCard,
      countriesWhitelist: ['LT'],
    },
    {
      actionType: methodActionTypes.LV_EPARAKSTS_MOBILE_LOGIN,
      handlingModule: moduleNames.eParakstsMobile,
      countriesWhitelist: ['LV'],
    },
    {
      actionType: methodActionTypes.LT_MOBILE_ID,
      handlingModule: moduleNames.mobileId,
      countriesWhitelist: ['LT'],
    },
    {
      actionType: methodActionTypes.EE_MOBILE_ID,
      handlingModule: moduleNames.mobileId,
      countriesWhitelist: ['EE'],
    },
    {
      actionType: methodActionTypes.SMART_ID,
      handlingModule: moduleNames.smartId,
    },
  ],
  [methodTypes.signing]: [],
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
export { methodTypes, methodActionTypes, moduleNames, allMethods, getMethodByHandlingModule };
/* eslint-enable */
