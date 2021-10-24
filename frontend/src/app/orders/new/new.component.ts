import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Order } from '../../shared/order.model';
import { OrderService } from '../../shared/order.service';

declare var M: any;

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
  providers: [OrderService]
})
export class NewComponent implements OnInit {

  value = ""
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
      driver_id: "",
      customer_name: "",
      driver_name: ""
    }
  }

  refreshOrderList() {
    this.orderService.getOrderList().subscribe((res: any) => {
      console.log(res)
      this.orderService.orders = res.body as Order[];

    });
  }


  onEdit(ord: Order) {
    this.orderService.selectedOrder = ord;
  }

  onDelete(id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.orderService.deleteOrder(id).subscribe((res: any) => {
        this.refreshOrderList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

  //******************************************

  Pending(form: NgForm) {
    this.resetForm(form);
    this.refreshPendingOrderList()
  }

  refreshPendingOrderList() {
    this.orderService.getPendingOrderList().subscribe((res: any) => {
      console.log(res)
      this.orderService.orders = res.body as Order[];

    });
  }


  Confirm(form: NgForm) {
    this.resetForm(form);
    this.refreshConfirmOrderList()
  }

  refreshConfirmOrderList() {
    this.orderService.getConfirmOrderList().subscribe((res: any) => {
      console.log(res)
      this.orderService.orders = res.body as Order[];

    });
  }

  Complete(form: NgForm) {
    this.resetForm(form);
    this.refreshCompleteOrderList()
  }

  refreshCompleteOrderList() {
    this.orderService.getCompleteOrderList().subscribe((res: any) => {
      console.log(res)
      this.orderService.orders = res.body as Order[];

    });
  }

  Reject(form: NgForm) {
    this.resetForm(form);
    this.refreshRejectOrderList()
  }

  refreshRejectOrderList() {
    this.orderService.getRejectOrderList().subscribe((res: any) => {
      console.log(res)
      this.orderService.orders = res.body as Order[];

    });
  }


}


