import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Order } from '../../../interface/order.model';
import { OrderService } from '../../../service/order.service';
import { ActivatedRoute } from '@angular/router';
import { NewComponent} from '../new/new.component'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [OrderService , NewComponent]
})
export class ViewComponent implements OnInit {
  Orders: Order[];
  id:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    public orderService: OrderService,
    public newComponent: NewComponent) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshOrderList();
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
    this.orderService.getOrderList().subscribe((res:any) => {
      console.log(res)
      this.orderService.orders = res.rows as Order[];

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
      })
    }

  }

}
