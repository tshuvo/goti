import { Component, OnInit } from '@angular/core';
import {LearnerServiceService} from '../../services/learner/learner-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {CommonService} from '../../services/common/common.service';
import {NotificationService} from '../../services/notification/notification.service';
import {BrowsemeThemeableService} from '../../services/browseme/browseme-themeable.service';
import {BrowsemeService} from '../../services/browseme/browseme.service';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';


@Component({
  selector: 'app-learner-bill-info',
  templateUrl: './learner-bill-info.page.html',
  styleUrls: ['./learner-bill-info.page.scss'],
})
export class LearnerBillInfoPage implements OnInit {
  serviceRequestNo: any;
  ruleName: any;
  totalAmount: any;
  examDate: any;
  examVanue: any;
  examTime: any;
  paymentDetailsList: any = [];
  bankingMessage: any = [];
  bankingTextShow: boolean = false;
  constructor(private learnerService: LearnerServiceService,
              private alertController: AlertController,
              private router: Router,
              private route: ActivatedRoute,
              private splashScreen: SplashScreen,
              public browsemeService: BrowsemeThemeableService,
              private commonService: CommonService,
              private notificationService: NotificationService,
              private loadingController: LoadingController,
             ) {
    this.serviceRequestNo = this.router.getCurrentNavigation().extras.state.serviceRequestId;

    this.bankingMessage = this.commonService.getItem('bank_massage');
  }

  ngOnInit() {

    this.completePayment();
  }

  async completePayment(){
    const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
    await loading.present();
    const myObj = {
      serviceRequestNo: this.serviceRequestNo
    };
    const postData = JSON.stringify(myObj);
    console.log('i am sending', postData);
    this.learnerService.goForPayment(postData).subscribe(result => {
      // console.log('receiving result: ', result);

      if (result['status'] == '200') {
        // this.route.navigate(['learner-bill-info'], { state: { serviceRequestId: this.serviceRequestNo ,
        //     totalAmount: result['data']['totalAmount'], ruleName: result['data']['paymentDetailslist'][0]['ruleName']} });
        this.paymentDetailsList = result['data']['paymentDetailslist'];
        this.ruleName = result['data']['paymentDetailslist'][0]['ruleName'];
        this.totalAmount = result['data']['totalAmount'];
        this.examDate = result['data'].examDate;
        this.examTime = result['data'].examTime;
        this.examVanue = result['data'].examVenue;
        // console.log("your value is ", this.ruleName + " and "+ this.totalAmount);
        loading.dismiss();

      } else {
        // console.log(result['message']);
        this.commonService.toastMsg(result['message'], false);
        loading.dismiss();
        this.router.navigate(['home']);
      }

    });

  }

  async payNow() {

    let that =this;
    const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
    await loading.present();
    const myObj = {
      serviceRequestNo: this.serviceRequestNo
    };
    let  url = this.commonService.apiBaseUrl + "v1/drivingLicense/payNowCustom";
    this.commonService.setReq('POST', url , myObj).subscribe(result => {
            if (result['status'] == 200 && result['data'].paymentUrl) {
               // console.log("payment url: ", result['data'].paymentUrl);
              //  that.browsemeService.goUrl(result['data'].paymentUrl);
              this.splashScreen.hide();
              // that.browsemeService.goWithStaticUrl(result['data'].paymentUrl);
              try {
                that.browsemeService.goUrl(result['data'].paymentUrl);
              }catch (e) {
                // console.log("error",e);
              }

              // that.browsemeService.goUrl('https://ipaybrta.cnsbd.com');

              // that.browsemeService.goUrl('https://ipaybrta.cnsbd.com/bsp/bsppayment?u_id=cWsRE56dsUfGnCSrBLF01w%3D%3D&t_no=kcLxLUW16ovKmZsbjNHEnQ%3D%3D&t_amt=0&mob_no=0&sec_key=32303031323831353436373030&ret_url=UPHvB2Rw8jW84FYvmkqslXfqOd%2BFhtHxRGf24iItBLrvXUveY7LWMq%2BZ0fbJFSLElpP9G%2FvZDYT03Ov0POKRKG%2BWZc%2FjVpZSq4wVQ0lomc0%3D');

            } else {
              this.commonService.toastMsg('দুঃখিত! পরে আবার চেষ্টা করুন', false);
              this.router.navigateByUrl('/home');
            }
          },err => function () {
            that.commonService.toastMsg('দুঃখিত! পরে আবার চেষ্টা করুন', false);
            // that.router.navigateByUrl('/notification-details');
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
