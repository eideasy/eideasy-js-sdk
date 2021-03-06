import formatError from './formatError';

const createModuleCreator = function createModuleCreator(moduleName, executable) {
  return function create({
    coreContext,
    apiClient,
  }) {
    const { i18n, config: coreConfig } = coreContext;
    const start = function start(settings = {}) {
      const config = { ...coreConfig, ...settings };
      const {
        success = () => {
        },
        fail = () => {
        },
        finished = () => {
        },
      } = config;

      const language = settings.language || i18n.getCurrentLanguage();
      const source = apiClient.CancelToken.source();
      const cancelToken = source.token;

      const execute = async function execute() {
        await executable({
          ...config,
          language,
          i18n,
          cancelToken,
          apiClient,
        })
          .then((result) => {
            success(result);
          })
          .catch((error) => {
            if (console && console.error) {
              console.error(error);
            }
            fail(formatError(error));
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
      start,
    });
  };
};

export default createModuleCreator;
