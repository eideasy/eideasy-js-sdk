import createStep from '../createStep';
import createModuleCreator from '../createModuleCreator';
import { METHOD_TYPES, getMethodByHandlingModule } from '../config';

const MODULE_NAME = 'idCard';

const executable = async function executable(config) {
  const {
    cancelToken,
    language,
    apiClient,
    i18n,
  } = config;

  const readCard = function readCard(settings = {}) {
    let url = `${settings.apiEndpoints.inCurrentMode.card(settings.countryCode)}/api/identity/${settings.clientId}/read-card`;
    if (settings.nonce) {
      url += `?nonce=${settings.nonce}`;
    }
    return apiClient.get({ url, cancelToken: settings.cancelToken });
  };

  const identityFinish = function identityFinish(settings = {}) {
    const method = getMethodByHandlingModule(METHOD_TYPES.identification, MODULE_NAME, settings.countryCode);

    return apiClient.post({
      url: settings.apiEndpoints.inCurrentMode.identityFinish(),
      data: {
        token: settings.data.token,
        country: settings.countryCode,
        method: method.actionType,
        lang: settings.language,
      },
      cancelToken: settings.cancelToken,
    });
  };

  let result;
  result = await createStep(readCard)({
    ...config,
    language,
    cancelToken,
  }).catch((error) => {
    if (error.code === 'ECONNABORTED') {
      error.userMessage = i18n.t('idCardReadTimeout'); // eslint-disable-line no-param-reassign
    }
    throw error;
  });

  result = await createStep(identityFinish)({
    ...config,
    cancelToken,
    language,
    data: result.data,
  });
  return result;
};

const createIdCard = createModuleCreator(MODULE_NAME, executable);
export default createIdCard;
