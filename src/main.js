import createClientCore from './createClientCore';
import {
  createIdCard, createSmartId, createMobileId, createEParakstsMobile,
} from './authenticationModules/authenticationModules';

const createClient = function createClient(settings = {}) {
  return createClientCore({
    settings,
    authenticationModules: [
      createIdCard,
      createSmartId,
      createMobileId,
      createEParakstsMobile,
    ],
  });
};

// export the whole authenticator with all the modules included
// this will be used for the "script tag include" build
export default createClient;
