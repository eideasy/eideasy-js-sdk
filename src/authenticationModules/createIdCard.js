import createResultStore from './createResultStore';
// MODULE_NAME must match the default export name
const MODULE_NAME = 'idCard';
const createIdCard = function createIdCard({
  coreContext,
  apiClient,
}) {
  const config = {
    ...coreContext.config,
    moduleName: MODULE_NAME,
  };

  const { i18n } = coreContext;

  const step1 = function step1(settings = {}) {
    const localConfig = { ...config, ...settings };
    let url = `${localConfig.apiEndpoints.card(localConfig.countryCode)}/api/identity/${localConfig.clientId}/read-card`;
    if (localConfig.nonce) {
      url += `?nonce=${localConfig.nonce}`;
    }
    return apiClient.get({ url, cancelToken: localConfig.cancelToken });
  };

  const step2 = function step2(settings = {}) {
    const localConfig = { ...config, ...settings };
    return apiClient.post({
      url: localConfig.localApiEndpoints.identityFinish,
      data: {
        token: localConfig.data.token,
        country: localConfig.countryCode,
        method: 'ee-id-login',
        lang: localConfig.language,
      },
      cancelToken: localConfig.cancelToken,
    });
  };

  const authenticate = function authenticate(settings = {}) {
    const {
      success = () => {},
      fail = () => {},
      finished = () => {},
      countryCode,
      language,
    } = { ...config, ...settings };

    const source = apiClient.CancelToken.source();
    const cancelToken = source.token;

    async function execute() {
      let step1Result;
      const { getState, actions, getNextState } = createResultStore();
      try {
        step1Result = await step1({ cancelToken });
      } catch (error) {
        getNextState(actions.addError, error);
        if (error.code === 'ECONNABORTED') {
          getNextState(actions.addMessage(), i18n.t('idCardReadTimeout'));
        }
      }

      let step2Result;
      if (!getState().error && step1Result && step1Result.status === 200) {
        try {
          step2Result = await step2({
            cancelToken,
            countryCode,
            language,
            data: step1Result.data,
          });
        } catch (error) {
          getNextState(actions.addError, error);
        }
      }

      if (step2Result) {
        getNextState(actions.addRequestResult, step2Result);
      }

      if (getState().error) {
        fail(getState());
      } else {
        success(getState());
      }
      finished(getState());
    }

    execute().catch(console.error);

    return Object.freeze({
      cancel: function cancel() {
        source.cancel();
      },
    });
  };

  return Object.freeze({
    config,
    authenticate,
  });
};

export default createIdCard;
