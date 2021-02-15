import apiClientFactory from '../apiClient/apiClientFactory';

// MODULE_NAME must match with the default export name
const MODULE_NAME = 'idCard';

const idCard = function idCard(context) {
  const config = {
    ...context.config,
    moduleName: MODULE_NAME,
  };

  const apiClient = apiClientFactory();

  const step1 = function step1() {
    let url = `${config.apiEndpoints.card}/api/identity/${config.clientId}/read-card`;
    if (config.nonce) {
      url += `?nonce=${config.nonce}`;
    }
    return apiClient.get({
      url,
    });
  };

  const step2 = function step2(data) {
    return apiClient.post({
      url: config.localApiEndpoint,
      data: {
        token: data.token,
        country: config.countryCode,
        method: 'ee-id-login',
        lang: config.lang,
      },
    });
  };

  async function repeatingStep1(settings = {
    count: 0,
    howManyTimesToTry: 6,
  }) {
    let step1Result;
    try {
      step1Result = await step1();
      return step1Result;
    } catch (err) {
      if (err.code === 'ECONNABORTED' && settings.count <= settings.howManyTimesToTry) {
        return repeatingStep1({
          count: settings.count + 1,
        });
      }
      throw err;
    }
  }

  const authenticate = async function authenticate() {
    console.log('I am idCard and this is my context:');
    console.log(context);

    const step1Result = await repeatingStep1();
    console.log('result');
    console.log(step1Result);

    if (step1Result && step1Result.status === 200) {
      return step2(step1Result.data);
    }

    return step1Result;
  };

  return Object.freeze({
    config,
    authenticate,
  });
};

export default idCard;
