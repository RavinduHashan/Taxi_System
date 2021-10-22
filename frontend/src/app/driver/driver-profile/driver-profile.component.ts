import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Driver } from '../../shared/driver.model';
import { DriverService } from '../../shared/driver.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

declare var M: any;

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css'],
  providers: [DriverService]
})
export class DriverProfileComponent implements OnInit {
  faCoffee = faCoffee;

  constructor(public driverService: DriverService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshDriverList();
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

  onEdit(dri: Driver) {
    this.driverService.selectedDriver = dri;
  }

  onDelete(id: any) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.driverService.deleteDriver(id).subscribe((res:any) => {
        this.refreshDriverList();
        // this.resetForm();
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
