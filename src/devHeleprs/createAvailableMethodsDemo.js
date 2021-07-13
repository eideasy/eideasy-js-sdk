function createAvailableMethodsDemo({
  easyClient,
  dom,
}) {
  dom.buttonFetch.addEventListener('click', async (e) => {
    e.preventDefault();
    const result = await easyClient.getAvailableMethods();
    console.log(result);
  });
}

export default createAvailableMethodsDemo;
