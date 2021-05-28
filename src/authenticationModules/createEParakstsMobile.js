import createResultStore, { actionTypes } from './createResultStore';

const MODULE_NAME = 'eParakstsMobile';

const createEParakstsMobile = function createEParakstsMobile({
  coreContext,
}) {
  const { config: coreConfig } = coreContext;

  const step1 = function step1(settings = {}) {
    window.location.href = settings.redirectUrl;
    // we're returning false here so that we know later
    // that redirect has been initiated.
    return false;
  };

  const authenticate = function authenticate(settings = {}) {
    const config = { ...coreConfig, ...settings };
    const {
      insteadOfRedirect,
      success = () => {},
      fail = () => {},
      finished = () => {},
    } = config;

    config.redirectUrl = config.apiEndpoints.eParakstsMobile({
      clientId: config.clientId,
      appUrl: config.appUrl,
    });

    const execute = async function execute() {
      let step1Result;
      const { getState, dispatch } = createResultStore();
      try {
        if (insteadOfRedirect) {
          step1Result = insteadOfRedirect(config);
        } else {
          step1Result = step1(config);
        }
      } catch (error) {
        dispatch(actionTypes.addResult, { error });
      }

      if (step1Result === false) {
        return;
      }
      if (step1Result) {
        dispatch(actionTypes.addResult, step1Result);
      }

      if (getState().error) {
        fail(getState());
      } else {
        success(getState());
      }
      finished(getState());
    };

    execute().catch(console.error);

    return Object.freeze({
      cancel: function cancel() {},
    });
  };

  return Object.freeze({
    MODULE_NAME,
    authenticate,
  });
};

export default createEParakstsMobile;
