import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000';
  loggedIn!: boolean;

  constructor(private httpClient: HttpClient) {}

  checkLogin() {
    let jsonData = localStorage.getItem('login');
    if (jsonData) {
      return JSON.parse(jsonData);
    }
    return false;
  }
  checkAdmin() {
    let jsonData = localStorage.getItem('login');
    if (jsonData) {
      if (JSON.parse(jsonData).user.role == 1) {
        return JSON.parse(jsonData);
      }
    }
    return false;
  }

  isAuthenticated() {
    const promise = new Promise<boolean>((resolve, reject) => {
      let jsonData = localStorage.getItem('login');
      if (jsonData) {
        this.loggedIn = true;
        resolve(this.loggedIn);
      } else {
        resolve(this.loggedIn);
      }
    });
    return promise;
  }
  isAdmin() {
    const promise = new Promise<boolean>((resolve, reject) => {
      let jsonData = localStorage.getItem('login');
      if (jsonData) {
        if (JSON.parse(jsonData).user.role == 1) {
          this.loggedIn = true;
          resolve(this.loggedIn);
        }
      } else {
        resolve(this.loggedIn);
      }
    });
    return promise;
  }
  register(user: any) {
    return this.httpClient.post(`${this.url}/users`, user);
  }
  login(user: any) {
    return this.httpClient.post(`${this.url}/users/login`, user);
  }
  getToken() {
    let jsonData = localStorage.getItem('login');
    if (jsonData) {
      return JSON.parse(jsonData).accessToken;
    }
    return false;
  }
  getRefeshToken() {
    let jsonData = localStorage.getItem('login');
    if (jsonData) {
      return JSON.parse(jsonData).refreshToken;
    }
    return false;
  }
  refreshToken(refreshToken: any) {
    return this.httpClient.post(
      `${this.url}/users/refresh-token`,
      refreshToken
    );
  }
}
