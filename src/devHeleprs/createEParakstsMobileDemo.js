import logResult from './logResult';

function createEParakstsMobileDemo({
  authenticator,
  country,
  dom,
}) {
  dom.buttonStart.addEventListener('click', async (e) => {
    e.preventDefault();
    authenticator.eParakstsMobile.authenticate({
      countryCode: country,
      fail: (result) => {
        logResult(result, 'fail');
      },
      success: (result) => {
        logResult(result, 'success');
      },
      finished: (result) => {
        logResult(result, 'finished');
      },
    });
  });
}

export default createEParakstsMobileDemo;
