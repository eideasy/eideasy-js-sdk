import poll from '../poll';
import createStep from '../createStep';

const MODULE_NAME = 'smartId';

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
      await createStep(identityStart)({
        ...config,
        cancelToken,
        language,
        idcode,
      })
        .then((result) => {
          started(result);
          return createStep(pollIdentityFinish)({
            config,
            data: result.data,
            cancelToken,
            pollInterval,
          });
        })
        .catch((error) => {
          fail(error);
        })
        .then((result) => {
          success(result);
        })
        .finally(finished());
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
