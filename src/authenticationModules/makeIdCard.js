/*
  Errors
  Do not enter the sim card or password, just let the /read-card endpoint to time out -
  you will receive the following error: error.code === 'ECONNABORTED'

  when you're offline you'll receive net::ERR_NAME_NOT_RESOLVED

  and then there are errors from the api, these can happen
  when user cancels the id card prompt or when the api itself fails
 */

// MODULE_NAME must match the default export name
const MODULE_NAME = 'idCard';

const makeIdCard = function idCard({
  coreContext,
  apiClient,
}) {
  const config = {
    ...coreContext.config,
    moduleName: MODULE_NAME,
  };
  const readCardEndpoint = `${config.apiEndpoints.card}/api/identity/${config.clientId}/read-card`;

  const step1 = function step1() {
    let url = readCardEndpoint;
    if (config.nonce) {
      url += `?nonce=${config.nonce}`;
    }
    return apiClient.get({ url });
  };

  const step2 = function step2(data) {
    return apiClient.post({
      url: config.localApiEndpoints.identityFinish,
      data: {
        token: data.token,
        country: config.countryCode,
        method: 'ee-id-login',
        lang: config.language,
      },
    });
  };

  // TODO: implement cancel
  const cancel = function cancel() {
    console.log('cancel was called, TODO: implement cancel');
  };

  const authenticate = function authenticate({
    success,
    fail,
    finished,
  }) {
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
          step2Result = await step2(step1Result.data);
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
