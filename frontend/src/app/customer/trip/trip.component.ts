import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Order } from '../../shared/order.model';
import { OrderService } from '../../shared/order.service';

declare var M: any;

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css'],
  providers: [OrderService]
})
export class TripComponent implements OnInit {

  constructor(public  OrderService:  OrderService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshOrderList();
  }


  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.OrderService.selectedOrder = {
      order_id: "",
      pick_location: "",
      drop_location: "",
      pick_time: "",
      drop_time: "",
      response: "",
      c_id: "",
      d_id:""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.order_id == "") {
      this.OrderService.postOrder(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshOrderList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.OrderService.putOrder(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshOrderList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }
  
  refreshOrderList() {
    this.OrderService.getOrderList().subscribe((res:any) => {
      console.log(res)
      this.OrderService.orders = res.rows as Order[];
      
    });
  }

  
  onEdit(ord: Order) {
    this.OrderService.selectedOrder = ord;
  }

  onDelete(order_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.OrderService.deleteOrder(order_id).subscribe((res:any) => {
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
    this.OrderService.getPendingOrderList().subscribe((res:any) => {
      console.log(res)
      this.OrderService.orders = res.rows as Order[];
      
    });
  }


  Confirm(form: NgForm){
    this.resetForm(form);
    this.refreshConfirmOrderList()
  }

  refreshConfirmOrderList() {
    this.OrderService.getConfirmOrderList().subscribe((res:any) => {
      console.log(res)
      this.OrderService.orders = res.rows as Order[];
      
    });
  }

  Complete(form: NgForm){
    this.resetForm(form);
    this.refreshCompleteOrderList()
  }

  refreshCompleteOrderList() {
    this.OrderService.getCompleteOrderList().subscribe((res:any) => {
      console.log(res)
      this.OrderService.orders = res.rows as Order[];
      
    });
  }


  Reject(form: NgForm){
    this.resetForm(form);
    this.refreshRejectOrderList()
  }

  refreshRejectOrderList() {
    this.OrderService.getRejectOrderList().subscribe((res:any) => {
      console.log(res)
      this.OrderService.orders = res.rows as Order[];
      
    });
  }
}
