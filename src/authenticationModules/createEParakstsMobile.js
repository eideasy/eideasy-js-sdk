import createResultStore from './createResultStore';

const MODULE_NAME = 'mobileIdLv';

const createEParakstsMobile = function createEParakstsMobile({
  coreContext,
}) {
  const { i18n, config: coreConfig } = coreContext;

  const step1 = function step1(settings) {
    // redirect here
  };

  const authenticate = function authenticate(settings = {}) {
    const config = { ...coreConfig, ...settings };
    const {
      success = () => {},
      fail = () => {},
      finished = () => {},
    } = config;

    const language = settings.language || i18n.getCurrentLanguage();

    const execute = async function execute() {
      let step1Result;
      const { getState, actions, getNextState } = createResultStore();

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
