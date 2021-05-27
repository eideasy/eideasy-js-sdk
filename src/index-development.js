import createClient from './main';
import createIdCardDemo from './devHeleprs/createIdCardDemo';
import createSmartIdDemo from './devHeleprs/createSmartIdDemo';
import createMobileIdDemo from './devHeleprs/createMobileIdDemo';
import createEParakstsMobileDemo from './devHeleprs/createEParakstsMobileDemo';

console.log(process.env);

const easyClient = createClient({
  countryCode: 'EE',
  sandbox: true,
  clientId: '2IaeiZXbcKzlP1KvjZH9ghty2IJKM8Lg',
  appUrl: 'http://localhost:8080/', // this gets used for redirects e.g. when using eParaksts mobile
  localApiEndpoints: {
    identityStart: 'https://eid-sample-app.test/api/identity/start',
    identityFinish: 'https://eid-sample-app.test/api/identity/finish',
  },
  language: 'et',
});

document
  .getElementById('langPicker')
  .addEventListener('change', (e) => {
    easyClient.setLanguage(e.target.value);
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
    easyClient,
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
