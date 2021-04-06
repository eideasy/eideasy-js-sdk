import {
  createAuthenticatorCore, idCard, smartId, mobileId, eParakstsMobile,
} from './main';

import createIdCardDemo from './devHeleprs/createIdCardDemo';
import createSmartIdDemo from './devHeleprs/createSmartIdDemo';
import createMobileIdDemo from './devHeleprs/createMobileIdDemo';
import createEParakstsMobileDemo from './devHeleprs/createEParakstsMobileDemo';

console.log(process.env);


const authenticator = createAuthenticatorCore({
  modules: [idCard, smartId, mobileId, eParakstsMobile],
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

document
  .getElementById('langPicker')
  .addEventListener('change', (e) => {
    authenticator.setLanguage(e.target.value);
  });

function createDemos(root) {
  const dom = {
    root,
    form: root.querySelector('.js-authMethod_form'),
    buttonStart: root.querySelector('.js-authMethod_start'),
    buttonCancel: root.querySelector('.js-authMethod_cancel'),
  };
  const { method, country } = root.dataset;

  const methodConfig = {
    authenticator,
    dom,
    country,
  };

  if (method === 'id-card') {
    createIdCardDemo(methodConfig);
  } else if (method === 'smart-id') {
    createSmartIdDemo(methodConfig);
  } else if (method === 'mobile-id') {
    createMobileIdDemo(methodConfig);
  } else if (method === 'eparaksts-mobile') {
    createEParakstsMobileDemo(methodConfig);
  }
}

document
  .querySelectorAll('.js-authMethod')
  .forEach(createDemos);
