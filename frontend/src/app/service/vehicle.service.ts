import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Vehicle } from '../interface/vehicle.model';
import { environment }  from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  selectedVehicle: Vehicle;
  vehicles: Vehicle[] = [];
  constructor(private http: HttpClient) { }

  getVehicleList() {
    return this.http.get(environment.apiBaseUrlVehicle+'/getVehicles');
  }
  getVehicleById(id:any) {
    return this.http.get(`${environment.apiBaseUrlVehicle}/getOneVehicle/${id}`);
  }
  updateVehicleList(vehicle:Vehicle) {
    return this.http.put(environment.apiBaseUrlVehicle+'/updateVehicles'+ `/${vehicle.id}`, vehicle);
  }
  createVehicleList(vehicle:Vehicle) {
    return this.http.post(environment.apiBaseUrlVehicle+'/createVehicles', vehicle);
  }
  deleteVehicleList(id:any) {
    return this.http.delete(`${environment.apiBaseUrlVehicle}/deleteVehicle/${id}`);
  }
}
