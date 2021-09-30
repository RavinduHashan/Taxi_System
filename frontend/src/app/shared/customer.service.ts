import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Customer } from './customer.model';
import { environment }  from '../../environments/environment';

@Injectable()
export class CustomerService {
  selectedCustomer: Customer;
  customers: Customer[] = [];
  
  constructor(private http: HttpClient) { }


  postCustomer(cus: Customer) {
    return this.http.post(environment.apiBaseUrlCustomer+'/register', cus);
  }

  getCustomerList() {
    return this.http.get(environment.apiBaseUrlCustomer+'/get');
  }

  putCustomer(cus: Customer) {
    return this.http.put(environment.apiBaseUrlCustomer+'/update'+ `/${cus.customer_id}`, cus);
  }

  deleteCustomer(customer_id: string) {
    return this.http.delete(environment.apiBaseUrlCustomer+'/delete'+ `/${customer_id}`);
  }
}
