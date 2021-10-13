import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Driver } from '../../shared/driver.model';
import { DriverService } from '../../shared/driver.service';

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
      available: ""
        
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.id == "") {
      this.driverService.updateAvailableStateList(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshDriverList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.driverService.updateAvailableStateList(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshDriverList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  
  refreshDriverList() {
    this.driverService.getDriverList().subscribe((res:any) => {
      console.log(res)
      this.driverService.drivers = res.rows as Driver[];
      
    });
  }

  onEdit(dir: Driver) {
    this.driverService.selectedDriver = dir;
  }

  onDelete(id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.driverService.deleteDriver(id).subscribe((res:any) => {
        this.refreshDriverList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }
}
