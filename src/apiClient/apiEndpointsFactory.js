const apiEndpointsFactory = function apiEndpointsFactory(settings = {}) {
  const config = { ...settings };
  const apiEndpoints = {
    production: {
      main: 'https://id.eideasy.com',
      card: `https://${config.countryCode.toLowerCase()}.eideasy.com`,
    },
    sandbox: {
      main: 'https://test.eideasy.com',
      card: `https://${config.countryCode.toLowerCase()}.eideasy.com`,
    },
  };

  return Object.freeze(apiEndpoints[config.mode]);
};

export default apiEndpointsFactory;
