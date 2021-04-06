import logResult from './logResult';
import createLoader from './createLoader';

function createSmartIdDemo({
  authenticator,
  country,
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
    const formData = new FormData(e.target);
    loader.style.display = 'block';
    authInstance = authenticator.smartId.authenticate({
      countryCode: country,
      idcode: formData.get('idcode'),
      started: (result) => {
        logResult(result, 'started');
        challengeElem.textContent = result.data.challenge;
        challengeElem.style.display = 'block';
      },
      fail: (result) => {
        logResult(result, 'fail');
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

export default createSmartIdDemo;
