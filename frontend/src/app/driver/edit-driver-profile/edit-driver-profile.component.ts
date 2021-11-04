import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Driver } from '../../shared/driver.model';
import { DriverService } from '../../shared/driver.service';
import { DriverProfileComponent} from '../driver-profile/driver-profile.component'

declare var M: any;

@Component({
  selector: 'app-edit-driver-profile',
  templateUrl: './edit-driver-profile.component.html',
  styleUrls: ['./edit-driver-profile.component.css'],
  providers: [DriverService, DriverProfileComponent]
})
export class EditDriverProfileComponent implements OnInit {
  id: string = '';
  selectedDriver: Driver;

  constructor(
      public driverService: DriverService,
      private activatedRoute: ActivatedRoute,
      public driverProfileComponent: DriverProfileComponent) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.id = params.get('id')
    });
    if (this.id) { this.getDriverData() };
    this.resetForm();
    this.refreshDriverList();
  }

  getDriverData() {
    console.log(this.id);
    this.driverService.getDriverById(this.id).subscribe((res: any) => {
      this.selectedDriver = res.body;
      console.log(res);
    })
  }


  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.driverService.selectedDriver = {
      id: "",
      full_name: "",
      email: "",
      phone_number: "",
      city: "",
      vehicle_type: "",
      vehicle_number:"",
      password: "",
      available: true

    }
  }

  onSubmit(form: NgForm) {
    if (form.value.id == "") {
      this.driverService.postDriver(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshDriverList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.driverService.putDriver(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshDriverList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshDriverList() {
    this.driverService.getDriverList().subscribe((res:any) => {
      console.log(res)
      this.driverService.drivers = res.body as Driver[];

    });
  }

}
