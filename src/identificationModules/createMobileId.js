import poll from '../poll';
import createStep from '../createStep';
import createModuleCreator from '../createModuleCreator';
import { getMethodByHandlingModule, METHOD_TYPES } from '../config';

const MODULE_NAME = 'mobileId';

const executable = async function executable(config) {
  const {
    cancelToken,
    language,
    apiClient,
    started = () => {},
    idcode,
    phone,
    pollInterval = 1000,
  } = config;

  const identityStart = function identityStart(settings) {
    const method = getMethodByHandlingModule(METHOD_TYPES.identification, MODULE_NAME, settings.countryCode);
    return apiClient.post({
      url: settings.apiEndpoints.inCurrentMode.identityStart(),
      data: {
        idcode: settings.idcode,
        phone: settings.phone,
        country: settings.countryCode,
        method: method.action_type,
        lang: settings.language,
      },
      cancelToken: settings.cancelToken,
    });
  };

  const identityFinish = function identityFinish(settings) {
    const method = getMethodByHandlingModule(METHOD_TYPES.identification, MODULE_NAME, settings.countryCode);
    return apiClient.post({
      url: settings.apiEndpoints.inCurrentMode.identityFinish(),
      data: {
        token: settings.data.token,
        method: method[settings.countryCode],
      },
      cancelToken: settings.cancelToken,
    });
  };

  const pollIdentityFinish = function pollIdentityFinish(settings) {
    // Mobile ID users have 120 seconds to enter their pin,
    // so it doesn't make sense to poll longer than that
    const maxPollAttempts = (120 * 1000) / pollInterval;
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
    phone,
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

const createMobileId = createModuleCreator(MODULE_NAME, executable);
export default createMobileId;
