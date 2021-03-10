import logResult from './logResult';

function createMobileIdDemo({ authenticator }) {
  const mobileIdForm = document.getElementById('authWithMobileId');
  const cancelButton = document.getElementById('cancelMobileId');
  let authInstance;
  const loader2 = document.createElement('div');
  loader2.textContent = 'Loading...';
  loader2.style.display = 'none';
  mobileIdForm.prepend(loader2);

  const challengeElem2 = document.createElement('div');
  challengeElem2.style.display = 'none';
  mobileIdForm.prepend(challengeElem2);

  mobileIdForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    loader2.style.display = 'block';
    authInstance = authenticator.mobileId.authenticate({
      idcode: formData.get('idcode_mobile'),
      phone: formData.get('phone'),
      countryCode: formData.get('countryCode'),
      started: (result) => {
        logResult(result, 'started');
        challengeElem2.textContent = result.data.challenge;
        challengeElem2.style.display = 'block';
      },
      fail: (result) => {
        logResult(result, 'fail');
      },
      success: (result) => {
        logResult(result, 'success');
      },
      finished: (result) => {
        logResult(result, 'finished');
        loader2.style.display = 'none';
        challengeElem2.style.display = 'none';
      },
    });
  });

  cancelButton.addEventListener('click', async (e) => {
    e.preventDefault();
    authInstance.cancel();
  });
}

export default createMobileIdDemo;
