import poll from '../poll';
import createResultStore from './createResultStore';

const MODULE_NAME = 'smartId';

const createSmartId = function createSmartId({
  coreContext,
  apiClient,
}) {
  const { i18n, config: coreConfig } = coreContext;

  const step1 = function step1(settings) {
    return apiClient.post({
      cancelToken: settings.cancelToken,
      url: settings.localApiEndpoints.identityStart,
      data: {
        idcode: settings.idcode,
        country: settings.countryCode,
        method: 'smartid',
        lang: settings.language,
      },
    });
  };

  const step2 = function step2(settings) {
    console.log(settings);
    return apiClient.post({
      cancelToken: settings.cancelToken,
      url: settings.localApiEndpoints.identityFinish,
      data: {
        token: settings.data.token,
        method: 'smartid',
      },
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
      pollInterval = 1000,
    } = config;

    const language = settings.language || i18n.getCurrentLanguage();

    const source = apiClient.CancelToken.source();
    const cancelToken = source.token;

    const execute = async function execute() {
      let step1Result;
      const { getState, actions, dispatch } = createResultStore();
      try {
        step1Result = await step1({
          ...config,
          cancelToken,
          language,
          idcode,
        });
        started(dispatch(actions.addRequestResult, step1Result));
      } catch (error) {
        dispatch(actions.addError, error);
      }

      let step2Result;
      if (!getState().error && step1Result) {
        // Smart ID users have 100 seconds to enter their pin,
        // so it doesn't make sense to poll longer than that
        const maxPollAttempts = (100 * 1000) / pollInterval;
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
          dispatch(actions.addError, error);
        }
      }

      if (step2Result) {
        dispatch(actions.addRequestResult, step2Result);
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

export default createSmartId;
