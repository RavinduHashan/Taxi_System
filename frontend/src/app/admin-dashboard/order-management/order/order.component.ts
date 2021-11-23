import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

import { Order } from '../../../interface/order.model';
import { OrderService } from '../../../service/order.service';

declare var M: any;

@Component({
  selector: 'app-new',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [OrderService]
})
export class OrderComponent implements OnInit {
  public name = '';
  public page = 1;
  public pageSize = 10;

  public all: any;
  public allCount:number = 0;
  public completeCount: string = "0";
  public confirmCount: string = "0";
  public pendingCount: string = "0";
  public rejectCount: string = "0";

  orders: Order[];
  order:Order;
  searchValue: string

  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
    this.refreshOrderList();
    this.refreshAllList();
    this.resetForm();

  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.order = {
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

  refreshOrderList() {
    this.orderService.searchOrderList(this.name).subscribe((res: any) => {
      this.orders = res.body;
    });
  }

  Response(response: any) {
    this.orderService.getOrderByResponse(response).subscribe((res: any) => {
      this.orders = res.body as Order[];
    });
  }

  onDelete(id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.orderService.deleteOrder(id).subscribe((res: any) => {
        this.refreshOrderList();
        this.refreshAllList()
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      })
    }

  }

  refreshAllList() {
    this.orderService.allCount().subscribe((res: any) => {
      this.all = res.body as object[];

      this.all.forEach((item: { response: string; count: string; }) => {
        if (item.response == "Complete") {
          this.completeCount = item.count
        }
        if (item.response == "Confirm") {
          this.confirmCount = item.count
        }
        if (item.response == "Pending") {
          this.pendingCount = item.count
        }
        if (item.response == "Reject") {
          this.rejectCount = item.count
        }
        if(true){
          this.allCount = parseInt(this.completeCount) +parseInt(this.confirmCount) +
          parseInt(this.pendingCount) +parseInt(this.rejectCount)
        }
      });
    });
  }
}


