import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Vehicle } from '../../../interface/vehicle.model';
import { VehicleService } from '../../../service/vehicle.service';
import { VehicleComponent} from '../vehicle/vehicle.component'

@Component({
  selector: 'app-edit-vehicles',
  templateUrl: './edit-vehicles.component.html',
  styleUrls: ['./edit-vehicles.component.css'],
  providers: [VehicleService, VehicleComponent]
})
export class EditVehiclesComponent implements OnInit {
  id:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    public vehicleService: VehicleService,
    public vehicleComponent: VehicleComponent
    ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.id = params.get('id')
    });
    if (this.id) { this.getVehicleData() };
    this.resetForm();
    this.refreshVehicleList();
  }

  getVehicleData() {
    this.vehicleService.getVehicleById(this.id).subscribe((res: any) => {
      this.vehicleService.selectedVehicle = res.body;
    })
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

  refreshVehicleList() {
    this.vehicleService.getVehicleList().subscribe((res:any) => {
      console.log(res)
      this.vehicleService.vehicles = res.body as Vehicle[];

    });
  }
  onEdit(vehicle: Vehicle) {
    this.vehicleService.selectedVehicle = vehicle;
  }

  onDelete(id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.vehicleService.deleteVehicleList(id).subscribe((res:any) => {
        this.refreshVehicleList();
        this.resetForm(form);
      });
    }
  }

}
