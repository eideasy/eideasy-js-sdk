import apiClientFactory from '../apiClient/apiClientFactory';

const idCard = function idCard(context) {
  const config = {
    ...context.config,
    moduleName: 'idCard',
  };

  const apiClient = apiClientFactory();

  const step1 = function step1() {
    let fetchUrl = `${config.apiEndpoints.card}/api/identity/${config.clientId}/read-card`;
    if (config.nonce) {
      fetchUrl += `?nonce=${config.nonce}`;
    }
    return apiClient.get(fetchUrl, { credentials: 'include' });
  };

  const step2 = function step2(data) {
    const fetchUrl = config.localApiEndpoint;
    return apiClient.post(fetchUrl, {
      token: data.token,
      country: config.countryCode,
      method: 'ee-id-login',
      lang: config.lang,
    });
  };

  const authenticate = async function authenticate() {
    console.log('I am idCard and this is my context:');
    console.log(context);

    const step1Result = await step1();
    const step2Result = await step2(step1Result);
  };

  return Object.freeze({
    config,
    authenticate,
  });
};

export default idCard;
