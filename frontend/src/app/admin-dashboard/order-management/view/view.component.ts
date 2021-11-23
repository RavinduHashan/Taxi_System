import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Order } from '../../../interface/order.model';
import { OrderService } from '../../../service/order.service';
import { ActivatedRoute } from '@angular/router';
import { OrderComponent} from '../order/order.component'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [OrderService , OrderComponent]
})
export class ViewComponent implements OnInit {
  orders: Order[];
  order: Order
  id:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    public orderService: OrderService,
    public orderComponent: OrderComponent) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshOrder()
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.id = params.get('id')
    });
    if (this.id) { this.getOrderById() };
  }

  getOrderById() {
    this.orderService.getOrderById(this.id).subscribe((res: any) => {
      this.orders = res.body;
      this.refreshOrder()
    })
  }

  refreshOrder() {
    this.orderService.getOrderById(this.id).subscribe((res:any) => {
      console.log(res)
      this.orders = res.body;
    });
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

  onSubmit(form: NgForm) {
    if (form.value.id == "") {
      this.orderService.postOrder(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshOrder();
      });
    }
    else {
      this.orderService.putOrder(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshOrder();
      });
    }
  }

  onEdit(order: Order) {
    this.order = order;
  }

  onDelete(id:any) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.orderService.deleteOrder(id).subscribe((res: any) => {
        this.refreshOrder();
      })
    }
  }

  insertResponse(order: Order, response: any) {
    this.orderService.insertResponse(order, response).subscribe((res: any) => {
      this.orders = res.body as Order[];
      this.refreshOrder();
    });
  }
}
