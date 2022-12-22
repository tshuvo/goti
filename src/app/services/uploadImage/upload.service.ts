import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {CommonService} from 'src/app/services/common/common.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  sess_user_data: any;
  EnMobileNo: any;
  nowTime: string;
  serverURL: string;
  constructor(
      public http: HttpClient,
      // public session: SessionService,
      private datePipe: DatePipe,
      // private crypto: CryptoService,
      private common: CommonService,
  ) {
    this.sess_user_data = this.common.getItem('userPhone');
    this.serverURL = this.common.apiBaseUrl;
  }
  uploadFile(formData) {
    const url = this.serverURL +'v1/complain/saveComplain';
    return this.common.setReq('POST', url, formData);
  }

  genCryptoEnc() {
    if (this.sess_user_data) {
      this.EnMobileNo = this.sess_user_data;
    } else {
      this.EnMobileNo = '';
    }

    let date1 = new Date();
    // let date = new Date(date1.valueOf() + date1.getTimezoneOffset() * 60000);
    let date = new Date(date1.getTime() + (date1.getTimezoneOffset() * 60 * 1000));
    this.nowTime = this.datePipe.transform(date, 'dd-MM-yyyy HH:mm:ss');

    const enData = '{"userMobile":"' + this.EnMobileNo + '", "encTime":"' + this.nowTime + '"}';
    // const data = this.crypto.cryptoEnc(enData);
    //console.log(data);
    return enData;
  }

}
