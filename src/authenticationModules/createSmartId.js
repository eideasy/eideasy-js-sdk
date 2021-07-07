import poll from '../poll';
import createResultStore, { actionTypes } from './createResultStore';

const MODULE_NAME = 'smartId';

/*
// ensure that the result format is consistent
const formatResult = function formatResult(result) {
  return result;
};

const createStep = function createStep(fn) {
  const run = async function run(...args) {
    let result;
    try {
      result = await fn(args);
      dispatch(actionTypes.addResult, step1Result);
      started(getState());
    } catch (error) {
      dispatch(actionTypes.addResult, { error });
    }
  };
  return {
    run,
  };
};

 */

const createSmartId = function createSmartId({
  coreContext,
  apiClient,
}) {
  const { i18n, config: coreConfig } = coreContext;

  const identityStart = function identityStart(settings) {
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

  const identityFinish = function identityFinish(settings) {
    return apiClient.post({
      cancelToken: settings.cancelToken,
      url: settings.localApiEndpoints.identityFinish,
      data: {
        token: settings.data.token,
        method: 'smartid',
      },
    });
  };

  const pollIdentityFinish = function pollIdentityFinish(settings) {
    const maxPollAttempts = (100 * 1000) / settings.pollInterval;
    return poll({
      fn: () => identityFinish({
        ...settings.config,
        data: settings.step1Result.data,
        cancelToken: settings.cancelToken,
      }),
      shouldContinue: (pollContext) => {
        const responseStatus = pollContext.result
          && pollContext.result.data
          && pollContext.result.data.status;
        return pollContext.attempts < maxPollAttempts && responseStatus === 'RUNNING';
      },
      interval: 1000,
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
      const { getState, dispatch } = createResultStore();
      try {
        step1Result = await identityStart({
          ...config,
          cancelToken,
          language,
          idcode,
        });
        dispatch(actionTypes.addResult, step1Result);
        started(getState());

        console.log('start poll');
        const step2Result = await pollIdentityFinish({
          ...config,
          data: step1Result.data,
          cancelToken,
          pollInterval,
        });
        console.log('adter poll');

        if (step2Result) {
          dispatch(actionTypes.addResult, step2Result);
        }
        success(getState());
      } catch (error) {
        fail(getState());
        dispatch(actionTypes.addResult, { error });
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
