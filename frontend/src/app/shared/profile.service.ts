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
  readonly baseURL = 'http://localhost:5000/users';

  constructor(private http: HttpClient) { }


  postProfile(pro: Profile) {
    return this.http.post(environment.apiBaseUrl+'/register', pro);
  }

  getProfileList() {
    return this.http.get(environment.apiBaseUrl+'/get');
  }

  putProfile(pro: Profile) {
    return this.http.put(environment.apiBaseUrl+'/update'+ `/${pro.user_id}`, pro);
  }

  deleteProfile(user_id: string) {
    return this.http.delete(environment.apiBaseUrl+'/delete'+ `/${user_id}`);
  }
}
