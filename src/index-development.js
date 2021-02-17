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

const smartIdForm = document.getElementById('authWithSmartId');
const loader = document.createElement('div');
loader.textContent = 'Loading...';
loader.style.display = 'none';
smartIdForm.prepend(loader);

const challengeElem = document.createElement('div');
challengeElem.style.display = 'none';
smartIdForm.prepend(challengeElem);

smartIdForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  loader.style.display = 'block';
  authenticator.smartId.authenticate({
    idcode: formData.get('idcode'),
    onStart: (result) => {
      console.log(result);
      challengeElem.textContent = result.data.challenge;
      challengeElem.style.display = 'block';
    },
    onSuccess: (result) => {
      console.log(result);
    },
    onFail: (result) => {
      console.log(result);
    },
    onFinally: (result) => {
      loader.style.display = 'none';
      challengeElem.style.display = 'none';
    },
  });
});
