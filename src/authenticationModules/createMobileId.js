import poll from '../poll';

// MODULE_NAME must match with the default export name
const MODULE_NAME = 'mobileId';

const createMobileId = function createMobileId({
  coreContext,
  apiClient,
}) {
  const config = {
    ...coreContext.config,
    moduleName: MODULE_NAME,
  };

  const method = {
    EE: 'mid-login',
    LV: 'lt-mobile-id',
    LT: 'lv-mobile-id',
  };

  const step1 = function step1(settings) {
    const localConfig = { ...config, ...settings };
    return apiClient.post({
      url: localConfig.localApiEndpoints.identityStart,
      data: {
        idcode: localConfig.idcode,
        phone: localConfig.phone,
        country: localConfig.countryCode,
        method: method[localConfig.countryCode],
        lang: localConfig.language,
      },
    });
  };

  const step2 = function step2(settings) {
    const localConfig = { ...config, ...settings };
    return apiClient.post({
      url: localConfig.localApiEndpoints.identityFinish,
      data: {
        token: localConfig.data.token,
        method: method[localConfig.countryCode],
      },
    });
  };

  // TODO: implement cancel
  const cancel = function cancel() {
    console.log('cancel was called, TODO: implement cancel');
  };

  const authenticate = function authenticate(settings = {}) {
    const {
      started = () => {},
      success = () => {},
      fail = () => {},
      finished = () => {},
      idcode,
      phone,
      pollInterval = 1000,
      countryCode,
      language,
    } = { ...config, ...settings };
    const execute = async function execute() {
      let step1Result;
      const state = {};
      try {
        step1Result = await step1({
          countryCode,
          language,
          idcode,
          phone,
        });
        started({
          response: {
            data: step1Result.data,
          },
        });
      } catch (error) {
        state.error = error;
      }

      let step2Result;
      if (!state.error && step1Result) {
        // Mobile ID users have 120 seconds to enter their pin,
        // so it doesn't make sense to poll longer than that
        const maxPollAttempts = (120 * 1000) / pollInterval;
        try {
          step2Result = await poll({
            fn: () => step2({ data: step1Result.data }),
            shouldContinue: (pollContext) => {
              const responseStatus = pollContext.result
                && pollContext.result.data
                && pollContext.result.data.status;
              if (pollContext.attempts < maxPollAttempts && responseStatus === 'RUNNING') {
                return true;
              }
              return false;
            },
            interval: 1000,
          });
        } catch (error) {
          state.error = error;
        }
      }

      if (step2Result) {
        state.error = step2Result.error;
        state.response = {
          data: step2Result.result && step2Result.result.data,
        };
      }

      if (state.error) {
        fail(state);
      } else {
        success(state);
      }
      finished(state);
    };

    execute().catch(console.error);

    return Object.freeze({
      cancel,
    });
  };

  return Object.freeze({
    config,
    authenticate,
  });
};

export default createMobileId;
