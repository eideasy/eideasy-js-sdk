import createStep from '../createStep';
import createModuleCreator from '../createModuleCreator';

const executable = async function executable(config) {
  const {
    cancelToken,
    language,
    apiClient,
    i18n,
  } = config;

  const readCard = function step1(settings = {}) {
    let url = `${settings.apiEndpoints.card(settings.countryCode)}/api/identity/${settings.clientId}/read-card`;
    if (settings.nonce) {
      url += `?nonce=${settings.nonce}`;
    }
    return apiClient.get({ url, cancelToken: settings.cancelToken });
  };

  const identityFinish = function step2(settings = {}) {
    const method = {
      EE: 'ee-id-login',
      LV: 'lv-id-login',
      LT: 'lt-id-login',
    };

    return apiClient.post({
      url: settings.localApiEndpoints.identityFinish,
      data: {
        token: settings.data.token,
        country: settings.countryCode,
        method: method[settings.countryCode],
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
      throw error;
    }
  });
  result = await createStep(identityFinish)({
    ...config,
    cancelToken,
    language,
    data: result.data,
  });
  return result;
};

const createIdCard = createModuleCreator('idCard', executable);
export default createIdCard;
