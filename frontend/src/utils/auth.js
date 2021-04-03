
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
      ._sendJson('/signin', 'POST', this._headers, JSON.stringify(data))
      .then((data) => {
        localStorage.setItem('token', data.token);
        return data.token;
      });
  }

  signUp(data) {
    return this
      ._sendJson('/signup', 'POST', this._headers, JSON.stringify(data));
  }

  getMe(token) {
  const headers = { ...this._headers, 'Authorization' : `Bearer ${token}` };

  return this
    ._sendJson('/users/me', 'GET', headers);
}

  _sendJson(url, method, headers, body) {
    const uri = this._baseUri + url;

    return fetch(uri, { method, headers, body })
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
    baseUri: 'https://auth.nomoreparties.co',
    headers: { 'Content-Type': 'application/json' } 
  }
);