import IDCardAuth from './main';

console.log(process.env);

const IDCardAuthInstance = new IDCardAuth({
  sandbox: true,
  cardCountryCode: 'EE',
  clientId: '2IaeiZXbcKzlP1KvjZH9ghty2IJKM8Lg',
  localApiEndpoint: 'http://demo.eideasy.local/api/identity/finish ',
});

const idAuthButton = document.getElementById('authWithIDCard');
idAuthButton.addEventListener('click', async (e) => {
  e.preventDefault();
  const result = await IDCardAuthInstance.start();
  console.log(result);
});
