import IDCardAuth from './main';
import fetchPost from './fetchPost';

console.log(process.env);

const IDCardAuthInstance = new IDCardAuth({
  sandbox: true,
  cardCountryCode: 'EE',
  clientId: '2IaeiZXbcKzlP1KvjZH9ghty2IJKM8Lg',
  onAuthorize: async (data) => {
    const result = await fetchPost('http://demo.eideasy.local/api/js-sdk/authorize', {
      operation: 'login-complete',
      data: {
        method: 'ee-id-login',
        token: data.token,
        lang: 'et',
        country: 'EE',
      },
    });
    return result;
  },
});

const idAuthButton = document.getElementById('authWithIDCard');
idAuthButton.addEventListener('click', async (e) => {
  e.preventDefault();
  const result = await IDCardAuthInstance.start();
  console.log(result);
});
