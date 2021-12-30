import { Component, OnInit } from '@angular/core';
import { Driver } from '../../../interface/driver.model';
import { DriverService } from '../../../service/driver.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css'],
  providers: [DriverService]
})
export class AddDriverComponent implements OnInit {
  drivers: Driver[];
  driver:Driver
  constructor(public driverService: DriverService) { }

  ngOnInit(): void {
    this.resetForm();
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
      });
    }
  }

}
