import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../services/common/common.service';
import {LoadingController, MenuController, Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {DriverService} from '../../services/driver/driver.service';

@Component({
  selector: 'app-driver-license-tagging',
  templateUrl: './driver-license-tagging.page.html',
  styleUrls: ['./driver-license-tagging.page.scss'],
})
export class DriverLicenseTaggingPage implements OnInit {

  dateOfBirth: any;
  drivingLicenseNo: any;
  serviceData: any;
  serverImage: any;
  showImage: any;
  serverDob: any;
  serverName: any;
  serverFatherName: any;
  serverVehicleClassName: any;
  serverLicenseType: any;
  issuingAuthorityName: any;
  referenceNo: any;
  issueDate: any;
  expiryDate: any;
  address: any;

  constructor( private commonService: CommonService,
               private menuCtrl: MenuController,
               private driverService: DriverService,
               private router: Router,
               private platform: Platform,
               public loadingController: LoadingController,
               ) { }

  ngOnInit() {

    if (this.serverImage === undefined || this.serverImage == null || this.serverImage === ''){
      this.showImage = "";
    }

  }

  async getDrivingLicenseInfo() {

    if (this.drivingLicenseNo === undefined || this.drivingLicenseNo == null || this.drivingLicenseNo === '') {
      this.commonService.toastMsg('আপনার ড্রাইভিং লাইসেন্স নম্বর লিখুন', false );
    }  else if (this.dateOfBirth === undefined || this.dateOfBirth == null || this.dateOfBirth === '') {
      this.commonService.toastMsg('আপনার জন্ম তারিখ লিখুন', false );
    } else {
      const myObj = {
        dob: this.dateOfBirth,
        licenseNumber: this.drivingLicenseNo
      };
      // const postData = JSON.stringify(myObj);

      console.log("sending data: ", myObj);
      const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
      await loading.present();
      this.serviceData = this.driverService.tagDrivingLicense(myObj).subscribe(result => {
        console.log("get driving lincese data: ", result);
        if (result['status'] == 200) {
          this.updateFrom(result['data']['licenseTagging']);
        } else {
          this.commonService.toastMsg(result['message'], false);
        }
        loading.dismiss();
      });
    }

  }

  async saveTagDrivingLicense() {

    // if (this.address === undefined || this.address == null || this.address === '') {
    //   this.commonService.toastErrMsg('Please enter your driving license number.');
    // } else if (this.dateOfBirth === undefined || this.dateOfBirth == null || this.dateOfBirth === '') {
    //   this.commonService.toastErrMsg('Please give your date of birth.');
    // } else {
    const myObj = {
      address: this.address,
      authorityName: this.issuingAuthorityName,
      dob: this.serverDob,
      expiryDate: this.expiryDate,
      fathersName: this.serverFatherName,
      issueDate: this.issueDate,
      licenseClass: this.serverVehicleClassName,
      licenseNumber: this.drivingLicenseNo,
      licenseType: this.serverLicenseType,
      name: this.serverName,
      photo: this.serverImage,
      referenceNo: this.referenceNo,
    };
    // const postData = JSON.stringify(myObj);

    console.log("sending data: ", myObj);
    const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
    await loading.present();
    this.serviceData = this.driverService.saveTagDrivingLicense(myObj).subscribe(result => {
      console.log("save driving lincese data: ", result);
      if (result['status'] == 200) {
        // this.updateFrom(result['data']['licenseTagging']);
        this.commonService.toastMsg(result['data']['statusMessage']);
        this.router.navigateByUrl('/notification-details?notificationType=DRIVER_LICENSE&notificationTypeName=Driving License');
      } else {
        this.commonService.toastMsg(result['message'], false );
      }
      loading.dismiss();
    });
    // }

  }

  clearData(){
    this.address = "";
    this.issuingAuthorityName = "";
    this.serverDob = "";
    this.expiryDate = "";
    this.serverFatherName = "";
    this.issueDate = "";
    this.serverVehicleClassName = "";
    this.serverLicenseType = "";
    this.serverName = "";
    this.serverImage = "";
    this.referenceNo = "";
    this.showImage = "";
  }

  updateFrom(data: any){

    this.address = data['address'];
    this.issuingAuthorityName = data['authorityName'];
    this.serverDob = data['dob'];
    this.expiryDate = data['expiryDate'];
    this.serverFatherName = data['fathersName'];
    this.issueDate = data['issueDate'];
    this.serverVehicleClassName = data['licenseClass'];
    this.serverLicenseType = data['licenseType'];
    this.serverName = data['name'];
    this.serverImage = data['photo'];
    this.referenceNo = data['referenceNo'];
    this.showImage = `data:image/jpeg;base64,${this.serverImage}`;
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

}
