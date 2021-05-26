import createResultStore, { actionTypes } from './createResultStore';

const MODULE_NAME = 'eParakstsMobile';

const createEParakstsMobile = function createEParakstsMobile({
  coreContext,
}) {
  const { config: coreConfig } = coreContext;
  const { clientId, appUrl } = coreConfig;

  const step1 = function step1(settings) {
    const requestUrl = `https://test.eideasy.com/oauth/start/lv-eparaksts-mobile-login?client_id=${clientId}
    &redirect_uri=?client_id=${clientId}&redirect_uri=${appUrl}&response_type=code&authorization_type=code`;
    window.location.href = requestUrl;
  };

  const authenticate = function authenticate(settings = {}) {
    const config = { ...coreConfig, ...settings };
    const {
      success = () => {
      },
      fail = () => {
      },
      finished = () => {
      },
    } = config;

    const execute = async function execute() {
      let step1Result;
      const { getState, dispatch } = createResultStore();
      step1(config);

      if (getState().error) {
        fail(getState());
      } else {
        success(getState());
      }
      finished(getState());
    };

    execute().catch(console.error);

    return Object.freeze({
      cancel: function cancel() {
      },
    });
  };

  return Object.freeze({
    MODULE_NAME,
    authenticate,
  });
};

export default createEParakstsMobile;
