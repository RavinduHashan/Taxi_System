import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Order } from '../../../interface/order.model';
import { OrderService } from '../../../service/order.service';
import { NewComponent} from '../new/new.component'

declare var M: any;

@Component({
  selector: 'app-edit-orders',
  templateUrl: './editOrders.component.html',
  styleUrls: ['./editOrders.component.css'],
  providers: [OrderService, NewComponent]
})
export class EditOrdersComponent implements OnInit {
  id:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    public orderService: OrderService,
    public newComponent: NewComponent) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.id = params.get('id')
    });
    if (this.id) { this.getOrderData() };
    this.resetForm();
    this.refreshOrderList();
  }
  getOrderData() {
    this.orderService.getOrderById(this.id).subscribe((res: any) => {
      this.orderService.selectedOrder = res.body;
    })
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


  onEdit(ord: Order) {
    this.orderService.selectedOrder = ord;
  }

  onDelete(id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.orderService.deleteOrder(id).subscribe((res:any) => {
        this.refreshOrderList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}


