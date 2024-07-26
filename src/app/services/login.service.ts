import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequestModel } from '../models/loginRequestModel';
import { environment } from '../../environments/environment';
import { LoginResponseModel } from '../models/loginResponseModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  login(model: LoginRequestModel) {
    return this.http.post<LoginResponseModel>(this.baseUrl + '/Login', model);
  }
}
