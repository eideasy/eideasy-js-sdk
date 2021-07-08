import poll from '../poll';
import createStep from '../createStep';
import createModuleCreator from '../createModuleCreator';

const executable = async function executable(config) {
  const {
    started = () => {},
    idcode,
    pollInterval = 1000,
    cancelToken,
    language,
    apiClient,
  } = config;

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

  let result;
  result = await createStep(identityStart)({
    ...config,
    cancelToken,
    language,
    idcode,
  });
  started(result);
  result = await createStep(pollIdentityFinish)({
    config,
    data: result.data,
    cancelToken,
    pollInterval,
  });
  return result;
};

const createSmartId = createModuleCreator('smartId', executable);
export default createSmartId;
