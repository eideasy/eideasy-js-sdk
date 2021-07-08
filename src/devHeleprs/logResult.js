function logResult(result, tag) {
  if (tag) {
    console.log(`----- ${tag} -----`);
  }
  if (result && result.error) {
    console.error(result.error);
  }
  console.log(result);
}

export default logResult;
