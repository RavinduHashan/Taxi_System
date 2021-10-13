import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Driver } from './driver.model';
import { environment }  from '../../environments/environment';

@Injectable()
export class DriverService {
  selectedDriver: Driver;
  drivers: Driver[] = [];
  
  constructor(private http: HttpClient) { }


  postDriver(dri:Driver) {
    return this.http.post(environment.apiBaseUrlDriver+'/register', dri);
  }

  getDriverList() {
    return this.http.get(environment.apiBaseUrlDriver+'/get');
  }

  putDriver(dri: Driver) {
    return this.http.put(environment.apiBaseUrlDriver+'/update'+ `/${dri.id}`, dri);
  }

  deleteDriver(id: string) {
    return this.http.delete(environment.apiBaseUrlDriver+'/delete'+ `/${id}`);
  }

  seeAvailableDriverList() {
    return this.http.get(environment.apiBaseUrlOrder+'/seeAvailableDrivers');
  }
  
  updateAvailableStateList(dri: Driver) {
    return this.http.put(environment.apiBaseUrlOrder+'/updateAvailableState' + `/${dri.id}`, dri);
  }

  update(dri: Driver) {
    return this.http.put(environment.apiBaseUrlOrder+'/updateAvailableState' + `/${dri.id}`, dri);
  }

}
