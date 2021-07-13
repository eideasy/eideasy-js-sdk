import logResult from './logResult';
import createLoader from './createLoader';

function createMobileIdDemo({
  easyClient,
  country,
  errorHandler,
  dom,
}) {
  const loader = createLoader();
  loader.style.display = 'none';
  dom.form.prepend(loader);

  let authInstance;

  const challengeElem = document.createElement('div');
  challengeElem.style.display = 'none';
  dom.form.prepend(challengeElem);

  dom.form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorHandler.hide();
    const formData = new FormData(e.target);
    loader.style.display = 'block';
    authInstance = easyClient.authentication.mobileId.authenticate({
      countryCode: country,
      idcode: formData.get('idcode_mobile'),
      phone: formData.get('phone'),
      started: (result) => {
        logResult(result, 'started');
        challengeElem.textContent = result.data.challenge;
        challengeElem.style.display = 'block';
      },
      fail: (result) => {
        logResult(result, 'fail');
        errorHandler.show(result);
      },
      success: (result) => {
        logResult(result, 'success');
      },
      finished: (result) => {
        logResult(result, 'finished');
        loader.style.display = 'none';
        challengeElem.style.display = 'none';
      },
    });
  });

  dom.buttonCancel.addEventListener('click', async (e) => {
    e.preventDefault();
    authInstance.cancel();
  });
}

export default createMobileIdDemo;
