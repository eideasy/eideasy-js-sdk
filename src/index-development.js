import {
  createAuthenticatorCore, idCard, smartId, mobileId,
} from './main';

console.log(process.env);

const authenticator = createAuthenticatorCore({
  modules: [idCard, smartId, mobileId],
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
    countryCode: formData.get('countryCode'),
    started: (result) => {
      console.log('--- started ---');
      console.log(result);
      challengeElem.textContent = result.response.data.challenge;
      challengeElem.style.display = 'block';
    },
    fail: (result) => {
      console.log('--- fail ---');
      console.error(result.error);
      console.log(result.error && result.error.response);
    },
    success: (result) => {
      console.log('--- success ---');
      console.log(result);
    },
    finished: (result) => {
      console.log('--- finished ---');
      console.log(result);
      loader.style.display = 'none';
      challengeElem.style.display = 'none';
    },
  });
});

// mobileId example
const mobileIdForm = document.getElementById('authWithMobileId');
const loader2 = document.createElement('div');
loader2.textContent = 'Loading...';
loader2.style.display = 'none';
mobileIdForm.prepend(loader2);

const challengeElem2 = document.createElement('div');
challengeElem2.style.display = 'none';
mobileIdForm.prepend(challengeElem2);

mobileIdForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  loader2.style.display = 'block';
  authenticator.mobileId.authenticate({
    idcode: formData.get('idcode_mobile'),
    phone: formData.get('phone'),
    countryCode: formData.get('countryCode'),
    started: (result) => {
      console.log('--- started ---');
      console.log(result);
      challengeElem2.textContent = result.response.data.challenge;
      challengeElem2.style.display = 'block';
    },
    fail: (result) => {
      console.log('--- fail ---');
      console.error(result.error);
      console.log(result.error && result.error.response);
    },
    success: (result) => {
      console.log('--- success ---');
      console.log(result);
    },
    finished: (result) => {
      console.log('--- finished ---');
      console.log(result);
      loader2.style.display = 'none';
      challengeElem2.style.display = 'none';
    },
  });
});
