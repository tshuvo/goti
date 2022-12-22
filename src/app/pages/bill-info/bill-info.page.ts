import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../services/common/common.service";
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {NotificationService} from "../../services/notification/notification.service"; 
//import {BrowsemeService} from "../../services/browseme/browseme.service";


import {BrowsemeThemeableService} from '../../services/browseme/browseme-themeable.service';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-bill-info',
  templateUrl: './bill-info.page.html',
  styleUrls: ['./bill-info.page.scss'],
})
export class BillInfoPage implements OnInit {


  billFor: string;
  billData: any;
  totalBill:any;
  errorMsg:string;
  bankingMessage: any = [];
  bankingTextShow: boolean = true;

  constructor(
      private alertController: AlertController,
      private router: Router,
      private route: ActivatedRoute,
      private commonService: CommonService,
      private notificationService: NotificationService,
      private loadingController: LoadingController, 
      //public browsemeService: BrowsemeService,
      public browsemeService: BrowsemeThemeableService,
      public navController: NavController,

  ) {
    this.bankingMessage = this.commonService.getItem('bank_massage');
    this.totalBill = 0;
  }


  ngOnInit() {
    let that = this;
    this.route
    .queryParams
    .subscribe(params => {
      this.billFor = params['billFor'];

      switch (this.billFor) {

        case 'FITNESS':
          this.billData = this.commonService.getItem('billData');
          this.totalBill = this.commonService.getItem('totalBill');
          this.bankingTextShow = false;
          break;

        case 'TAX':
          this.billData = this.commonService.getItem('billData');
          this.totalBill = this.commonService.getItem('totalBill');
          this.bankingTextShow = false;

          // this.getBillInfo(this.billFor, params['encModelYear'], params['encRegistrationNo'],params['encRuleId'],params['encTagId'],params['encVehicleClassId'] );
          break;

        case 'ROUTE_PERMIT':
          this.getBillInfo(this.billFor, params['encModelYear'], params['encRegistrationNo'],params['encRuleId'],params['encTagId'],params['encVehicleClassId'] );
          break;

        default:
          this.commonService.toastMsg('দুঃখিত! পরে আবার চেষ্টা করুন', false);
          this.router.navigateByUrl('/notification-details');
          break;
      }
    }, err => function () {
      that.commonService.toastMsg('দুঃখিত! পরে আবার চেষ্টা করুন', false);
    });
  }


  async getBillInfo(billFor, encModelYear, encRegistrationNo,encRuleId,encTagId,encVehicleClassId ) {
    let that = this;
    const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
    await loading.present();

    this.notificationService.getBillInfo(billFor, encModelYear, encRegistrationNo,encRuleId,encTagId,encVehicleClassId )
    .subscribe(result => {
      console.log(billFor+' bill info',result);

      if (result['status'] == 200) {
        this.bankingTextShow = false;
        this.billData = result['data'].paymentDetailslist;

        if(result['data'].paymentDetailslist){
          result['data'].paymentDetailslist.forEach(function (val) {
            that.totalBill = parseFloat(that.totalBill) + parseFloat(val.totalFee);
          });

        }else{
          this.billData = false;
        }
        this.errorMsg = result.hasOwnProperty('message')?result['message']:'তথ্য সঠিক নয়';
      } else {
        this.errorMsg = result['message'];
        this.billData = false;
      }
      if(!this.billData){
        this.commonService.toastMsg(this.errorMsg, false);
        this.navController.back();
      }
      loading.dismiss();
    },err => loading.dismiss());
  }

  async payNow(billFor) {
    // this.browsemeService.goUrl('http://192.168.78.187/test/123.php');

    let that =this;
    const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
    await loading.present();

    this.notificationService.payNow(billFor)
    .subscribe(result => {
      if (result['status'] == 200 && result['data'].paymentUrl) {
        console.log(result['data'].paymentUrl);
        // window.location = result['data'].paymentUrl;  //@todo add inapp browser
        that.browsemeService.goUrl(result['data'].paymentUrl);
      } else {
        this.commonService.toastMsg('দুঃখিত! পরে আবার চেষ্টা করুন', false);
        this.router.navigateByUrl('/notification-details');
      }
    },err => function () {
      that.commonService.toastMsg('দুঃখিত! পরে আবার চেষ্টা করুন', false);
      that.router.navigateByUrl('/notification-details');
    });

    loading.dismiss();
  }

  async descardTransaction() {
    let that = this;
    const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
    await loading.present();
    this.notificationService.descardTransaction()
    .subscribe(result => {
      if (result['status'] == 200) {
        let msg = (result['data'].statusMessage)?result['data'].statusMessage:'লেনদেন সফলভাবে বাতিল করা হয়েছে';
        this.commonService.toastMsg(msg);
        this.router.navigateByUrl('/home');
      } else {
        this.commonService.toastMsg('দুঃখিত! পরে আবার চেষ্টা করুন', false);
      }
      loading.dismiss();
    },err => function () {
      that.commonService.toastMsg('দুঃখিত! পরে আবার চেষ্টা করুন', false);
    });

  }

}
