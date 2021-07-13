import logResult from './logResult';

function createIdCardDemo({
  easyClient,
  country,
  dom,
  errorHandler,
}) {
  let authInstance;
  dom.buttonStart.addEventListener('click', async (e) => {
    e.preventDefault();
    errorHandler.hide();
    authInstance = easyClient.identification.idCard.start({
      countryCode: country,
      fail: (result) => {
        logResult(result, 'fail');
        errorHandler.show(result);
      },
      success: (result) => {
        logResult(result, 'success');
      },
      finished: (result) => {
        logResult(result, 'finished');
      },
    });
  });

  dom.buttonCancel.addEventListener('click', async (e) => {
    e.preventDefault();
    authInstance.cancel();
  });
}

export default createIdCardDemo;
