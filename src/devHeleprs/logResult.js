function logResult(result, tag) {
  if (tag) {
    console.log(`----- ${tag} -----`);
  }
  if (tag === 'fail') {
    console.error(result);
    if (result.response) {
      console.error(result.response);
    }
    if (result.userMessage) {
      console.error(result.userMessage);
    }
  }
  console.log(result);
}

export default logResult;
