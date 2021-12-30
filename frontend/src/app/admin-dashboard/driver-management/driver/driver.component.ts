import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Driver } from '../../../interface/driver.model';
import { DriverService } from '../../../service/driver.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
  providers: [DriverService]
})
export class DriverComponent implements OnInit {

  drivers: Driver[];
  driver:Driver

  constructor(public driverService: DriverService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshDriverList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.driver = {
      id: "",
      full_name: "",
      email: "",
      phone_number: "",
      city: "",
      vehicle_type: "",
      vehicle_number:"",
      password: "",
      available: true,
      verification: ""

    }
  }

  refreshDriverList() {
    this.driverService.getDriverList().subscribe((res:any) => {
      console.log(res)
      this.drivers = res.body as Driver[];

    });
  }

  onDelete(id: any) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.driverService.deleteDriver(id).subscribe((res:any) => {
        this.refreshDriverList();
      });
    }
  }

}
