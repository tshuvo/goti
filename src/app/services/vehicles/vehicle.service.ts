import { Injectable } from '@angular/core';
import {CommonService} from '../common/common.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  serverURL: string;
  data: Observable<Object>;

  constructor(public http: HttpClient,
              private common: CommonService, ) {
    this.serverURL = this.common.apiBaseUrl;
  }

  searchVehicles(post_data){
    const url = this.serverURL +'v1/vehicle-tagging/search';
    return this.common.setReq('POST', url, post_data);
  }

  tagVehicles(post_data){
    const url = this.serverURL +'v1/vehicle-tagging/save';
    return this.common.setReq('POST', url, post_data);
  }

  untagVehicles(post_data){
    const url = this.serverURL + 'v1/dashboard/remove-tagged-vehicle';
    return this.common.setReq('POST', url, post_data);
  }
}
