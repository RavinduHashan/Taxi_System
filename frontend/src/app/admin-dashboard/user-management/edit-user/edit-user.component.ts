import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Admin } from '../../../interface/admin.model';
import { AdminService } from '../../../service/admin.service';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [AdminService, UsersComponent]
})
export class EditProfileComponent implements OnInit {
  id: string = '';
  admin: Admin;
  admins:Admin[];

  constructor(
    public adminService:AdminService,
    private activatedRoute: ActivatedRoute,
    public UsersComponent: UsersComponent) { }

    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((params: any) => {
        this.id = params.get('id')
      });
      if (this.id) { this.getProfileData() };
      this.resetForm();
      this.refreshProfileList();
    }

    getProfileData() {
      console.log(this.id);
      this.adminService.getProfileById(this.id).subscribe((res: any) => {
        this.admin = res.body;
        console.log(res);
      })
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
        this.refreshProfileList();
      });
    }
    else {
      this.adminService.putProfile(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshProfileList();
      });
    }
  }

  refreshProfileList() {
    this.adminService.getProfileList().subscribe((res:any) => {
      console.log(res)
      this.admins = res.body as Admin[];
    });
  }
}
