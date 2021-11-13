import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Customer } from '../../../shared/customer.model';
import { CustomerService } from '../../../shared/customer.service';
import { CustomerProfileComponent } from '../customer-profile/customer-profile.component';

declare var M: any;

@Component({
  selector: 'app-edit-customer-profile',
  templateUrl: './edit-customer-profile.component.html',
  styleUrls: ['./edit-customer-profile.component.css'],
  providers: [CustomerService, CustomerProfileComponent]
})
export class EditCustomerProfileComponent implements OnInit {
  id: string = '';
  selectedCustomer: Customer;

  constructor(
    private activatedRoute: ActivatedRoute,
    public customerService: CustomerService,
    public customerProfileComponent: CustomerProfileComponent) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.id = params.get('id')
    });
    if (this.id) { this.getCustomerData() };
    this.resetForm();
    this.refreshCustomerList();
  }

  getCustomerData() {
    console.log(this.id);
    this.customerService.getCustomerById(this.id).subscribe((res: any) => {
      this.selectedCustomer = res.body;
      console.log(res);
    })
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.customerService.selectedCustomer = {
      id: "",
      full_name: "",
      email: "",
      phone_number: "",
      city: "",
      otp: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.id == "") {
      this.customerService.postCustomer(form.value).subscribe((res: any) => {
        this.resetForm(form);
        this.refreshCustomerList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.customerService.putCustomer(form.value).subscribe((res: any) => {
        this.resetForm(form);
        this.refreshCustomerList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshCustomerList() {
    this.customerService.getCustomerList().subscribe((res: any) => {
      console.log(res)
      this.customerService.customers = res.body as Customer[];

    });
  }

}
