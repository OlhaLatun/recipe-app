import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const SIGN_IN_URL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAqQ3PoUYc1vP4TofpGUsuf1D5C6ozM2R0';
const REGISTER_URL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAqQ3PoUYc1vP4TofpGUsuf1D5C6ozM2R0';

export interface AuthResponseData {
  localId: string;
  email: string;
  displayName?: string;
  idToken: string;
  registered?: string;
  refreshToken: string;
  expiresIn: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(email: string, password: string) {
    const body = {
      email,
      password,
      returnSecureToken: true,
    };

    return this.http
      .post<AuthResponseData>(SIGN_IN_URL, body)
      .pipe(catchError(this.handleError));
  }
  register(email: string, password: string) {
    const body = {
      email,
      password,
      returnSecureToken: true,
    };

    return this.http
      .post<AuthResponseData>(REGISTER_URL, body)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let message = 'An error occured';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(message);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        message = 'The email already exists';
        break;
      case 'INVALID_PASSWORD':
        message = 'The password is wrong';
        break;
      case 'EMAIL_NOT_FOUND':
        message = 'This email does not exist';
        break;
    }
    return throwError(message);
  }
}
