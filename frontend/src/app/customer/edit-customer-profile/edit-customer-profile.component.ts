import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Customer } from '../../shared/customer.model';
import { CustomerService } from '../../shared/customer.service';

declare var M: any;

@Component({
  selector: 'app-edit-customer-profile',
  templateUrl: './edit-customer-profile.component.html',
  styleUrls: ['./edit-customer-profile.component.css'],
  providers: [CustomerService]
})
export class EditCustomerProfileComponent implements OnInit {

  constructor(public customerService: CustomerService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshCustomerList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.customerService.selectedCustomer = {
      customer_id: "",
      full_name: "",
      email:"",
      phone_number: "",
      city: "",
      password:""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.customer_id == "") {
      this.customerService.postCustomer(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshCustomerList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.customerService.putCustomer(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshCustomerList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshCustomerList() {
    this.customerService.getCustomerList().subscribe((res:any) => {
      console.log(res)
      this.customerService.customers = res.rows as Customer[];

    });
  }

  onEdit(cus: Customer) {
    this.customerService.selectedCustomer = cus;
  }

  onDelete(customer_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.customerService.deleteCustomer(customer_id).subscribe((res:any) => {
        this.refreshCustomerList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
