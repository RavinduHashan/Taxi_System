import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Torder } from './torder.model';
import { environment }  from '../../environments/environment';

@Injectable()
export class TorderService {
  selectedTorder: Torder;
  torders: Torder[] = [];
  
  constructor(private http: HttpClient) { }


  postOrder(tord:Torder) {
    return this.http.post(environment.apiBaseUrlOrder+'/createOrders', tord);
  }

  getOrderList() {
    return this.http.get(environment.apiBaseUrlOrder+'/getOrders');
  }

  //******************************* 
  getPendingOrderList() {
    return this.http.get(environment.apiBaseUrlOrder+'/viewPendingOrders');
  }

  getConfirmOrderList() {
    return this.http.get(environment.apiBaseUrlOrder+'/viewConfirmOrders');
  }

  getCompleteOrderList() {
    return this.http.get(environment.apiBaseUrlOrder+'/viewCompleteOrders');
  }

  getRejectOrderList() {
    return this.http.get(environment.apiBaseUrlOrder+'/viewRejectOrders');
  }

  putOrder(tord: Torder) {
    return this.http.put(environment.apiBaseUrlOrder+'/updateOrders'+ `/${tord.order_id}`, tord);
  }

  deleteOrder(order_id: string) {
    return this.http.delete(environment.apiBaseUrlOrder+'/deleteOrders'+ `/${order_id}`);
  }
}
