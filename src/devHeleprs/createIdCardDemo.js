import logResult from './logResult';

function createIdCardDemo({ authenticator }) {
  const idAuthButton = document.getElementById('authWithIDCard');
  const cancelIDCardButton = document.getElementById('cancelIDCard');
  let authInstance;
  idAuthButton.addEventListener('click', async (e) => {
    e.preventDefault();
    authInstance = authenticator.idCard.authenticate({
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

  cancelIDCardButton.addEventListener('click', async (e) => {
    e.preventDefault();
    authInstance.cancel();
  });
}

export default createIdCardDemo;
