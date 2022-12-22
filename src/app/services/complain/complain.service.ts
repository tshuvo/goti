import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CommonService} from '../common/common.service';
@Injectable({
  providedIn: 'root'
})
export class ComplainService {

  serverURL: string;
  constructor(
      public http: HttpClient,
      private common: CommonService,
  ) {
    this.serverURL = this.common.apiBaseUrl;
  }

  getComplainList() {
    const url = this.serverURL + 'v1/complain/services';
    const postData = new FormData();
    // postData.append('USERDATA', '');
    // return this.http.post(url, postData);
    return this.common.setReq('GET', url, postData);

  }

  saveComplain(post_Data) {
    const url = this.serverURL + 'info/complainsave';
    const postData = new FormData();
    postData.append('USERDATA', post_Data);
    // return this.http.post(url, postData);
    return this.common.setReq('POST',url, postData);
  }

  getPreviousComplain(post_Data){
    const url = this.serverURL + 'v1/complain/getComplains';
    // const postData = new FormData();
    // postData.append('USERDATA', post_Data);
    // return this.http.post(url, postData);
    return this.common.setReq('GET',url);
  }
}
