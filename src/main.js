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
    return fetchGet(fetchUrl);
  }

  async authorize(data) {
    return this.onAuthorize({ token: data.token });
  }

  async completeLogin(data) {
    const fetchUrl = `${this.cardUrl}/api/identity/${this.clientId}/complete`;
    return fetchPost(fetchUrl, {
      payload: data.payload,
      hmac: data.hmac,
    });
  }

  async start() {
    const loginStartResult = await this.idCardLoginStart();
    const authorizationResult = await this.authorize(loginStartResult);
    console.log(authorizationResult);

    const loginCompleteResult = await this.completeLogin(authorizationResult);

    console.log('start');
  }
}

export default IDCard;
