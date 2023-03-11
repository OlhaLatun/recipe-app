import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const SIGN_IN_URL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAqQ3PoUYc1vP4TofpGUsuf1D5C6ozM2R0';
const REGISTER_URL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAqQ3PoUYc1vP4TofpGUsuf1D5C6ozM2R0';

interface SignInResponseData {
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: string;
  refreshToken: string;
  expiresIn: string;
}

interface SignUpResponseData {
  localId: string;
  email: string;
  idToken: string;
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

    return this.http.post<SignInResponseData>(SIGN_IN_URL, body);
  }
  register(email: string, password: string) {
    const body = {
      email,
      password,
      returnSecureToken: true,
    };

    return this.http.post<SignUpResponseData>(REGISTER_URL, body);
  }
}
