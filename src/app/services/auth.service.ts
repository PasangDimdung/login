import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(credentials) {
    return this.http.post('/api/authenticate',
          JSON.stringify(credentials))
          .pipe(
            map(response => {
              if (response && response['token']) {
                localStorage.setItem('token', response['token']);
                return true;
              }
              return false;
            })
          );
  }

  logout() { 
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');

    if(!token)
      return false;

    let expirationDate= jwtHelper.getTokenExpirationDate(token);
    let isExpired = jwtHelper.isTokenExpired(token);

    return !isExpired;
  }

  get currentUser(){
    let token = localStorage.getItem('token')
    if(!token) return false;

    return new JwtHelperService().decodeToken(token);
  }
}

