import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Admin } from '../../../interface/admin.model';
import { AdminService } from '../../../service/admin.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [AdminService]
})
export class AddUserComponent implements OnInit {

  admin: Admin;
  constructor(public adminService:AdminService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.admin = {
      id: "",
      username: "",
      created:"",
      updated:"",
      password:""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.id == "") {
      this.adminService.postProfile(form.value).subscribe((res:any) => {
        this.resetForm(form);
      })
    }
  }

}
