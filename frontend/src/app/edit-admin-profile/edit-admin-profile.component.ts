import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Profile } from '../shared/profile.model';
import { ProfileService } from '../shared/profile.service';

declare var M: any;

@Component({
  selector: 'app-edit-admin-profile',
  templateUrl: './edit-admin-profile.component.html',
  styleUrls: ['./edit-admin-profile.component.css'],
  providers: [ProfileService]
})
export class EditAdminProfileComponent implements OnInit {

  constructor(public profileService: ProfileService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshProfileList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.profileService.selectedProfile = {
      id: "",
      full_name: "",
      email:"",
      phone_number: "",
      city: "",
      password:""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.id == "") {
      this.profileService.postProfile(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshProfileList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.profileService.putProfile(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshProfileList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshProfileList() {
    this.profileService.getProfileList().subscribe((res:any) => {
      console.log(res)
      this.profileService.profiles = res.rows as Profile[];

    });
  }

  onEdit(pro: Profile) {
    this.profileService.selectedProfile = pro;
  }

  onDelete(id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.profileService.deleteProfile(id).subscribe((res:any) => {
        this.refreshProfileList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
