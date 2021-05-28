import modes from '../modes';

const createApiEndpoints = function createApiEndpoints(settings = {}) {
  const config = { ...settings };
  const apiEndpoints = {
    [modes.production]: {
      base: 'https://id.eideasy.com',
      card: (countryCode = config.countryCode.toLowerCase()) => `https://${countryCode}.eideasy.com`,
      eParakstsMobile: ({ clientId, appUrl }) => `https://id.eideasy.com/oauth/start/lv-eparaksts-mobile-login?
        client_id=${clientId}&redirect_uri=${appUrl}&response_type=code`,
    },
    [modes.sandbox]: {
      base: 'https://test.eideasy.com',
      card: (countryCode = config.countryCode.toLowerCase()) => `https://${countryCode}.test.eideasy.com`,
      eParakstsMobile: ({ clientId, appUrl }) => `https://test.eideasy.com/oauth/start/lv-eparaksts-mobile-login?
        client_id=${clientId}&redirect_uri=?client_id=${clientId}&
        redirect_uri=${appUrl}&response_type=code&authorization_type=code`,
    },
  };

  return Object.freeze(apiEndpoints[config.mode]);
};

export default createApiEndpoints;
