import logResult from './logResult';

function createEParakstsMobileDemo({
  easyClient,
  dom,
}) {
  dom.buttonStart.addEventListener('click', async (e) => {
    e.preventDefault();
    easyClient.authentication.eParakstsMobile.authenticate({
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
