const createGetServiceConfig = function createGetServiceConfig({
  coreContext,
  apiClient,
}) {
  const { clientId } = coreContext.config;
  return function getServiceConfig() {
    return apiClient.post({
      url: `${coreContext.config.apiEndpoints.inCurrentMode.base()}/api/client-config/${clientId}`,
      withCredentials: false,
    });
  };
};

export default createGetServiceConfig;
