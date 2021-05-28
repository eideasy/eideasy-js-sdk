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
}) {
  dom.buttonStart.addEventListener('click', async (e) => {
    e.preventDefault();
    const settings = getSettings(dom.settingsElement);
    console.log(settings);
    const config = {
      fail: (result) => {
        logResult(result, 'fail');
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
      config.insteadOfRedirect = () => ({
        data: 'Some data',
      });
    } else if (settings.customInsteadOfRedirect === 'abort') {
      config.insteadOfRedirect = (context) => {
        console.log(context);
        // you can do the redirect here yourself should you wish so
        // window.location.href = context.redirectUrl;
        return false;
      };
    }

    easyClient.authentication.eParakstsMobile.authenticate(config);
  });
}

export default createEParakstsMobileDemo;
