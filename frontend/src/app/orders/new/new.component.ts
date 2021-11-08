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

  public all:string;
  public complete:string;
  public confirm:string;
  public pending:string;
  public reject:string;

  Orders: Order[];
  searchValue: string

  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshOrderList();

    this.refreshAllList()
    this.refreshCompleteList();
    this.refreshConfirmList();
    this.refreshRejectList();
    this.refreshPendingList();
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
      this.Orders = res.body;
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
      })
    }
  }
//******************************************************** */

  refreshAllList() {
    this.orderService.allCount().subscribe((res: any) => {
      this.all = res.body as string;
    });
  }

  refreshCompleteList() {
    this.orderService.completeCount().subscribe((res: any) => {
      this.complete = res.body as string;
    });
  }

  refreshConfirmList() {
    this.orderService.confirmCount().subscribe((res: any) => {
      this.confirm = res.body as string;
    });
  }

  refreshPendingList() {
    this.orderService.pendingCount().subscribe((res: any) => {
      this.pending = res.body as string;
    });
  }

  refreshRejectList() {
    this.orderService.rejectCount().subscribe((res: any) => {
      this.reject = res.body as string;
    });
  }

}


