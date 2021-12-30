import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Order } from '../interface/order.model';
import { environment }  from '../../environments/environment';

@Injectable()
export class OrderService {
  
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

  insertResponse(order: Order, response: any) {
    return this.http.put(environment.apiBaseUrlOrder+'/insertResponse'+ `/${order.id}/${response}`, order);
  }




  allCount() {
    return this.http.get(environment.apiBaseUrlOrder+'/allCount');
  }

  completeCount() {
    return this.http.get(environment.apiBaseUrlOrder+'/completeCount');
  }

  confirmCount() {
    return this.http.get(environment.apiBaseUrlOrder+'/confirmCount');
  }

  pendingCount() {
    return this.http.get(environment.apiBaseUrlOrder+'/pendingCount');
  }

  rejectCount() {
    return this.http.get(environment.apiBaseUrlOrder+'/rejectCount');
  }


}
