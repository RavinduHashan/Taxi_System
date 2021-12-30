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

  vehicle: Vehicle;
  vehicles: Vehicle[];

 constructor(public vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshVehicleList();
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

  refreshVehicleList() {
    this.vehicleService.getVehicleList().subscribe((res: any) => {
      this.vehicles = res.body;
    });
  }

  onEdit(vehicle: Vehicle) {
    this.vehicle = vehicle;
  }

  onSubmit(form: NgForm) {
    if (form.value.id == "") {
      this.vehicleService.createVehicleList(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshVehicleList();
      });
    }
    else {
      this.vehicleService.updateVehicleList(form.value).subscribe((res:any) => {
        this.resetForm(form);
        this.refreshVehicleList();
      });
    }
  }

  onDelete(id:any) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.vehicleService.deleteVehicleList(id).subscribe((res: any) => {
        this.refreshVehicleList();
      })
    }
  }

}
