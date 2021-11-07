import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Order } from '../../shared/order.model';
import { OrderService } from '../../shared/order.service';

declare var M: any;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [OrderService]
})
export class HistoryComponent implements OnInit {

  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshOrderList();
  }


  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.orderService.selectedOrder = {
      id: "",
      pick_location: "",
      drop_location: "",
      pick_time: "",
      drop_time: "",
      response: "",
      customer_id: "",
      driver_id:"",
      customer_name:"",
      driver_name: ""
    }
  }

  refreshOrderList() {
    this.orderService.getOrderList().subscribe((res:any) => {
      console.log(res)
      this.orderService.orders = res.body as Order[];

    });
  }
}


