import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Vehicle } from '../../../interface/vehicle.model';
import { VehicleService } from '../../../service/vehicle.service';


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
  providers: [VehicleService]
})
export class VehicleComponent implements OnInit {

  Vehicles: Vehicle[];

 constructor(public vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshVehicleList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.vehicleService.selectedVehicle = {
      id: "",
      serial_number: "",
      vehicle_type: "",
      base_distance: "",
      base_rate: "",
      rate_per_km: ""
    }
  }

  refreshVehicleList() {
    this.vehicleService.getVehicleList().subscribe((res: any) => {
      this.Vehicles = res.body;
    });
  }

  onEdit(vehicle: Vehicle) {
    this.vehicleService.selectedVehicle = vehicle;
  }

  onDelete(id: any) {
    if (confirm('Are you sure to delete this record ?') == true) {
      // this.vehicleService.deleteVehicle(id).subscribe((res:any) => {
      //   this.refreshVehicleList();
      // });
    }
  }

}
