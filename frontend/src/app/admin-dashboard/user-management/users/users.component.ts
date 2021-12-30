import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Admin } from '../../../interface/admin.model';
import { AdminService } from '../../../service/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [AdminService]
})
export class UsersComponent implements OnInit {

  admin:Admin;
  admins:Admin[]
  constructor(public adminSevice: AdminService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshProfileList();
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

  refreshProfileList() {
    this.adminSevice.getProfileList().subscribe((res:any) => {
      console.log(res)
      this.admins = res.body as Admin[];
    });
  }

  onEdit(pro: Admin) {
    this.admin = pro;
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.adminSevice.deleteProfile(id).subscribe((res:any) => {
        this.refreshProfileList();
        this.resetForm();
      });
    }
  }


}

