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

  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshOrderList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.orderService.selectedOrder = {
      order_id: "",
      pick_location: "",
      drop_location: "",
      pick_time: "",
      drop_time: "",
      response: "",
      u_id: "",
      d_id:""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.order_id == "") {
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

  
  onEdit(ord: Order) {
    this.orderService.selectedOrder = ord;
  }

  onDelete(order_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.orderService.deleteOrder(order_id).subscribe((res:any) => {
        this.refreshOrderList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

 //****************************************** 

  Pending(form: NgForm){
    this.resetForm(form);
    this.refreshPendingOrderList()
  }

  refreshPendingOrderList() {
    this.orderService.getPendingOrderList().subscribe((res:any) => {
      console.log(res)
      this.orderService.orders = res.rows as Order[];
      
    });
  }


  Confirm(form: NgForm){
    this.resetForm(form);
    this.refreshConfirmOrderList()
  }

  refreshConfirmOrderList() {
    this.orderService.getConfirmOrderList().subscribe((res:any) => {
      console.log(res)
      this.orderService.orders = res.rows as Order[];
      
    });
  }

  Complete(form: NgForm){
    this.resetForm(form);
    this.refreshCompleteOrderList()
  }

  refreshCompleteOrderList() {
    this.orderService.getCompleteOrderList().subscribe((res:any) => {
      console.log(res)
      this.orderService.orders = res.rows as Order[];
      
    });
  }


  Reject(form: NgForm){
    this.resetForm(form);
    this.refreshRejectOrderList()
  }

  refreshRejectOrderList() {
    this.orderService.getRejectOrderList().subscribe((res:any) => {
      console.log(res)
      this.orderService.orders = res.rows as Order[];
      
    });
  }

}


