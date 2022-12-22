import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../services/common/common.service';
import {AlertController, LoadingController, MenuController, Platform} from '@ionic/angular';
import {DriverService} from '../../services/driver/driver.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-driver-tagging',
  templateUrl: './driver-tagging.page.html',
  styleUrls: ['./driver-tagging.page.scss'],
})
export class DriverTaggingPage implements OnInit {

  dateOfBirth: any;
  drivingLicenseNo: any;
  mobile: any;
  serviceData: any;
  registrationNumber: any;
  address: any;
  authorityName: any;
  serverDob: any;
  expiryDate: any;
  fathersName: any;
  issueDate; any;
  licenseClass: any;
  licenseType: any;
  name: any;
  photo: any;
  referenceNo: any;
  showImage: any;
  checkedItems: boolean[];
  otp: any;
  isDriverTagged: any;
  isTaggedFormPartOpen: any = false;
  showOtp: boolean;
  btnPartControl: any = 'ion-hide';
  listOfTaggedDriver:[];
  listOfVehicleRegistrationNumber: [];

  constructor(
      private commonService: CommonService,
      private menuCtrl: MenuController,
      private driverService: DriverService,
      private router: Router,
      private alertController: AlertController,
      private platform: Platform,
      private route: ActivatedRoute,
      public loadingController: LoadingController
  ) {

    this.showOtp = false;
    // try {
    //   this.checkedItems = new Array(this.listOfVehicleRegistrationNumber.length);
    // } catch (e) {
    //   this.checkedItems = [];
    // }
    // this.isDriverTagged = this.router.getCurrentNavigation().extras.state.isDriver;
    // if (this.isDriverTagged){
    //   this.registrationNumber = this.router.getCurrentNavigation().extras.state.registrationNo;
    //   this.getTaggedDriverInfo();
    // } else {
    this.route.queryParams.subscribe(params => {

      this.registrationNumber = params['registrationNo'];
      this.isDriverTagged = params['isDriver'];
      console.log('getting value of driver', this.isDriverTagged);

      if (this.isDriverTagged == 1) {
        this.getTaggedDriverInfo();
      } else {
        this.isTaggedFormPartOpen = true;
      }
      // console.log("registration Number: ", params);
    });
    // }

  }

  ngOnInit() {
    // this.getVehicleRegistrationNo();
  }

  async getDriverInfo() {

    if (this.drivingLicenseNo === undefined || this.drivingLicenseNo == null || this.drivingLicenseNo === '') {
      this.commonService.toastMsg('আপনার ড্রাইভিং লাইসেন্স নম্বর লিখুন' , false );
    }  else if (this.dateOfBirth === undefined || this.dateOfBirth == null || this.dateOfBirth === '') {
      this.commonService.toastMsg('আপনার জন্ম তারিখ লিখুন', false );
    } else {
      const myObj = {
        dob: this.dateOfBirth,
        licenseNumber: this.drivingLicenseNo,
        mobile: this.mobile
      };
      // const postData = JSON.stringify(myObj);

      // console.log("sending data: ", myObj);
      const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
      await loading.present();
      this.serviceData = this.driverService.tagDriver(myObj).subscribe(result => {
        // console.log("get driving lincese data: ", result);
        if ( result['status'] == 200) {
          this.btnPartControl = '';
          this.updateFrom(result['data']['licenseTagging']['licenseResponse']);
          this.showOtp = true;
        } else {
          this.commonService.toastMsg(result['message'], false);
        }
        loading.dismiss();
      });
    }

  }

  async getVehicleRegistrationNo() {
    const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
    await loading.present();
    this.serviceData = this.driverService.getVehicleRegistrationNumber().subscribe(result => {
      // console.log("get list of vehicle registration number: ", result);
      // console.log("list of vehicle ", result['data']);
      if (result['status'] == 200) {

        // let vehicleList = result['data'];
        this.listOfVehicleRegistrationNumber = result['data'];

      } else {
        this.commonService.toastMsg(result['message'], false);
      }
      loading.dismiss();
    });
  }



  async saveTagDrivingLicense() {

    // if (this.address === undefined || this.address == null || this.address === '') {
    //   this.commonService.toastErrMsg('Please enter your driving license number.');
    // } else if (this.dateOfBirth === undefined || this.dateOfBirth == null || this.dateOfBirth === '') {
    //   this.commonService.toastErrMsg('Please give your date of birth.');
    // } else {
    // console.log("You select ", this.checkedItems);

    let finalListOfVehicles = [];
    finalListOfVehicles.push({'registrationNo' : this.registrationNumber});
    // if (this.checkedItems != null){
    //    finalListOfVehicles.push({'registrationNo': this.listOfVehicleRegistrationNumber[this.checkedItems.index]})
    // }
    // let that = this;
    // this.checkedItems.forEach(
    //     function(value,index) {
    //       console.log(value,index);
    //       if (value == true){
    //
    //         // finalListOfVehicles.push({'registrationNo' : that.listOfVehicleRegistrationNumber[index]['registrationNo']});
    //
    //         // console.log("your selected vehicles registration number: ", that.listOfVehicleRegistrationNumber[index]);
    //       }
    //     }
    // );

      // if (this.mobile === undefined || this.mobile == null || this.mobile === ''|| this.commonService.mobileValidate(this.mobile)) {
      //     this.commonService.toastMsg("আপনার মোবাইল নম্বরটি সঠিক নয়.");
      // }

    const myObj = {
      address: this.address,
      authorityName: this.authorityName,
      dob: this.serverDob,
      expiryDate: this.expiryDate,
      fathersName: this.fathersName,
      issueDate: this.issueDate,
      licenseClass: this.licenseClass,
      licenseNumber: this.drivingLicenseNo,
      licenseType: this.licenseType,
      mobile: this.mobile,
      name: this.name,
      otp: this.otp,
      photo: this.photo,
      referenceNo: this.referenceNo,
      registrationNoList: finalListOfVehicles
    };
    // const postData = JSON.stringify(myObj);

    console.log("sending data: ", myObj);
    const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
    await loading.present();
    this.serviceData = this.driverService.saveTagDriver(myObj).subscribe(result => {
      console.log("save driver data: ", result);
      if (result['status'] == 200) {
        // this.updateFrom(result['data']['licenseTagging']);
        // this.router.navigateByUrl('/notification-details?notificationType=DRIVER_LICENSE&notificationTypeName=Driving%20License');
        this.commonService.toastMsg(result['data']['statusMessage']);
        this.router.navigateByUrl('/home');
      } else {
        this.commonService.toastMsg(result['message'], false );
      }
      loading.dismiss();
    });
    // }

  }

