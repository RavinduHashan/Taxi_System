import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

import { Order } from './order.model';
import { environment }  from '../../environments/environment';

@Injectable()
export class OrderService {
  selectedOrder: Order;
  orders: Order[] = [];


  constructor(private http: HttpClient) { }

  postOrder(order:Order) {
    return this.http.post(environment.apiBaseUrlOrder+'/createOrders', order);
  }

  getOrderList() {
    return this.http.get(environment.apiBaseUrlOrder+'/getOrders');
  }

  getOrderById(id:any) {
    return this.http.get(`${environment.apiBaseUrlOrder}/${id}`);
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


  getOrderByResponse(value:any) {
    return this.http.get(environment.apiBaseUrlOrder+'/viewOrdersByResponse'+ `/${value}`);
  }

  putOrder(order: Order) {
    return this.http.put(environment.apiBaseUrlOrder+'/updateOrders'+ `/${order.id}`, order);
  }

  deleteOrder(id: string) {
    return this.http.delete(environment.apiBaseUrlOrder+'/deleteOrders'+ `/${id}`);
  }

  updateResponseList(order: Order) {
    return this.http.put(environment.apiBaseUrlOrder+'/updateDriverResponse'+ `/${order.id}`, order);
  }

  insertConfirm(order: Order) {
    return this.http.put(environment.apiBaseUrlOrder+'/insertConfirm'+ `/${order.id}`, order);
  }

  insertReject(order: Order) {
    return this.http.put(environment.apiBaseUrlOrder+'/insertReject'+ `/${order.id}`, order);
  }

  insertComplete(order: Order) {
    return this.http.put(environment.apiBaseUrlOrder+'/insertComplete'+ `/${order.id}`, order);
  }
}
