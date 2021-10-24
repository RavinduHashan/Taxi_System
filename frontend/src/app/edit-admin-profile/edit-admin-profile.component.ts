import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Profile } from '../shared/profile.model';
import { ProfileService } from '../shared/profile.service';
import { ProfileComponent } from '../profile/profile.component';

declare var M: any;

@Component({
  selector: 'app-edit-admin-profile',
  templateUrl: './edit-admin-profile.component.html',
  styleUrls: ['./edit-admin-profile.component.css'],
  providers: [ProfileService, ProfileComponent]
})
export class EditAdminProfileComponent implements OnInit {
  id: string = '';
  selectedProfile: Profile;

  constructor(
    public profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    public profileComponent: ProfileComponent) { }

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
      this.profileService.getProfileById(this.id).subscribe((res: any) => {
        this.selectedProfile = res.body;
        console.log(res);
      })
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
      this.profileService.profiles = res.body as Profile[];

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
