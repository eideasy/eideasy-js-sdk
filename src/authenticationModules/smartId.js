import apiClientFactory from '../apiClient/apiClientFactory';
import poll from '../poll';

// MODULE_NAME must match with the default export name
const MODULE_NAME = 'smartId';

const smartId = function smartId(context) {
  const config = {
    ...context.config,
    moduleName: MODULE_NAME,
  };

  const state = {
    status: 'pending',
  };

  const apiClient = apiClientFactory();

  const step1 = function step1(settings) {
    return apiClient.post({
      url: config.localApiEndpoints.identityStart,
      data: {
        idcode: settings.idcode,
        country: config.countryCode,
        method: 'smartid',
        lang: config.language,
      },
    });
  };

  const cancel = function cancel() { console.log('I am cancel'); };

  const authenticate = async function authenticate(settings = {}) {
    const {
      onStart, onSuccess, onFail, onFinally,
    } = settings;
    let step1Result;
    try {
      step1Result = await step1({
        idcode: settings.idcode,
      });
      onStart({
        status: state.status,
        data: step1Result.data,
      });
    } catch (error) {
      state.status = 'error';
      onFail({
        status: state.status,
        error,
      });
      onFinally({
        status: state.status,
        error,
      });
    }
    let step2Result;
    if (step1Result) {
      step2Result = await poll({
        fn: () => apiClient.post({
          url: config.localApiEndpoints.identityFinish,
          data: {
            token: step1Result.data.token,
            method: 'smartid',
          },
        }),
        shouldContinue: (pollContext) => {
          if (pollContext.attempts >= 100 || pollContext.result.status === 200) {
            return false;
          }
          return true;
        },
        interval: 500,
      });
    }

    if (step2Result && step2Result.result.status === 200) {
      onSuccess({
        status: state.status,
        data: step2Result.result.data,
      });
      onFinally({
        status: state.status,
        data: step2Result.result.data,
      });
    }
  };

  return Object.freeze({
    config,
    authenticate,
    cancel,
  });
};

export default smartId;
