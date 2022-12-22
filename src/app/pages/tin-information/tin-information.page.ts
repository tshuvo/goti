import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {LoadingController} from '@ionic/angular';
import {NotificationService} from '../../services/notification/notification.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-tin-information',
  templateUrl: './tin-information.page.html',
  styleUrls: ['./tin-information.page.scss'],
})

export class TinInformationPage implements OnInit {
  billFor:any;
  tinName:any;
  tinNo: any;
  tinDistrict: any;
  tinDistrictName: any;
  tinAddress: any;
  tinCircle: any;
  tinCircleName: any;
  tinZone: any;
  tinZoneName: any;
  tinType: any;
  tinTypeName: any;
  tinTelephoneNo: any;
  tinDistrictList:any;
  tinTypeList:any;
  registrationNo: any;
  tinFieldStatus: any = true;
  tinVerifyStatus: any = false;
  nbrSubTinTypeName: any = false;

  constructor(
      private alertController: AlertController,
      private router: Router,
      private route: ActivatedRoute,
      private commonService: CommonService,
      private notificationService: NotificationService,
      private loadingController: LoadingController,
      private navCtrl: NavController,
  ) {


  }

  ngOnInit() {
    let that = this;
    this.route
    .queryParams
    .subscribe(params => {
      this.billFor = params['billFor'];
      this.getTnData(params);
    }, err => function () {
      that.commonService.toastMsg('দুঃখিত! পরে আবার চেষ্টা করুন', false);
    });
  }

  async getTnData(params) {

    const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
    await loading.present();

    /* this.notificationService.tinDistrictList().subscribe(result => {
      this.tinDistrictList = result['data'].tinDistrictList;
    }); */

    /* this.notificationService.tinTypeList().subscribe(result => {
      this.tinTypeList = result['data'].tinTypelist;
    }); */

    this.notificationService.getFitnessTinInfo(params['encModelYear'], params['encRegistrationNo'], params['encRuleId'],
        params['encTagId'], params['encVehicleClassId'],params['encVehicleTypeId'] , params['encOwnershipTypeId'],this.billFor)
        .subscribe(result => {
              if (result['status'] == 200) {

                if (result['data'].previousTinFound) {
                  let tinData = result['data'].tinInfo;
                  if (tinData) {
                    this.tinVerifyStatus = true;
                    this.tinNo = tinData.tinNo;
                    this.tinName = tinData.tinName;
                    this.tinDistrict = tinData.tinDistrict;
                    this.tinDistrictName = tinData.tinDistrictName;
                    this.tinAddress = tinData.tinAddress;
                    this.tinCircle = tinData.tinCircle;
                    this.tinCircleName = tinData.tinCircleName;
                    this.tinZone = tinData.tinZone;
                    this.tinZoneName = tinData.tinZoneName;
                    this.tinType = tinData.tinType;
                    this.tinTypeName = tinData.tinTypeName;
                    this.tinTelephoneNo = tinData.tinTelephoneNo;
                    this.nbrSubTinTypeName = tinData.nbrSubTinTypeName;
                  }
                } else {
                  this.tinFieldStatus = false;
                  this.commonService.toastMsg(result['data'].statusMessage, false);
                }
                this.registrationNo = params['registrationNo'];
              } else if (result['success'] == false) {
                this.commonService.toastMsg(result['message'], false);
                this.navCtrl.pop();
              } else {
                this.tinInfoClear();
                this.registrationNo = params['registrationNo'];
              }
              loading.dismiss();
            }, err => function(e) {
              console.log(e.getMessages());
              loading.dismiss();
            }
        );
  }

