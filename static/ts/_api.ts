import { Observable, throwError } from 'rxjs';
import { ajax, AjaxError, AjaxResponse } from 'rxjs/ajax';
import { User } from './_user';
import { catchError, map } from 'rxjs/operators';

export class Api {
  // private static property to store singleton instance
  private static _instance: Api;

  /**
   * Create new instance
   * @private
   */
  private constructor() {
  }

  /**
   * Method returns new singleton instance
   */
  static instance(): Api {
    if (!(Api._instance instanceof Api)) {
      Api._instance = new Api();
    }

    return Api._instance;
  }

  /**
   * Function to log in an user by username/password
   *
   * @param {string} username of the user who wants to log in
   * @param {string} password of the user who wants to log in
   */
  login(username: string, password: string): Observable<User> {
    return ajax({
      url: '/api/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        username,
        password,
      },
    }).pipe(
      map((resp: AjaxResponse) => new User(resp.response)),
    );
  }

  /**
   * Function to return logged-in user
   */
  loggedIn(): Observable<User> {
    return ajax({
      url: '/api/logged-in',
      method: 'GET',
    }).pipe(
      map((resp: AjaxResponse) => new User(resp.response)),
    );
  }

  /**
   * Function to patch user value
   *
   * @param {string} userId unique identifier of the user
   * @param {any} partial user object to patch it
   *
   * @return {Observable<User>} the new instance of the user with the patched value
   */
  patchUser(userId: string, partial: any): Observable<User> {
    return ajax({
      url: `/api/users/${userId}`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: partial,
    }).pipe(
      map((resp: AjaxResponse) => new User(resp.response)),
    );
  }

  /**
   * Function to patch session value
   *
   * @param {any} partial session object to patch it
   */
  patchSession(partial: { key: string, value: any }): Observable<void> {
    return ajax({
      url: `/api/set-session-data`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: partial,
    }).pipe(
      map((resp: AjaxResponse) => resp.response),
    );
  }

  /**
   * Function to clear session value
   *
   * @param {any} partial session key to clear it
   */
  clearSession(partial: { key: string }): Observable<void> {
    return ajax({
      url: `/api/clear-session-data`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: partial,
    }).pipe(
      map((resp: AjaxResponse) => resp.response),
    );
  }
}

// create singleton instance
const api: Api = Api.instance();

// export it
export { api };