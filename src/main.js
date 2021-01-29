import 'whatwg-fetch';
import fetchGet from './fetchGet';
import fetchPost from './fetchPost';
import apiEndpoints from './apiEndpoints';

class IDCardAuth {
  constructor(settings) {
    this.mode = 'production';
    if (settings.sandbox) {
      this.mode = 'sandbox';
    }

    this.cardCountryCode = settings.cardCountryCode || null;
    this.clientId = settings.clientId || null;
    this.nonce = settings.nonce || null;
    this.onAuthorize = settings.onAuthorize;
    this.onSuccess = settings.onSuccess;
    this.apiEndpoints = apiEndpoints[this.mode];
    this.cardUrl = this.apiEndpoints.card(this.cardCountryCode);
    this.localApiEndpoint = settings.localApiEndpoint;
  }

  async startAuth() {
    let fetchUrl = `${this.cardUrl}/api/identity/${this.clientId}/read-card`;
    if (this.nonce) {
      fetchUrl += `?nonce=${this.nonce}`;
    }
    return fetchGet(fetchUrl, { credentials: 'include' });
  }

  async completeAuth(data) {
    const fetchUrl = this.localApiEndpoint;
    return fetchPost(fetchUrl, {
      token: data.token,
      lang: 'et',
      country: this.cardCountryCode,
      method: 'ee-id-login',
    });
  }

  async start() {
    const authStartResult = await this.startAuth();
    return this.completeAuth(authStartResult);
  }
}

export default IDCardAuth;
