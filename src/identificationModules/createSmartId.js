import poll from '../poll';
import createStep from '../createStep';
import createModuleCreator from '../createModuleCreator';
import { getMethodByHandlingModule, METHOD_TYPES } from '../config';

const MODULE_NAME = 'smartId';

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
    const method = getMethodByHandlingModule(METHOD_TYPES.identification, MODULE_NAME);
    return apiClient.post({
      cancelToken: settings.cancelToken,
      url: settings.apiEndpoints.inCurrentMode.identityStart(),
      data: {
        idcode: settings.idcode,
        country: settings.countryCode,
        method: method.action_type,
        lang: settings.language,
      },
    });
  };

  const identityFinish = function identityFinish(settings) {
    const method = getMethodByHandlingModule(METHOD_TYPES.identification, MODULE_NAME);
    return apiClient.post({
      cancelToken: settings.cancelToken,
      url: settings.apiEndpoints.inCurrentMode.identityFinish(),
      data: {
        token: settings.data.token,
        method: method.action_type,
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

const createSmartId = createModuleCreator(MODULE_NAME, executable);
export default createSmartId;
