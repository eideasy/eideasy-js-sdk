import fetchGet from './fetchGet';
import fetchPost from './fetchPost';

const EID_API_URL = 'https://test.eideasy.com';

const CARD_URLS = {
  EE: 'https://ee.eideasy.com',
};

function getCardUrl(code) {
  return CARD_URLS[code];
}

class IDCardAuth {
  constructor(settings) {
    this.cardCountryCode = settings.cardCountryCode || null;
    this.clientId = settings.clientId || null;
    this.nonce = settings.nonce || null;
    this.onAuthorize = settings.onAuthorize;
    this.onSuccess = settings.onSuccess;
    this.cardUrl = getCardUrl(this.cardCountryCode);
  }

  async startAuth() {
    let fetchUrl = `${this.cardUrl}/api/identity/${this.clientId}/read-card`;
    if (this.nonce) {
      fetchUrl += `?nonce=${this.nonce}`;
    }
    return fetchGet(fetchUrl, { credentials: 'include' });
  }

  async authorize(data) {
    return this.onAuthorize({ token: data.token });
  }

  async completeAuth(data) {
    const fetchUrl = `${EID_API_URL}/api/v2/identity/${this.clientId}/complete`;
    return fetchPost(fetchUrl, {
      payload: data.payload,
      hmac: data.hmac,
    });
  }

  async start() {
    const authStartResult = await this.startAuth();
    const authorizationResult = await this.authorize(authStartResult);
    return this.completeAuth(authorizationResult);
  }
}

export default IDCardAuth;
