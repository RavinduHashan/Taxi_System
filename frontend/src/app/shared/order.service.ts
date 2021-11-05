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

  searchOrderList(name:any) {
    return this.http.get(environment.apiBaseUrlOrder+`/searchOrders/?name=${name}`);
  }

  getOrderById(id:any) {
    return this.http.get(`${environment.apiBaseUrlOrder}/${id}`);
  }

  //*******************************
  getOrderByResponse(response:any) {
    return this.http.get(environment.apiBaseUrlOrder+'/viewOrdersByResponse'+ `/${response}`);
  }

  putOrder(order: Order) {
    return this.http.put(environment.apiBaseUrlOrder+'/updateOrders'+ `/${order.id}`, order);
  }

  deleteOrder(id: string) {
    return this.http.delete(environment.apiBaseUrlOrder+'/deleteOrders'+ `/${id}`);
  }

  insertResponse(ord: Order, response: any) {
    return this.http.put(environment.apiBaseUrlOrder+'/insertResponse'+ `/${ord.id}/${response}`, ord);
  }
  
}
