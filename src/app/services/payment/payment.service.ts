import { Injectable } from '@angular/core';
import {CommonService} from '../common/common.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  serverURL: string;
  data: Observable<Object>;

  constructor(
      public http: HttpClient,
      private common: CommonService,
  ) {
    this.serverURL = this.common.apiBaseUrl;
  }

  public getPaymentHistory()
  {
    let url = this.serverURL + "v1/paymentHistory/payment-history";
    return this.common.setReq('GET', url);
  }

  public showReceipt(encServiceRequestNo, encTranNo)
  {
    return this.serverURL +'file/payment-money-receipt-url?encServiceRequestNo='+encodeURIComponent(encServiceRequestNo)+'&encTranNo='+encodeURIComponent(encTranNo);
  }
}
