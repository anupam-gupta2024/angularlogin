import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { RefreshTokenRequest } from '../models/referesh-token-request';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private tokenService: TokenService) { }

  isLoggedIn() {
    return !!this.getAccessToken() && !this.isTokenExpired();
  }

  addUsername(username: string) {
    localStorage.setItem('username', username);
  }

  addAccessToken(accesstoken: string) {
    localStorage.setItem('accesstoken', accesstoken);
  }

  addRefreshToken(refreshtoken: string) {
    localStorage.setItem('refreshtoken', refreshtoken);
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  getAccessToken() {
    return localStorage.getItem('accesstoken');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshtoken');
  }

  // check expiration of accesstoken
  isTokenExpired() {
    const accesstoken: string = this.getAccessToken() ?? "";
    if (!accesstoken)
      return false;
    const tokenSplit: string = accesstoken.split('.')[1];
    const decodedString: string = atob(tokenSplit);
    const jsonString = JSON.parse(decodedString);
    const expiry = (jsonString).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  logout() {
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('username');
    localStorage.removeItem('givenname');

    this.router.navigate(['./login']);
  }

  getUerRole() {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.getAccessToken() ?? "");
    if (decodedToken) {
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      return role;
    }
    else
      return "";
  }

  // refreshing the access token
  async refreshingToken(): Promise<boolean> {
    const token = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    if (!token || !refreshToken) {
      return false;
    }

    let success!: boolean;
    const data: RefreshTokenRequest = { accessToken: token, refreshToken: refreshToken };
    this.tokenService.generateRefreshToken(data).subscribe({
      next: (response) => {
        this.addAccessToken(response.accessToken);
        this.addRefreshToken(response.refreshToken);
        success = true;
        //console.log("Token is refreshed");
      },
      error: (error) => {
        console.log(error);
        success = false;
      }
    });
    return success;
  }


}
