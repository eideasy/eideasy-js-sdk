import createClient from './main';
import createIdCardDemo from './devHeleprs/createIdCardDemo';
import createSmartIdDemo from './devHeleprs/createSmartIdDemo';
import createMobileIdDemo from './devHeleprs/createMobileIdDemo';
import createEParakstsMobileDemo from './devHeleprs/createEParakstsMobileDemo';
import createErrorHandler from './devHeleprs/errorHandler';
import createAvailableMethodsDemo from './devHeleprs/createAvailableMethodsDemo';

console.log(process.env);

const easyClient = createClient({
  countryCode: 'EE',
  sandbox: true,
  clientId: '2IaeiZXbcKzlP1KvjZH9ghty2IJKM8Lg',
  appUrl: 'http://localhost:8082/', // this gets used for redirects e.g. when using eParaksts mobile
  apiEndpoints: {
    identityStart: () => 'https://eid-sample-app.test/api/identity/start',
    identityFinish: () => 'https://eid-sample-app.test/api/identity/finish',
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
    settingsElement: root.querySelector('.js-authMethodSettings'),
  };
  const { method, country } = root.dataset;

  const errorHandler = createErrorHandler(root.querySelector('.js-authMethod_error'));

  const methodConfig = {
    easyClient,
    dom,
    country,
    errorHandler,
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

createAvailableMethodsDemo({
  dom: {
    buttonFetch: document.querySelector('.js-availableMethods_fetchButton'),
    buttonFetchAll: document.querySelector('.js-availableMethods_fetchButtonAll'),
  },
  easyClient,
});
