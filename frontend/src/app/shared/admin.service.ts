import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Admin } from './admin.model';
import { environment }  from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  selectedAdmin: Admin = {
    full_name: '',
    email:'',
    phone_number: '',
    city: '',
    password: ''
  }
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

   //HttpMethods

  postAdmin(admin: Admin){
    return this.http.post(environment.apiBaseUrlAdmin+'/register',admin,this.noAuthHeader);
  }

  login(authCredentials: any) {
    return this.http.post(environment.apiBaseUrlAdmin + '/login', authCredentials,this.noAuthHeader);
  }

  getAdminProfile() {
    return this.http.get(environment.apiBaseUrlAdmin + '/dashboard');
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getAdminPayload() {
    var token = this.getToken();
    if (token) {
      var adminPayload = atob(token.split('.')[1]);
      return JSON.parse(adminPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var adminPayload = this.getAdminPayload();
    if (adminPayload)
      return adminPayload.exp > Date.now() / 1000;
    else
      return false;
  }

}
