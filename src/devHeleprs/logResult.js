function logResult(result, tag) {
  if (tag) {
    console.log(`----- ${tag} -----`);
  }
  if (result.error) {
    console.error(result.error);
  }
  console.log(result);
}

export default logResult;
