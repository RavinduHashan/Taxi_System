import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Driver } from '../interface/driver.model';
import { environment }  from '../../environments/environment';

@Injectable()
export class DriverService {

  constructor(private http: HttpClient) { }

  postDriver(dri:Driver) {
    return this.http.post(environment.apiBaseUrlDriver+'/register', dri);
  }

  getDriverList() {
    return this.http.get(environment.apiBaseUrlDriver+`/get`);
  }

  getDriverById(id:string) {
    return this.http.get(`${environment.apiBaseUrlDriver}/${id}`);
  }

  putDriver(driver: Driver) {
    return this.http.put(environment.apiBaseUrlDriver+'/update'+ `/${driver.id}`, driver);
  }

  deleteDriver(id: string) {
    return this.http.delete(environment.apiBaseUrlDriver+'/delete'+ `/${id}`);
  }

  getAvailableDriverList() {
    return this.http.get(environment.apiBaseUrlOrder+'/getAvailableDrivers');
  }

  updateAvailableStateList(driver: Driver) {
    return this.http.put(environment.apiBaseUrlOrder+'/updateAvailableState' + `/${driver.id}`, driver);
  }

  insertAvailability(driver: Driver, available:any) {
    return this.http.put(environment.apiBaseUrlOrder+'/insertAvailability' + `/${driver.id}/${available}`, driver);
  }

  insertVerification(driver: Driver, verification: any) {
    return this.http.put(environment.apiBaseUrlDriver+'/insertVerification'+ `/${driver.id}/${verification}`, driver);
  }
}
