// MODULE_NAME must match the default export name
const MODULE_NAME = 'idCard';

const makeIdCard = function makeIdCard({
  coreContext,
  apiClient,
}) {
  const config = {
    ...coreContext.config,
    moduleName: MODULE_NAME,
  };

  const step1 = function step1(settings = {}) {
    const localConfig = { ...config, ...settings };
    let url = `${localConfig.apiEndpoints.card(localConfig.countryCode)}/api/identity/${localConfig.clientId}/read-card`;
    if (localConfig.nonce) {
      url += `?nonce=${localConfig.nonce}`;
    }
    return apiClient.get({ url });
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
    });
  };

  // TODO: implement cancel
  const cancel = function cancel() {
    console.log('cancel was called, TODO: implement cancel');
  };

  const authenticate = function authenticate(settings = {}) {
    const {
      success = () => {},
      fail = () => {},
      finished = () => {},
      countryCode,
      language,
    } = { ...config, ...settings };
    async function execute() {
      let step1Result;
      const state = {};
      try {
        step1Result = await step1();
      } catch (error) {
        state.error = error;
        if (error.code === 'ECONNABORTED') {
          state.message = 'Reading the ID card took too long. Please close all the open browser windows and then try again.';
        }
      }

      let step2Result;
      if (!state.error && step1Result && step1Result.status === 200) {
        try {
          step2Result = await step2({
            countryCode,
            language,
            data: step1Result.data,
          });
        } catch (error) {
          state.error = error;
        }
      }

      if (step2Result) {
        state.response = {
          data: step2Result.data,
        };
      }

      if (state.error) {
        fail(state);
      } else {
        success(state);
      }
      finished(state);
    }

    execute().catch(console.error);

    return Object.freeze({
      cancel,
    });
  };

  return Object.freeze({
    config,
    authenticate,
  });
};

export default makeIdCard;
