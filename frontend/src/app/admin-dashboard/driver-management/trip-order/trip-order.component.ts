import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Order } from '../../../interface/order.model';
import { OrderService } from '../../../service/order.service';

declare var M: any;

@Component({
  selector: 'app-trip-order',
  templateUrl: './trip-order.component.html',
  styleUrls: ['./trip-order.component.css'],
  providers: [OrderService]
})
export class TripOrderComponent implements OnInit {

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
        serial_number: "",
        pick_location: "",
        drop_location: "",
        distance: "",
        pick_time: "",
        drop_time: "",
        response: "",
        customer_id: "",
        driver_id: "",
        customer_name: "",
        customer_number: "",
        driver_name: "",
        driver_number: "",
        created: "",
        updated: ""
      }
  }

  insertResponse(ord: Order, response: any) {
    this.orderService.insertResponse(ord, response).subscribe((res: any) => {
      this.orderService.orders = res.body as Order[];
      this.refreshOrderList();
    });
  }


  refreshOrderList() {
    this.orderService.getOrderList().subscribe((res:any) => {
      console.log(res)
      this.orderService.orders = res.body as Order[];

    });
  }
}


