import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Online } from './online.model';
import { environment }  from '../../environments/environment';

@Injectable()
export class onlineService {
  selectedOnlineDriver: Online;
  onlines: Online[] = [];
  
  constructor(private http: HttpClient) { }


  postOnlineDriver(ond: Online) {
    return this.http.post(environment.apiBaseUrlOrder+'/createOnlineState', ond);
  }

  getOnlineDriverList() {
    return this.http.get(environment.apiBaseUrlOrder+'/seeOnlineDrivers');
  }

  putOnlineDriver(ond: Online) {
    return this.http.put(environment.apiBaseUrlOrder+'/updateOnlineState'+ `/${ond.online_driver_id}`, ond);
  }

  deleteOnlineDriver(online_driver_id: string) {
    return this.http.delete(environment.apiBaseUrlOrder+'/removeOnlineState'+ `/${online_driver_id}`);
  }
}
