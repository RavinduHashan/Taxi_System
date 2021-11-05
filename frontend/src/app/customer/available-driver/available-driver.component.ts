import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Driver} from '../../shared/driver.model';
import { DriverService } from '../../shared/driver.service';

declare var M: any;

@Component({
  selector: 'app-available-driver',
  templateUrl: './available-driver.component.html',
  styleUrls: ['./available-driver.component.css'],
  providers: [DriverService]
})
export class AvailableDriverComponent implements OnInit {
  constructor(public driverService: DriverService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshAvailableDriverList();
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
      available: true
    }
  }

  refreshAvailableDriverList() {
    this.driverService.getAvailableDriverList().subscribe((res:any) => {
      console.log(res)
      this.driverService.drivers = res.body as Driver[];

    });
  }

  onEdit(dir: Driver) {
    this.driverService.selectedDriver = dir;
  }

  //Test

}

