const makeApiEndpoints = function apiEndpointsFactory(settings = {}) {
  const config = { ...settings };
  const apiEndpoints = {
    production: {
      base: 'https://id.eideasy.com',
      card: (countryCode = config.countryCode.toLowerCase()) => `https://${countryCode}.eideasy.com`,
    },
    sandbox: {
      base: 'https://test.eideasy.com',
      card: (countryCode = config.countryCode.toLowerCase()) => `https://${countryCode}.eideasy.com`,
    },
  };

  return Object.freeze(apiEndpoints[config.mode]);
};

export default makeApiEndpoints;
