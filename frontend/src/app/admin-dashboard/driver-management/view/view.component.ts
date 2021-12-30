import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Driver } from '../../../interface/driver.model';
import { DriverService } from '../../../service/driver.service';
import { DriverComponent} from '../driver/driver.component'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [DriverService, DriverComponent]
})
export class EditDriverProfileComponent implements OnInit {
  id:any;
  drivers: Driver[];
  driver:Driver
  constructor(
      public driverService: DriverService,
      private activatedRoute: ActivatedRoute,
      public driverComponent: DriverComponent) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshDriver();
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.id = params.get('id')
    });
    if (this.id) { this.getDriverById() };

  }

  getDriverById() {
    this.driverService.getDriverById(this.id).subscribe((res: any) => {
      this.driver = res.body;
      this.refreshDriver()
    })
  }

  refreshDriver() {
    this.driverService.getDriverById(this.id).subscribe((res:any) => {
      this.drivers = res.body;
    });
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

  onSubmit(form: NgForm) {
    if (form.value.id == "") {
      this.driverService.postDriver(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshDriver();
      });
    }
    else {
      this.driverService.putDriver(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshDriver();
      });
    }
  }

  onEdit(driver: Driver) {
    this.driver = driver;
  }

  onDelete(id:any) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.driverService.deleteDriver(id).subscribe((res: any) => {
        this.refreshDriver();
      })
    }
  }

  insertVerification(driver: Driver, verification: any) {
    this.driverService.insertVerification(driver, verification).subscribe((res: any) => {
      this.drivers = res.body as Driver[];
      this.refreshDriver();
    });
  }

  available(driver: Driver) {
    if(driver.available)
        this.driverService.insertAvailability(driver, false).subscribe((res:any) => {
        this.resetForm();
      });
    else{
        this.driverService.insertAvailability(driver, true).subscribe((res:any) => {
        this.resetForm();
      })
    }

  }
}
