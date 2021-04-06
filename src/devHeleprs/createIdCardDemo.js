import logResult from './logResult';

function createIdCardDemo({
  authenticator,
  country,
  dom,
}) {
  let authInstance;
  dom.buttonStart.addEventListener('click', async (e) => {
    e.preventDefault();
    authInstance = authenticator.idCard.authenticate({
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

  dom.buttonCancel.addEventListener('click', async (e) => {
    e.preventDefault();
    authInstance.cancel();
  });
}

export default createIdCardDemo;
