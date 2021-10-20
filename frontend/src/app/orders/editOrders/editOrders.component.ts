import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Order } from '../../shared/order.model';
import { OrderService } from '../../shared/order.service';


declare var M: any;

@Component({
  selector: 'app-editOrders',
  templateUrl: './editOrders.component.html',
  styleUrls: ['./editOrders.component.css'],
  providers: [OrderService]
})
export class EditOrdersComponent implements OnInit {
  orderId:any
  orderDetails: any;
  editOrderForm: FormGroup;
  formData: any = {
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

  constructor(public orderService: OrderService, public route:ActivatedRoute) { }

  ngOnInit(): void {

    this.editOrderForm = new FormGroup({
      pickLocation: new FormControl(null, [Validators.required]),
      dropLocation: new FormControl(null, [Validators.required]),
      pickTime: new FormControl(null, [Validators.required]),
      dropTime: new FormControl(null, [Validators.required]),
      response: new FormControl(null, [Validators.required]),
      customer_id: new FormControl(null, [Validators.required]),
      driver_id: new FormControl(null, [Validators.required])
    })


    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.orderId = paramMap.get("id");

        this.orderService.getOneOrder(this.orderId).subscribe(

          res => {
            this.orderDetails = res
            this.assignData(this.orderDetails);
          }

        );
      }
    })

    this.resetForm();
    this.refreshOrderList();
  }


  assignData(orderData: any) {
    console.log(orderData)

    this.formData = {
      pick_location: orderData.rows[0].pick_location,
      drop_location: orderData.rows[0].drop_location,
      pick_time: orderData.rows[0].pick_time,
      drop_time: orderData.rows[0].drop_time,
      response: orderData.rows[0].response,
      customer_id: orderData.rows[0].customer_id,
      driver_id: orderData.rows[0].driver_id
    }

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

  onSubmit() {
    if (this.formData.id == "") {
      this.orderService.postOrder(this.formData).subscribe((res:any) => {
        this.resetForm(this.formData);
        this.refreshOrderList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.orderService.putOrder(this.formData).subscribe((res:any) => {
        this.resetForm(this.formData);
        this.refreshOrderList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshOrderList() {
    this.orderService.getOrderList().subscribe((res:any) => {
      // console.log(res)
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


