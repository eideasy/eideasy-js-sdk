import fetchGet from './fetchGet';
import fetchPost from './fetchPost';

const CARD_URLS = {
  EE: 'https://ee.eideasy.com',
};

function getCardUrl(code) {
  return CARD_URLS[code];
}

class IDCard {
  constructor(settings) {
    this.cardCountryCode = settings.cardCountryCode || null;
    this.clientId = settings.clientId || null;
    this.nonce = settings.nonce || null;
    this.onAuthorize = settings.onAuthorize;
    this.onSuccess = settings.onSuccess;
    this.cardUrl = getCardUrl(this.cardCountryCode);
  }

  async idCardLoginStart() {
    let fetchUrl = `${this.cardUrl}/api/identity/${this.clientId}/read-card`;
    if (this.nonce) {
      fetchUrl += `?nonce=${this.nonce}`;
    }
    const loginStartResult = await fetchGet(fetchUrl);
    const authorizationResult = await this.onAuthorize({ token: loginStartResult.token });

    console.log(authorizationResult);
    const loginCompleteResult = await fetchPost(`${this.cardUrl}/api/identity/${this.clientId}/complete`, {
      payload: authorizationResult.payload,
      hmac: authorizationResult.hmac,
    });

    console.log(loginCompleteResult);
  }

  start() {
    this.idCardLoginStart();
    console.log('start');
  }
}

export default IDCard;
