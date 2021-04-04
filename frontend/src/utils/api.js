import { baseUri, headers } from './constants.js';

const SIGNIN_URL ='/signin';
const SIGNUP_URL ='/signup';
const SIGNOUT_URL ='/signout';
const CARDS_URL ='/cards/';
const USER_INFO_URL = '/users/me/';
const AVATAR_URL = USER_INFO_URL + 'avatar/';

/**
 * Класс для работы с API.
 */
export default class Api {
  constructor({ baseUri, headers }) {
    this._baseUri = baseUri;
    this._headers = headers;
  }
  
  /**
   * Залогиниться на сервере
   * 
   * @param {Object} data учётные данные пользователя.
   * @returns {Promise} Результат запроса.
   */
  signIn(data) {
    return this
      ._sendJson(SIGNIN_URL, 'POST', this._headers, JSON.stringify(data));
  }

  /**
   * Зарегестрировать нового пользователя
   * 
   * @param {Object} data учётные данные пользователя.
   * @returns {Promise} Результат запроса.
   */
  signUp(data) {
    return this
      ._sendJson(SIGNUP_URL, 'POST', this._headers, JSON.stringify(data));
  }

  /**
   * Разлогиниться на сервере
   * 
   * @returns {Promise} Результат запроса.
   */
  signOut() {
    return this
      ._sendJson(SIGNOUT_URL, 'GET', this._headers);
  }

  /**
   * Получить текущего пользователя
   * 
   * @returns {Promise} Результат запроса.
   */
  getMe() {
  return this
    ._sendJson('/users/me', 'GET', this._headers);
  }

  /**
   * Добавить карточку.
   * 
   * @param {Object} cardData Данные карточки.
   * @returns {Promise} Результат запроса.
   */
  addCard(cardData) {
    const headers = { ...this._headers, 'Content-Type': 'application/json' };

    return this
      ._sendJson(CARDS_URL, 'POST', headers, JSON.stringify(cardData));
  }

  /**
   * 
   * @param {string} cardId Id карточки.
   * @returns {Promise} Результат запроса.
   */
  deleteCard(cardId) {
    return this
      ._sendJson(CARDS_URL + cardId, 'DELETE', this._headers);
  }

  /**
   * Получить карточки с сервера.
   * 
   * @param {HTMLElement} контейнер с карточками.
   * @returns {Promise} Результат запроса.
   */
  getCards() {
    return this
      ._sendJson(CARDS_URL, 'GET', this._headers);
  }

  /**
   * Получить информацию о текущем пользователе.
   * 
   * @returns {Promise} Результат запроса.
   */
  getUserInfo() {
    return this
      ._sendJson(USER_INFO_URL, 'GET', this._headers);
  }

  /**
   * Обновить аватар.
   * 
   * @param {Object} avatar Данные аватара.
   * @returns {Promise} Результат запроса.
   */
  setAvatar(avatar) {
    const headers = { ...this._headers, 'Content-Type': 'application/json' };

    return this
      ._sendJson(AVATAR_URL, 'PATCH', headers, JSON.stringify(avatar));
  }

  /**
   * Обновить информацию о текущем пользователе.
   * 
   * @returns {Promise} Результат запроса.
   */
  setUserInfo(userInfo) {
    const headers = { ...this._headers, 'Content-Type': 'application/json' };

    return this
      ._sendJson(USER_INFO_URL, 'PATCH', headers, JSON.stringify(userInfo));
  }

  /**
   * Поставить лайк карточке
   * 
   * @param {string} cardId Id карточки.
   * @returns {Promise} Результат запроса.
   */
  like(cardId) {
    return this
      ._sendJson(CARDS_URL + cardId + '/likes', 'PUT', this._headers);
  }

  /**
   * Убрать лайк у карточки.
   * 
   * @param {string} cardId Id карточки.
   * @returns {Promise} Результат запроса.
   */
  unlike(cardId) {
    return this
      ._sendJson(CARDS_URL + cardId + '/likes', 'DELETE', this._headers);
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

export const api = new Api({ baseUri: baseUri, headers });