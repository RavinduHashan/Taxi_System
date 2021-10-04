import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Onlinedriver } from './onlinedriver.model';
import { environment }  from '../../environments/environment';

@Injectable()
export class OnlinedirverService {
  selectedOnlinedriver: Onlinedriver;
  onlinedrivers: Onlinedriver[] = [];
  
  constructor(private http: HttpClient) { }


  postOnlinedriver(ond: Onlinedriver) {
    return this.http.post(environment.apiBaseUrlOrder+'/createOnlineState', ond);
  }

  getOnlinedriverList() {
    return this.http.get(environment.apiBaseUrlOrder+'/seeOnlineDrivers');
  }

  putOnlinedriver(ond: Onlinedriver) {
    return this.http.put(environment.apiBaseUrlOrder+'/updateOnlneDrivers'+ `/${ond.online_driver_id}`, ond);
  }

  deleteOnlinedriver(online_driver_id: string) {
    return this.http.delete(environment.apiBaseUrlOrder+'/removeOnlineState'+ `/${online_driver_id}`);
  }
}
