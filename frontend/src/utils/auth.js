import { baseUri } from './constants';

/**
 * Класс для работы с API авторизации.
 */
export default class Auth {
  constructor({ baseUri, headers }) {
    this._baseUri = baseUri;
    this._headers = headers;
  }

  signIn(data) {
    return this
      ._sendJson('/signin', 'POST', this._headers, JSON.stringify(data));
  }

  signUp(data) {
    return this
      ._sendJson('/signup', 'POST', this._headers, JSON.stringify(data));
  }

  signOut() {
    return this
      ._sendJson('/signout', 'GET', this._headers);
  }

  getMe() {
  return this
    ._sendJson('/users/me', 'GET', this._headers);
}

  _sendJson(url, method, headers, body) {
    const uri = this._baseUri + url;

    return fetch(uri, { method, headers, body, credentials: 'include' })
      .then(
        (response) => {
          console.debug(`${method} ${uri} status: ${response.status}`);

          if(response.ok) {
            return response.json();
          }
          
          return Promise.reject();
        });
  }
}

export const auth = new Auth(
  {
    baseUri,
    headers: { 'Content-Type': 'application/json' } 
  }
);