import { Component, OnInit } from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {PaymentService} from '../../services/payment/payment.service';

// import {BrowsemeThemeableService} from '../../services/browseme/browseme-themeable.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  public  showData:any = null;
  public paymentHistory:any;

  constructor(
      private loadingController: LoadingController,
      private paymentService: PaymentService,
      // private browseme: BrowsemeThemeableService
  ) {
    this.paymentHistory=[];
  }

  ngOnInit() {
    this.getPaymentHistory();
  }

  async getPaymentHistory() {
    const loading = await this.loadingController.create({message: 'প্রক্রিয়াকরণ করা হচ্ছে ...'});
    await loading.present();
    this.paymentService.getPaymentHistory().subscribe(result => {
      console.log(result);

      if (result['status'] == 200) {
        this.paymentHistory = result['data'].paymentHistory;
        this.showData = this.paymentHistory.length > 0;
      } else {
        this.paymentHistory = [];
        this.showData = false;

      }
      loading.dismiss();
    },err => {
      console.log(err.message);
      this.paymentHistory = [];
      this.showData = false;
      loading.dismiss();

    });
  }

 

  showReceipt(item){
    let encServiceRequestNo = item.encServiceRequestNo;
    let encTranNo = item.encTranNo;
    let url = this.paymentService.showReceipt(encServiceRequestNo, encTranNo);

    console.log(url);

    // this.browseme.goUrl(url);
     return url; 

  }

  

}
