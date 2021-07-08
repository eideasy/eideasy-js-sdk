function logResult(result, tag) {
  if (tag) {
    console.log(`----- ${tag} -----`);
  }
  if (tag === 'fail') {
    console.error(result);
    console.error(result.response);
  }
  console.log(result);
}

export default logResult;
