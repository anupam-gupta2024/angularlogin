import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProtectedService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUserData() {
    return this.http.get<any>(this.baseUrl + '/User/GetUserData');
  }

  getAllUser() {
    return this.http.get<any>(this.baseUrl + '/User/GetAllUser');
  }
}
