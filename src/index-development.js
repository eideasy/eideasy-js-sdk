import { createAuthenticatorCore, idCard } from './eidEasySdk';

console.log(process.env);

const authenticator = createAuthenticatorCore({
  modules: [idCard],
  settings: {
    countryCode: 'EE',
    sandbox: true,
    clientId: '2IaeiZXbcKzlP1KvjZH9ghty2IJKM8Lg',
    localApiEndpoint: 'http://demo.eideasy.local/api/identity/finish',
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
