import { makeAuthenticatorCore, idCard, smartId } from './eidEasySdk';

console.log(process.env);

const authenticator = makeAuthenticatorCore({
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

// idcard example
const idAuthButton = document.getElementById('authWithIDCard');
const cancelIDCardButton = document.getElementById('cancelIDCard');
let authInstance;
idAuthButton.addEventListener('click', async (e) => {
  e.preventDefault();
  authInstance = authenticator.idCard.authenticate({
    fail: (result) => {
      console.log('--- fail ---');
      console.error(result.error);
    },
    success: (result) => {
      console.log('--- success ---');
      console.log(result);
    },
    finished: (result) => {
      console.log('--- finished ---');
      console.log(result);
    },
  });
});

cancelIDCardButton.addEventListener('click', async (e) => {
  e.preventDefault();
  authInstance.cancel();
});

// smartId example
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
    started: (context) => {
      challengeElem.textContent = context.data.challenge;
      challengeElem.style.display = 'block';
    },
    success: (context) => {
      console.log('--- success ---');
      console.log(context);
    },
    fail: (context) => {
      console.log('--- fail ---');
      console.log(context);
    },
    finally: (context) => {
      console.log('--- finally ---');
      console.log(context);
      loader.style.display = 'none';
      challengeElem.style.display = 'none';
    },
  });
});
