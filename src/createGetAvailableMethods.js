const createGetAvailableMethods = function createGetAvailableMethods(config) {
  const { getServiceConfig } = config;
  return async function getAvailableMethods() {
    const serviceConfig = await getServiceConfig();
    console.log(serviceConfig);
    return serviceConfig;
  };
};

export default createGetAvailableMethods;
