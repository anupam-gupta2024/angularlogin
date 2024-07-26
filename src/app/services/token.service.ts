import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RefreshTokenRequest } from '../models/referesh-token-request';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = environment.baseUrl + '/Login';

  generateRefreshToken(data: RefreshTokenRequest) {
    const url = this.baseUrl + '/refresh';
    return this.http.post<RefreshTokenRequest>(url, data);
  }

  // not used currently
  // revokeRefreshToken() {
  //   const url = this.baseUrl + '/evoke';
  //   return this.http.post(url, null);
  // }
}
