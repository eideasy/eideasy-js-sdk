const createModuleCreator = function createModuleCreator(moduleName, executable) {
  const create = function create({
    coreContext,
    apiClient,
  }) {
    const { i18n, config: coreConfig } = coreContext;
    const authenticate = function authenticate(settings = {}) {
      const config = { ...coreConfig, ...settings };
      const {
        success = () => {},
        fail = () => {},
        finished = () => {},
      } = config;

      const language = settings.language || i18n.getCurrentLanguage();
      const source = apiClient.CancelToken.source();
      const cancelToken = source.token;

      const execute = async function execute() {
        await executable({
          ...config,
          language,
          cancelToken,
          apiClient,
        })
          .catch((error) => {
            fail(error);
          })
          .then((result) => {
            success(result);
          })
          .finally(finished);
      };

      execute().catch(console.error);

      return Object.freeze({
        cancel: function cancel() {
          source.cancel();
        },
      });
    };

    return Object.freeze({
      MODULE_NAME: moduleName,
      authenticate,
    });
  };

  return create;
};

export default createModuleCreator;
