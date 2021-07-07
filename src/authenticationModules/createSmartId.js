import poll from '../poll';
import createResultStore, { actionTypes } from './createResultStore';

const MODULE_NAME = 'smartId';

// ensure that the result format is consistent
const formatResult = function formatResult(result) {
  return result;
};

// This function ensures that the results have consistent structure
const runStep = async function runStep(fn) {
  let result = {};
  try {
    result = await fn();
  } catch (error) {
    result.error = error;
  }
  result = formatResult(result);

  // some steps return errors inside of an object
  // so we need to throw those so that we can use
  // a single try catch block in later the module's execute function when running steps
  if (result.error) {
    throw result.error;
  }
  return result;
};

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
        data: settings.data,
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
      const { getState, dispatch } = createResultStore();
      try {
        const result1 = await runStep(() => identityStart({
          ...config,
          cancelToken,
          language,
          idcode,
        }));
        console.log(result1);
        dispatch(actionTypes.addResult, result1);
        started(getState());

        const result2 = await runStep(() => pollIdentityFinish({
          config,
          data: result1.data,
          cancelToken,
          pollInterval,
        }));

        if (result2) {
          dispatch(actionTypes.addResult, result2);
        }
        success(getState());
      } catch (error) {
        dispatch(actionTypes.addResult, { error });
        fail(getState());
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
