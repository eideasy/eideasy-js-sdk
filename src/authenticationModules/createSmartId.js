import poll from '../poll';

// MODULE_NAME must match with the default export name
const MODULE_NAME = 'smartId';

const createSmartId = function createSmartId({
  coreContext,
  apiClient,
}) {
  const config = {
    ...coreContext.config,
    moduleName: MODULE_NAME,
  };

  const step1 = function step1(settings) {
    const localConfig = { ...config, ...settings };
    return apiClient.post({
      cancelToken: localConfig.cancelToken,
      url: localConfig.localApiEndpoints.identityStart,
      data: {
        idcode: settings.idcode,
        country: localConfig.countryCode,
        method: 'smartid',
        lang: localConfig.language,
      },
    });
  };

  const step2 = function step2(settings) {
    const localConfig = { ...config, ...settings };
    return apiClient.post({
      cancelToken: localConfig.cancelToken,
      url: localConfig.localApiEndpoints.identityFinish,
      data: {
        token: localConfig.data.token,
        method: 'smartid',
      },
    });
  };

  const authenticate = function authenticate(settings = {}) {
    const {
      started = () => {},
      success = () => {},
      fail = () => {},
      finished = () => {},
      idcode,
      pollInterval = 1000,
      countryCode,
      language,
    } = { ...config, ...settings };
    const source = apiClient.CancelToken.source();
    const cancelToken = source.token;

    const execute = async function execute() {
      let step1Result;
      const state = {};
      try {
        step1Result = await step1({
          cancelToken,
          countryCode,
          language,
          idcode,
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
        // Smart ID users have 100 seconds to enter their pin,
        // so it doesn't make sense to poll longer than that
        const maxPollAttempts = (100 * 1000) / pollInterval;
        try {
          step2Result = await poll({
            fn: () => step2({ data: step1Result.data, cancelToken }),
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
      cancel: function cancel() {
        source.cancel();
      },
    });
  };

  return Object.freeze({
    config,
    authenticate,
  });
};

export default createSmartId;
