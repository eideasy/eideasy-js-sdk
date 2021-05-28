import createClientCore from './createClientCore';
import {
  idCard, smartId, mobileId, eParakstsMobile,
} from './authenticationModules/authenticationModules';

const createClient = function createClient(settings = {}) {
  return createClientCore({
    settings,
    authenticationModules: [
      idCard,
      smartId,
      mobileId,
      eParakstsMobile,
    ],
  });
};

// export the whole authenticator with all the modules included
// this will be used for the "script tag include" build
export default createClient;
