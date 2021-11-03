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


  public name = '';
  public page = 1;
  public pageSize = 10;

  Orders: Order[];
  searchValue: string

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
    this.orderService.searchOrderList(this.name).subscribe((res: any) => {
      this.Orders = res.body as Order[];
    });
  }

  Response(response: any) {
    this.orderService.getOrderByResponse(response).subscribe((res: any) => {
      this.Orders = res.body as Order[];
    });
  }

  onEdit(order: Order) {
    this.orderService.selectedOrder = order;
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
      this.Orders = res.body as Order[];

    });
  }


  Confirm(form: NgForm) {
    this.resetForm(form);
    this.refreshConfirmOrderList()
  }

  refreshConfirmOrderList() {
    this.orderService.getConfirmOrderList().subscribe((res: any) => {
      console.log(res)
      this.Orders = res.body as Order[];

    });
  }

  Complete(form: NgForm) {
    this.resetForm(form);
    this.refreshCompleteOrderList()
  }

  refreshCompleteOrderList() {
    this.orderService.getCompleteOrderList().subscribe((res: any) => {
      console.log(res)
      this.Orders = res.body as Order[];

    });
  }

  Reject(form: NgForm) {
    this.resetForm(form);
    this.refreshRejectOrderList()
  }

  refreshRejectOrderList() {
    this.orderService.getRejectOrderList().subscribe((res: any) => {
      console.log(res)
      this.Orders = res.body as Order[];

    });
  }


}


