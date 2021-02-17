import { createAuthenticatorCore, idCard, smartId } from './eidEasySdk';

console.log(process.env);

const authenticator = createAuthenticatorCore({
  modules: [idCard, smartId],
  settings: {
    countryCode: 'EE',
    sandbox: true,
    clientId: '2IaeiZXbcKzlP1KvjZH9ghty2IJKM8Lg',
    localApiEndpoints: {
      identityStart: 'http://eid-sample-app.test/api/identity/start',
      identityFinish: 'http://eid-sample-app.test/api/identity/finish',
    },
    language: 'et',
  },
});

const idAuthButton = document.getElementById('authWithIDCard');
idAuthButton.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const result = await authenticator.idCard.authenticate();
    console.log(result);
  } catch (err) {
    console.log('catch');
    console.error(err);
  }
});

const smartIdAuthButton = document.getElementById('authWithSmartId');
smartIdAuthButton.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const result = await authenticator.smartId.authenticate();
    console.log(result);
  } catch (err) {
    console.log('catch');
    console.error(err);
  }
});
