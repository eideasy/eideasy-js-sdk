/* eslint-disable no-param-reassign */
function createErrorHandler(errorContainer) {
  function show(error) {
    let errorHtml = '';
    if (error.userMessage) {
      errorHtml += `<div>${error.userMessage}</div>`;
    }

    if (error.userDetails) {
      Object.keys(error.userDetails).forEach((key) => {
        errorHtml += `<div>${error.userDetails[key]}</div>`;
      });
    }

    if (!errorHtml) {
      errorHtml += `<div>${error.toString()}</div>`;
    }
    errorContainer.insertAdjacentHTML('beforeend', errorHtml);
    errorContainer.classList.remove('d-none');
  }

  function hide() {
    console.log(errorContainer);
    errorContainer.innerHTML = '';
    errorContainer.classList.add('d-none');
  }

  return {
    show,
    hide,
  };
}

export default createErrorHandler;
