function createAvailableMethodsDemo({
  easyClient,
  dom,
}) {
  dom.buttonFetch.addEventListener('click', async (e) => {
    e.preventDefault();
    const result = await easyClient.getAvailableMethods();
    console.log(result);
  });
  dom.buttonFetchAll.addEventListener('click', async (e) => {
    e.preventDefault();
    const result = await easyClient.getAllMethods();
    console.log(result);
  });
}

export default createAvailableMethodsDemo;
