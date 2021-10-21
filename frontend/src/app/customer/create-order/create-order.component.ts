import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Order } from '../../shared/order.model';
import { OrderService } from '../../shared/order.service';

declare var M: any;

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
  providers: [OrderService]
})
export class CreateOrderComponent implements OnInit {

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
  onSubmit(form: NgForm) {
    if (form.value.id == "") {
      this.orderService.postOrder(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshOrderList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.orderService.putOrder(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshOrderList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshOrderList() {
    this.orderService.getOrderList().subscribe((res:any) => {
      console.log(res)
      this.orderService.orders = res.rows as Order[];

    });
  }

}


