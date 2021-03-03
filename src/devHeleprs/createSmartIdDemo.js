import logResult from './logResult';

function createSmartIdDemo({ authenticator }) {
  const smartIdForm = document.getElementById('authWithSmartId');
  const loader = document.createElement('div');
  loader.textContent = 'Loading...';
  loader.style.display = 'none';
  smartIdForm.prepend(loader);

  const cancelButton = document.getElementById('cancelSmartId');
  let authInstance;

  const challengeElem = document.createElement('div');
  challengeElem.style.display = 'none';
  smartIdForm.prepend(challengeElem);

  smartIdForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    loader.style.display = 'block';
    authInstance = authenticator.smartId.authenticate({
      idcode: formData.get('idcode'),
      countryCode: formData.get('countryCode'),
      started: (result) => {
        logResult(result, 'started');
        challengeElem.textContent = result.response.data.challenge;
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

  cancelButton.addEventListener('click', async (e) => {
    e.preventDefault();
    authInstance.cancel();
  });
}

export default createSmartIdDemo;
