import createStep from '../createStep';
import createModuleCreator from '../createModuleCreator';
import { Cancel } from '../request';
import { moduleNames } from '../config';

const MODULE_NAME = moduleNames.eParakstsMobile;

const redirect = function redirect(redirectUrl) {
  window.location.href = redirectUrl;
  // we're returning false here so that we know later
  // that redirect has been initiated.
  return false;
};

const executable = async function executable(config) {
  const {
    insteadOfRedirect,
  } = config;

  const redirectUrl = config.apiEndpoints.inCurrentMode.eParakstsMobile({
    clientId: config.clientId,
    appUrl: config.appUrl,
  });

  let result;

  if (insteadOfRedirect) {
    result = await createStep(insteadOfRedirect)(config);
  } else {
    result = await createStep(redirect)(redirectUrl);
  }

  if (result.data === 'cancel') {
    throw new Cancel();
  }

  return result;
};

const createEParakstsMobile = createModuleCreator(MODULE_NAME, executable);
export default createEParakstsMobile;
