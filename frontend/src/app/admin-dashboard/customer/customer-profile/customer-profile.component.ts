import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Customer } from '../../../shared/customer.model';
import { CustomerService } from '../../../shared/customer.service';

declare var M: any;

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css'],
  providers: [CustomerService]
})
export class CustomerProfileComponent implements OnInit {

  constructor(public customerService: CustomerService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshCustomerList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.customerService.selectedCustomer = {
      id: "",
      full_name: "",
      email:"",
      phone_number: "",
      city: "",
      otp:""
    }
  }

  refreshCustomerList() {
    this.customerService.getCustomerList().subscribe((res:any) => {
      console.log(res)
      this.customerService.customers = res.body as Customer[];

    });
  }

  onEdit(cus: Customer) {
    this.customerService.selectedCustomer = cus;
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.customerService.deleteCustomer(id).subscribe((res:any) => {
        this.refreshCustomerList();
        this.resetForm();
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }
}
