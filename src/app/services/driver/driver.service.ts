import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CommonService} from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  serverURL: string;
  data: Observable<Object>;

  constructor(public http: HttpClient,
              private common: CommonService, ) {
    this.serverURL = this.common.apiBaseUrl;
  }

  tagDrivingLicense(post_data){
    const url = this.serverURL +'v1/vehicleRegistration/license-tagging';
    return this.common.setReq('POST', url, post_data);
  }

  saveTagDrivingLicense(post_data){
    const url = this.serverURL +'v1/vehicleRegistration/save-license-tagging';
    return this.common.setReq('POST', url, post_data);
  }

  saveTagDriver(post_data){
    const url = this.serverURL +'v1/vehicleRegistration/save-driver-tagging';
    return this.common.setReq('POST', url, post_data);
  }

  tagDriver(post_data){
    const url = this.serverURL +'v1/vehicleRegistration/check-driver-tagging';
    return this.common.setReq('POST', url, post_data);
  }

  getTaggedDriver ( post_data ){
    const url = this.serverURL +'v1/vehicleRegistration/vehicle-driver-list';
    return this.common.setReq('POST', url, post_data);
  }

  getVehicleRegistrationNumber(){
    const url = this.serverURL +'v1/vehicleRegistration/vehicle-tagging-registration-info';
    return this.common.setReq('GET',url);
  }

  getVehicleInfo(){
    const url = this.serverURL +'v1/dashboard/vehicle-information';
    return this.common.setReq('GET',url);
  }

  untagDriver(post_data){
    const url = this.serverURL +'v1/vehicleRegistration/remove-tagged-driver';
    return this.common.setReq('POST',url, post_data);
  }

}
