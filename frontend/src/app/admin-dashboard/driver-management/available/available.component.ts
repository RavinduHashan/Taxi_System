import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { Driver } from '../../../interface/driver.model';
import { DriverService } from '../../../service/driver.service';

declare var M: any;

@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.css'],
  providers: [DriverService]
})
export class AvailableComponent implements OnInit {

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
      vehicle_number: "",
      password: "",
      available:""

    }
  }

  refreshDriverList() {
    this.driverService.getDriverList().subscribe((res:any) => {
      this.driverService.drivers = res.body as Driver[];

    });
  }
  available(dri: Driver) {
    if(dri.available)
        this.driverService.insertAvailability(dri, false).subscribe((res:any) => {
        this.resetForm();
      });
    else{
        this.driverService.insertAvailability(dri, true).subscribe((res:any) => {
        this.resetForm();
      })
    }

  }

}