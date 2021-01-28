const apiEndpoints = {
  production: {
    main: 'https://id.eideasy.com',
    card: (countryCode) => `https://${countryCode.toLowerCase()}.eideasy.com`,
  },
  sandbox: {
    main: 'https://test.eideasy.com',
    card: (countryCode) => `https://${countryCode.toLowerCase()}.eideasy.com`,
  },
};

export default apiEndpoints;
