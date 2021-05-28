import createResultStore, { actionTypes } from './createResultStore';
import windowOpen from '../windowOpen';

const MODULE_NAME = 'eParakstsMobile';

const createEParakstsMobile = function createEParakstsMobile({
  coreContext,
}) {
  const { config: coreConfig } = coreContext;
  const { clientId, appUrl } = coreConfig;

  const step1 = function step1(settings = {}) {
    const requestUrl = settings.apiEndpoints.eParakstsMobile({
      clientId: settings.clientId,
      appUrl: settings.appUrl,
    });

    windowOpen(requestUrl);
  };

  const authenticate = function authenticate(settings = {}) {
    const config = { ...coreConfig, ...settings };
    const {
      success = () => {},
      fail = () => {},
      finished = () => {},
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
      cancel: function cancel() {},
    });
  };

  return Object.freeze({
    MODULE_NAME,
    authenticate,
  });
};

export default createEParakstsMobile;
