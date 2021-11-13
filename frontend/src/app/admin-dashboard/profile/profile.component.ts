import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Profile } from '../../shared/profile.model';
import { ProfileService } from '../../shared/profile.service';

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
      id: "",
      full_name: "",
      email:"",
      phone_number: "",
      city: "",
      password:""
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

  onDelete(id: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.profileService.deleteProfile(id).subscribe((res:any) => {
        this.refreshProfileList();
        this.resetForm();
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
