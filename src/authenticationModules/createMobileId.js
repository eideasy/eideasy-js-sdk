import poll from '../poll';
import createResultStore, { actionTypes } from './createResultStore';

const MODULE_NAME = 'mobileId';

const createMobileId = function createMobileId({
  coreContext,
  apiClient,
}) {
  const { i18n, config: coreConfig } = coreContext;
  const method = {
    EE: 'mid-login',
    LT: 'lt-mobile-id',
  };

  const step1 = function step1(settings) {
    return apiClient.post({
      url: settings.localApiEndpoints.identityStart,
      data: {
        idcode: settings.idcode,
        phone: settings.phone,
        country: settings.countryCode,
        method: method[settings.countryCode],
        lang: settings.language,
      },
      cancelToken: settings.cancelToken,
    });
  };

  const step2 = function step2(settings) {
    return apiClient.post({
      url: settings.localApiEndpoints.identityFinish,
      data: {
        token: settings.data.token,
        method: method[settings.countryCode],
      },
      cancelToken: settings.cancelToken,
    });
  };

  const authenticate = function authenticate(settings = {}) {
    const config = { ...coreConfig, ...settings };
    const {
      started = () => {},
      success = () => {},
      fail = () => {},
      finished = () => {},
      idcode,
      phone,
      pollInterval = 1000,
    } = config;

    const language = settings.language || i18n.getCurrentLanguage();

    const source = apiClient.CancelToken.source();
    const cancelToken = source.token;

    const execute = async function execute() {
      let step1Result;
      const { getState, dispatch } = createResultStore();
      try {
        step1Result = await step1({
          ...config,
          cancelToken,
          language,
          idcode,
          phone,
        });
        dispatch(actionTypes.addResult, step1Result);
        started(getState());
      } catch (error) {
        dispatch(actionTypes.addResult, { error });
      }

      let step2Result;
      if (!getState().error && step1Result) {
        // Mobile ID users have 120 seconds to enter their pin,
        // so it doesn't make sense to poll longer than that
        const maxPollAttempts = (120 * 1000) / pollInterval;
        try {
          step2Result = await poll({
            fn: () => step2({
              ...config,
              data: step1Result.data,
              cancelToken,
            }),
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
          dispatch(actionTypes.addResult, { error });
        }
      }

      if (step2Result) {
        dispatch(actionTypes.addResult, step2Result);
      }

      if (getState().error) {
        fail(getState());
      } else {
        success(getState());
      }
      finished(getState());
    };

    execute().catch(console.error);

    return Object.freeze({
      cancel: function cancel() {
        source.cancel();
      },
    });
  };

  return Object.freeze({
    MODULE_NAME,
    authenticate,
  });
};

export default createMobileId;
