import IDCard from './main';
import fetchPost from './fetchPost';

const IDCardInstance = new IDCard({
  cardCountryCode: 'EE',
  clientId: '2IaeiZXbcKzlP1KvjZH9ghty2IJKM8Lg',
  onAuthorize: async (data) => {
    const result = await fetchPost('https://demo.eideasy.com/api/js-sdk/authorize', {
      operation: 'login-complete',
      data: {
        method: 'ee-id-login',
        token: data.token,
        lang: 'et',
      },
    });

    return result;
  },
  onSuccess: (data) => {
    console.log(data);
  },
  onFail: (data) => {
    console.log('fail');
  },
});

const idAuthButton = document.getElementById('authWithIDCard');
idAuthButton.addEventListener('click', (e) => {
  e.preventDefault();
  IDCardInstance.start();
});