  async checkTin() {

    let tinName = this.tinName;
    let tinNo = this.tinNo;
    let tinDistrict = this.tinDistrict;
    let tinAddress = this.tinAddress;
    let tinCircle = this.tinCircle;
    let tinZone = this.tinZone;
    let tinType = this.tinType;
    let registrationNo = this.registrationNo;
    let nbrSubTinTypeName = this.nbrSubTinTypeName;

    let tinTelephoneNo = this.tinTelephoneNo;
    if (!this.commonService.inputFieldEmptyChecker(this.tinTelephoneNo)) {
      if (this.tinTelephoneNo.toString().charAt(0) == 0) {
        tinTelephoneNo = this.tinTelephoneNo;
      } else {
        tinTelephoneNo = '0' + this.tinTelephoneNo;
      }
    }

    /* if (this.commonService.inputFieldEmptyChecker(tinName)) {
      this.commonService.toastMsg('ব্যক্তি অথবা সংস্থার টিআইএন নাম লিখুন', false);
    } else if (this.commonService.inputFieldEmptyChecker(tinNo)) {
      this.commonService.toastMsg('টিআইএন নম্বর লিখুন', false);
    } else if ((tinNo.toString().length < 10) || (tinNo.toString().length > 12)) {
      this.commonService.toastMsg('টিআইএন নম্বর এ ১০ সংখ্যা অথবা ১২ সংখ্যা দিন', false);
    } else if (tinNo.toString().length == 11) {
      this.commonService.toastMsg('টিআইএন নম্বর এ ১০ সংখ্যা অথবা ১২ সংখ্যা দিন', false);
    } else if (tinDistrict == '') {
      this.commonService.toastMsg('জেলা সঠিক করুন', false);
    } */

    /* else if (this.commonService.inputFieldEmptyChecker(tinCircle)) {
      this.commonService.toastMsg('টিআইএন সার্কেলটি সঠিক করুন', false);
    } else if (this.commonService.inputFieldLengthChecker(tinCircle, 1, 3)) {
      this.commonService.toastMsg('টিআইএন সার্কেল এ ৩ সংখ্যা দিন', false);
    } else if (this.commonService.inputFieldEmptyChecker(tinZone)) {
      this.commonService.toastMsg('টিআইএন জোনটি সঠিক করুন', false);
    } else if (this.commonService.inputFieldLengthChecker(tinZone, 1, 3)) {
      this.commonService.toastMsg('টিআইএন জোন এ ৩ সংখ্যা দিন', false);
    } else if (tinType == '') {
      this.commonService.toastMsg('টিআইএন টাইপ সঠিক করুন', false);
    } */

    if (!this.tinVerifyStatus) {
      this.commonService.toastMsg('টিআইএন নম্বর যাচাই করুন', false);
    } else if (this.commonService.inputFieldEmptyChecker(tinAddress)) {
      this.commonService.toastMsg('টিআইএন ঠিকানা লিখুন', false);
    } else if (this.commonService.inputFieldEmptyChecker(this.tinTelephoneNo)) {
      this.commonService.toastMsg('মোবাইল নম্বর লিখুন ', false);
    } else if (this.commonService.inputFieldLengthChecker(tinTelephoneNo, 10, 11)) {
      this.commonService.toastMsg('মোবাইল নম্বর সঠিকভাবে লিখুন', false);
    } else if (!this.commonService.mobileValidate(tinTelephoneNo)) {
      this.commonService.toastMsg('মোবাইল নম্বর সঠিকভাবে লিখুন', false);
    } else {

      const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
      await loading.present();

      this.notificationService.processFitnessTinInfo(tinAddress, tinCircle, tinDistrict, tinName, tinNo, tinTelephoneNo, tinType, tinZone, nbrSubTinTypeName, this.billFor)
          .subscribe(result => {

            let totalBill = 0;
            let billData = [];

            if (result['status'] == 200 && result['data'].paymentDetailslist) {

              result['data'].paymentDetailslist.forEach(function(val) {
                totalBill = parseFloat(String(totalBill)) + parseFloat(val.totalFee);
              });

              billData = result['data'].paymentDetailslist;
              this.commonService.setItem('billData', billData);
              this.commonService.setItem('totalBill', totalBill);

              this.router.navigate(['/bill-info'], {
                queryParams: {
                  billFor: 'FITNESS'
                }

              });
            } else {
              this.commonService.toastMsg(result['message'], false);
            }

            loading.dismiss();
          }, err => function(e) {
            console.log(e.getMessages());
            loading.dismiss();
          });
    }
  }

  async descardTransaction() {
    let that = this;
    const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
    await loading.present();
    this.notificationService.descardTransaction()
    .subscribe(result => {
      if (result['status'] == 200) {
        let msg = (result['data'].statusMessage)?result['data'].statusMessage:'Discard transaction successfully done.';
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

  async onSearchTinNumber() {

    let tinNo = this.tinNo;
    if (this.commonService.inputFieldEmptyChecker(tinNo)) {
      this.commonService.toastMsg('টিআইএন নম্বর লিখুন', false);
    } else if ((tinNo.toString().length < 10) || (tinNo.toString().length > 12)) {
      this.commonService.toastMsg('টিআইএন নম্বর এ ১০ সংখ্যা অথবা ১২ সংখ্যা দিন', false);
    } else if (tinNo.toString().length == 11) {
      this.commonService.toastMsg('টিআইএন নম্বর এ ১০ সংখ্যা অথবা ১২ সংখ্যা দিন', false);
    } else {

      const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
      await loading.present();
      this.notificationService.searchTinInformation(this.tinNo).subscribe(
          response => {
            if (response['status'] == 200) {
              this.tinVerifyStatus = true;
              this.tinInfoBind(response);
              this.commonService.toastMsg(response['data'].msg);
              // this.tinNo = tinData.tinNo;
              // this.registrationNo = params['registrationNo'];
            } else if (response['status'] == 400) {
              this.tinInfoClear();
              this.commonService.toastMsg(response['message'], false);
            }
            loading.dismiss();
          }, error => {
            this.tinInfoClear();
            loading.dismiss();
            console.log('tin_search_error', JSON.stringify(error));
            this.commonService.toastMsg('দুঃখিত! পরে আবার চেষ্টা করুন', false);
          }
      );
    }
  }

  tinInfoBind(response) {
    let data = response['data'];
    let tinData = response['data'].data;

    this.tinName = tinData.name;

    this.tinDistrict = data.districtId;
    this.tinDistrictName = data.districtName;

    this.tinCircle = tinData.circle.circleNo;
    this.tinCircleName = tinData.circle.circleName;

    this.tinZone = tinData.zone.zoneNo;
    this.tinZoneName = tinData.zone.zoneName;

    this.tinType = data.brtaTinTypeId;
    this.tinTypeName = data.brtaTinTypeName;

    this.nbrSubTinTypeName = tinData.typeOfTin;

    this.tinAddress = data.tinAddress;
    this.tinTelephoneNo = data.tinTelephoneNo;
  }

  tinInfoClear() {
    // this.tinNo = '';
    this.tinName = '';
    this.tinDistrict = '';
    this.tinDistrictName = '';
    this.tinAddress = '';
    this.tinCircle = '';
    this.tinCircleName = '';
    this.tinZone = '';
    this.tinZoneName = '';
    this.tinType = '';
    this.tinTypeName = '';
    this.tinTelephoneNo = '';
  }
}
