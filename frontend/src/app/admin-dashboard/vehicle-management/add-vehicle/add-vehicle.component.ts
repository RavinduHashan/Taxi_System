import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Vehicle } from '../../../interface/vehicle.model';
import { VehicleService } from '../../../service/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css'],
  providers: [VehicleService]
})
export class AddVehicleComponent implements OnInit {

  Vehicles: Vehicle[];
  vehicle:Vehicle;
  constructor(public vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.vehicle = {
      id: "",
      serial_number: "",
      vehicle_type: "",
      base_distance: "",
      base_rate: "",
      rate_per_km: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.id == "") {
      this.vehicleService.createVehicleList(form.value).subscribe((res:any) => {
        this.resetForm(form);
        // this.refreshVehicleList();
      });
    }
  }

}