  clearData(){
    this.address = '';
    this.authorityName = '';
    this.serverDob = '';
    this.expiryDate = '';
    this.fathersName = '';
    this.issueDate = '';
    this.licenseClass = '';
    this.licenseType = '';
    this.name = '';
    this.photo = '';
    this.referenceNo = '';
    this.showImage = '';
  }

  updateFrom(data: any){
    console.log("your massage should be: ",  data['expiryDate']);
    this.address = data['address'];
    this.authorityName = data['authorityName'];
    this.serverDob = data['dob'];
    this.expiryDate = data['expiryDate'];
    this.fathersName = data['fathersName'];
    this.issueDate = data['issueDate'];
    this.licenseClass = data['licenseClass'];
    this.licenseType = data['licenseType'];
    this.name = data['name'];
    this.photo = data['photo'];
    this.referenceNo = data['referenceNo'];
    this.showImage = `data:image/jpeg;base64,${this.photo}`;
    // this.serverDrivingLicenseNo = data[''];

  }


  updateDate(event){

    let dateFormat = event.detail.value;
    this.dateOfBirth = this.getFormattedDate(dateFormat.split('T')[0]);
    // this.dateOfBirth = dateFormat.split('T')[0];
    console.log('get date:', this.dateOfBirth );
  }

  getFormattedDate(date) {
    var getDate = date.split('-');
    var month = getDate[1];
    var day = getDate[2];
    var year = getDate[0];
    // var apiformatDate = day + '/' + month + '/' + year;
    console.log('parse formet date: ',  day + '/' + month + '/' + year);
    return  day + '/' + month + '/' + year;
  }

  async getTaggedDriverInfo() {

    console.log("you are coming for the vehicle:",  this.registrationNumber);

      const myObj = {
        registrationNo: this.registrationNumber
      };
       // const postData = JSON.stringify(myObj);

       console.log("sending data: ", myObj);
      const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
      await loading.present();
      this.serviceData = this.driverService.getTaggedDriver(myObj).subscribe(result => {
        // console.log("get driving lincese data: ", result);
        if ( result['status'] == 200) {
         console.log("getting data :", result['data']);
         this.listOfTaggedDriver = result['data'];
        } else {
          this.commonService.toastMsg(result['message'], false);
        }
        loading.dismiss();
      });


  }

  async untagAlert(encTagId, regNo) {
    const alert = await this.alertController.create({
      header: 'আনট্যাগ',
      message: '<small>আপনি কি আপনার এই গাড়ীটি আনট্যাগ করতে চান ?<small>',
      buttons: [
        {
          text: 'হ্যাঁ',
          handler: (yes) => {
            this.unTagDriver(encTagId, regNo);
          }
        }, {
          text: 'না',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }

  async unTagDriver(encTagId, registrationNo) {
    const myObj = {
      encTagId: encTagId,
      registrationNo: registrationNo
    };
    const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
    await loading.present();
    this.driverService.untagDriver(myObj).subscribe(result => {
      loading.dismiss();
      if (result ['status'] == 200) {
        // this.bloodGroupList = result['data']['bloodGroupList'];
        this.commonService.toastMsg(result['data']['statusMessage']);
        this.getVehicleRegistrationNo();
        this.router.navigateByUrl('/home');
      } else {
        this.commonService.toastMsg(result['message'], false);
      }
    });
  }

  async goForTagDriver(regNo, driverTagged) {
    console.log('you have al ready tagged driver', driverTagged);
    if (driverTagged) {
      // this.tagDriver(regNo, true);
    } else {
      const alert = await this.alertController.create({
        header: 'ড্রাইভার সংযুক্ত করণ',
        // tslint:disable-next-line:max-line-length
        message: '<small>ড্রাইভার যাচাই এর জন্য ড্রাইভার এর মোবাইল নম্বর এ একটি OTP যাবে। এবং আপনার অ্যাপ থেকে OTP টি যাচাই করা লাগবে ।<small>',
        buttons: [
          {
            text: 'একমত',
            handler: (yes) => {
              this.onDriverTaggedFormOpen();
              // this.tagDriver(regNo, false);
            }
          }, {
            text: 'এখন নয়',
            role: 'cancel',
            cssClass: 'danger',
            handler: () => {
            }
          }
        ]
      });
      await alert.present();
    }
  }

  onDriverTaggedFormOpen() {
    this.isTaggedFormPartOpen = true;
    this.isDriverTagged = 0;
  }
}
