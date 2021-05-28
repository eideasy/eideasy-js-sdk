import createApiClient from '../apiClient/createApiClient';
import createIdCard from './createIdCard';
import createSmartId from './createSmartId';
import createMobileId from './createMobileId';
import createEParakstsMobile from './createEParakstsMobile';

const idCard = function idCard(coreContext) {
  return createIdCard({
    apiClient: createApiClient(),
    coreContext,
  });
};

const smartId = function smartId(coreContext) {
  return createSmartId({
    apiClient: createApiClient(),
    coreContext,
  });
};

const mobileId = function mobileId(coreContext) {
  return createMobileId({
    apiClient: createApiClient(),
    coreContext,
  });
};

// Latvian mobile ID just redirects and doesn't need the apiClient
const eParakstsMobile = function eParakstsMobile(coreContext) {
  return createEParakstsMobile({
    coreContext,
  });
};

export {
  idCard, smartId, mobileId, eParakstsMobile,
};
