import logResult from './logResult';

function getSettings(settingsElement) {
  const settings = {};
  const checkboxes = settingsElement.querySelectorAll('input[type="checkbox"]');
  for (const checkbox of checkboxes) {
    settings[checkbox.name] = checkbox.checked;
  }
  const radios = settingsElement.querySelectorAll('input[type="radio"]');
  for (const radio of radios) {
    if (radio.checked && settings[radio.name] === undefined) {
      settings[radio.name] = radio.value;
    }
  }
  return settings;
}

function createEParakstsMobileDemo({
  easyClient,
  dom,
  errorHandler,
}) {
  dom.buttonStart.addEventListener('click', async (e) => {
    e.preventDefault();
    errorHandler.hide();
    const settings = getSettings(dom.settingsElement);
    console.log(settings);
    const config = {
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
    };

    if (settings.customInsteadOfRedirect === 'error') {
      config.insteadOfRedirect = () => ({
        data: 'Some data',
        error: new Error('A mock error'),
      });
    } else if (settings.customInsteadOfRedirect === 'data') {
      config.insteadOfRedirect = () => new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: 'Some data',
          });
        }, 1000);
      });
    } else if (settings.customInsteadOfRedirect === 'abort') {
      config.insteadOfRedirect = (context) => {
        console.log(context);
        // you can do the redirect here yourself should you wish so
        // window.location.href = context.redirectUrl;
        return {
          data: 'cancel',
        };
      };
    }

    easyClient.identification.eParakstsMobile.start(config);
  });
}

export default createEParakstsMobileDemo;
