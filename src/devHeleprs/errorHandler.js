/* eslint-disable no-param-reassign */
function createErrorHandler(errorContainer) {
  function show(error) {
    errorContainer.innerHTML = error.toString();
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
