import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Profile } from '../shared/profile.model';
import { ProfileService } from '../shared/profile.service';

declare var M: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  constructor(public profileService: ProfileService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshProfileList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.profileService.selectedProfile = {
      user_id: "",
      full_name: "",
      email:"",
      phone_number: "",
      city: "",
      password:""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.user_id == "") {
      this.profileService.postProfile(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshProfileList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.profileService.putCustomer(form.value).subscribe((res:any) => {
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

  onDelete(user_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.profileService.deleteProfile(user_id).subscribe((res:any) => {
        this.refreshProfileList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
