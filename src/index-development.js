import {
  createAuthenticatorCore, idCard, smartId, mobileId,
} from './main';

import createIdCardDemo from './devHeleprs/createIdCardDemo';
import createSmartIdDemo from './devHeleprs/createSmartIdDemo';
import createMobileIdDemo from './devHeleprs/createMobileIdDemo';

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
createIdCardDemo({ authenticator });

// smartId example
createSmartIdDemo({ authenticator });

// mobileId example
createMobileIdDemo({ authenticator });
