import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Order } from './order.model';
import { environment }  from '../../environments/environment';

@Injectable()
export class OrderService {
  selectedOrder: Order;
  orders: Order[] = [];

  constructor(private http: HttpClient) { }


  postOrder(ord:Order) {
    return this.http.post(environment.apiBaseUrlOrder+'/createOrders', ord);
  }

  getOrderList() {
    return this.http.get(environment.apiBaseUrlOrder+'/getOrders');
  }

  getOneOrder(id: any) {
    return this.http.get(environment.apiBaseUrlOrder+`/getOneOrder/${id}`);
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

  putOrder(ord: Order) {
    return this.http.put(environment.apiBaseUrlOrder+'/updateOrders'+ `/${ord.id}`, ord);
  }

  deleteOrder(id: string) {
    return this.http.delete(environment.apiBaseUrlOrder+'/deleteOrders'+ `/${id}`);
  }

  updateResponseList(ord: Order) {
    return this.http.put(environment.apiBaseUrlOrder+'/updateDriverResponse'+ `/${ord.id}`, ord);
  }

  insertConfirm(ord: Order) {
    return this.http.put(environment.apiBaseUrlOrder+'/insertConfirm'+ `/${ord.id}`, ord);
  }

  insertReject(ord: Order) {
    return this.http.put(environment.apiBaseUrlOrder+'/insertReject'+ `/${ord.id}`, ord);
  }

  insertComplete(ord: Order) {
    return this.http.put(environment.apiBaseUrlOrder+'/insertComplete'+ `/${ord.id}`, ord);
  }
}
