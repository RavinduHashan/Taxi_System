import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Admin } from '../../../interface/admin.model';
import { AdminService } from '../../../service/admin.service';
import { UserManagementComponent } from '../user-management.component';

declare var M: any;

@Component({
  selector: 'app-edit-admin-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [AdminService, UserManagementComponent]
})
export class EditAdminProfileComponent implements OnInit {
  id: string = '';
  selectedProfile: Admin;

  constructor(
    public adminService:AdminService,
    private activatedRoute: ActivatedRoute,
    public UserManagementComponent: UserManagementComponent) { }

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
        this.selectedProfile = res.body;
        console.log(res);
      })
    }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.adminService.selectedProfile = {
      id: "",
      username: "",
      password:""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.id == "") {
      this.adminService.postProfile(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshProfileList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.adminService.putProfile(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshProfileList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshProfileList() {
    this.adminService.getProfileList().subscribe((res:any) => {
      console.log(res)
      this.adminService.profiles = res.body as Admin[];

    });
  }
}
