import modes from '../modes';

const createApiEndpoints = function createApiEndpoints(settings = {}) {
  const config = { ...settings };
  const apiEndpoints = {
    [modes.production]: {
      base: 'https://id.eideasy.com',
      card: (countryCode = config.countryCode.toLowerCase()) => `https://${countryCode}.eideasy.com`,
    },
    [modes.sandbox]: {
      base: 'https://test.eideasy.com',
      card: (countryCode = config.countryCode.toLowerCase()) => `https://${countryCode}.test.eideasy.com`,
    },
  };

  return Object.freeze(apiEndpoints[config.mode]);
};

export default createApiEndpoints;
