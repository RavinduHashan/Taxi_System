import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Profile } from './profile.model';
import { environment }  from '../../environments/environment';

@Injectable()
export class ProfileService {
  selectedProfile: Profile;
  profiles: Profile[] = [];
  readonly baseURL = 'http://localhost:5000/admins';

  constructor(private http: HttpClient) { }


  postProfile(pro: Profile) {
    return this.http.post(environment.apiBaseUrlAdmin+'/register', pro);
  }

  getProfileList() {
    return this.http.get(environment.apiBaseUrlAdmin+'/get');
  }

  putProfile(pro: Profile) {
    return this.http.put(environment.apiBaseUrlAdmin+'/update'+ `/${pro.id}`, pro);
  }

  deleteProfile(id: string) {
    return this.http.delete(environment.apiBaseUrlAdmin+'/delete'+ `/${id}`);
  }

  getProfileById(id: string) {
    return this.http.get(environment.apiBaseUrlAdmin + `/${id}`);
  }
}
