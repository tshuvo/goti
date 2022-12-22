import { Component, OnInit } from '@angular/core';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import {CommonService} from "../../services/common/common.service";
import {Events, LoadingController, MenuController, Platform, ToastController} from '@ionic/angular';
import {UserService} from "../../services/user/user.service";
import {Router} from '@angular/router';
import {AuthenticationService} from "../../services/auth/Authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  mobile: any ;
  password: any ;
  deviceId: any;
  serviceData: any;
  passwordInputType: any = 'password';
  passwordViewIcon: any = 'eye-off';

  constructor(
      private uniqueDeviceID: UniqueDeviceID,
      private commonService: CommonService,
      private menuCtrl: MenuController,
      private userService: UserService,
      private platform: Platform,
      public loadingController: LoadingController,
      private router: Router,
      public authenticationService: AuthenticationService,
      public events: Events
  ) {
    this.getDeviceInfo();
    this.events.publish('versionControlChecker');
  }

  ngOnInit() {

  }

  async getDeviceInfo() {
    let that = this;
    this.uniqueDeviceID.get()
    .then((uuid: any) => {
      that.deviceId = uuid;
    })
    .catch((error: any) => {
      that.deviceId = 'UNKNOWN-'+ Math.random();
    });
  }

  forgetPassword(){
    this.router.navigateByUrl('forget-password');
  }

  async userLogin() {

    if (this.mobile === undefined || this.mobile == null || this.mobile === '') {
      this.commonService.toastMsg('আপনার মোবাইল বা ইমেল ঠিকানা লিখুন', false);
    } else if (this.password === undefined || this.password.toString().length < 6 || this.password.toString().length > 15) {
      this.commonService.toastMsg('আপনার পাসওয়ার্ড ছয় থেকে পনেরো ডিজিটের মধ্যে লিখুন', false);
    } else {
      const dataObj = {
        deviceId: this.deviceId,
        loginName: this.mobile,
        password: this.password,
        typeOfDevice: this.platform.platforms()[0]
      };

      const postData = JSON.stringify(dataObj);
      const loading = await this.loadingController.create({message: 'অপেক্ষা করুন..'});
      await loading.present();
      this.serviceData = this.userService.userLogin(postData).subscribe(result => {
        loading.dismiss();
        if (result['status'] == 200) {
          if (result['data'].nidVerifiedYN == "N"){
            this.commonService.setItem('token', result['data'].token);
            this.router.navigateByUrl('nidverification');
            return;
          }
          this.commonService.setItem('nid', result['data'].nidVerifiedYN);
          this.commonService.setItem('token', result['data'].token);
          this.commonService.setItem('userName', result['data'].userName);
          this.commonService.setItem('userPhone', result['data'].contactNo);
          this.commonService.setItem('userEmail', result['data'].email);
          this.commonService.setUserPhotoForMenu(result['data'].photo);

          this.authenticationService.login(result);
          this.router.navigateByUrl('home');
        }else if(result['status'] == 204){
          this.commonService.toastMsg(result['message']);
          this.router.navigate(['otp'], {state: {serviceRequestId: 'login', phoneNo:  this.mobile}});
        } else {
          this.commonService.toastMsg(result['message'], false);
        }
      }, err => {
        loading.dismiss(); 
        if(err.error.hasOwnProperty('errors')){
          this.commonService.toastMsg(err.error.errors[0].message, false);
        }else{
          this.commonService.toastMsg('দুঃখিত! পরে আবার চেষ্টা করুন', false);
        }       
      });
    }
  }

    onPasswordViewClicked() {
        if (this.passwordViewIcon == 'eye-off') {
            if (!this.commonService.inputFieldEmptyChecker(this.password)) {
                this.passwordViewIcon = 'eye';
                this.passwordInputType = 'text';
            }
        } else if (this.passwordViewIcon == 'eye') {
            this.passwordViewIcon = 'eye-off';
            this.passwordInputType = 'password';
        }
    }
}
