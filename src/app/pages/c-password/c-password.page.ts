import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../services/common/common.service';
import {AlertController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-c-password',
  templateUrl: './c-password.page.html',
  styleUrls: ['./c-password.page.scss'],
})
export class CPasswordPage implements OnInit {

  otp: any;
  newPassword: any;
  confirmPassword: any;
  changePasswordUrl: any;
  mobileNumber: any;

  constructor(private router: Router, private commonService: CommonService,
              private alertController: AlertController, private loadingCtrl: LoadingController) {
    this.changePasswordUrl = this.commonService.apiBaseUrl + 'login/sav-new-pass-by-mobile-otp';
  }

  ngOnInit() {
    console.log('receive from change pass.');
    if (this.router.getCurrentNavigation() != null){
      this.mobileNumber = this.router.getCurrentNavigation().extras.state.phoneNo;
    }
  }

  onCancelClicked() {
    this.router.navigateByUrl('home');
  }

  onChangePasswordClicked() {
    if (this.commonService.inputFieldEmptyChecker(this.otp)) {
      this.commonService.toastMsg('ও টি পি লিখুন', false);
    } else if (this.commonService.inputFieldEmptyChecker(this.newPassword)) {
      this.commonService.toastMsg('নতুন পাসওয়ার্ড লিখুন', false);
    } else if (this.commonService.inputFieldLengthChecker(this.newPassword, 6, 15)) {
      this.commonService.toastMsg('আপনার পাসওয়ার্ড ছয় থেকে পনেরো ডিজিটের মধ্যে লিখুন', false);
    } else if (this.commonService.inputFieldEmptyChecker(this.confirmPassword)) {
      this.commonService.toastMsg('নতুন পাসওয়ার্ড নিশ্চিত করুন', false);
    } else if (this.commonService.newPassConfPassMatcher(this.newPassword, this.confirmPassword)) {
      this.commonService.toastMsg('পাসওয়ার্ড মেলেনি', false);
    } else {
      this.cpAlert();
    }
  }

  private async cpAlert() {
    const alert = await this.alertController.create({
      header: 'পাসওয়ার্ড পরিবর্তন!',
      message: '<small>আপনি কি নিশ্চিত যে আপনি পাসওয়ার্ড পরিবর্তন করতে চান?<small>',
      buttons: [
        {
          text: 'হ্যাঁ',
          handler: (yes) => {
            this.changePassword();
          }
        }, {
          text: 'না',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            console.log('No');
          }
        }
      ]
    });
    await alert.present();
  }

  private changePassword() {
    this.loader(true);
    const passwordObj = {
      otp: this.otp,
      newPassword: this.newPassword,
      contactNo: this.mobileNumber,
      confirmPassword: this.confirmPassword
    };
    this.commonService.setReq('POST', this.changePasswordUrl, passwordObj).subscribe(
        response => {
          if (response['status'] === 200) {
            this.commonService.toastMsg(response['data'].statusMessage, true);
            this.router.navigateByUrl('/login');
          } else {
            this.commonService.toastMsg(response['message'], false);
          }
          console.log('password_change_response', response);
          this.loader(false);
        }, error => {
          console.log('password_change_error', JSON.stringify(error));
          this.loader(false);
        }
    );
  }

  public async loader(start: boolean, msg: any = 'অনুগ্রহ করে অপেক্ষা করুন...') {
    if (start) {
      const loading = await this.loadingCtrl.create({
        message: '<small>' + msg + '</small>',
        backdropDismiss: true
      });
      await loading.present();
    } else {
      await this.loadingCtrl.dismiss();
    }
  }

}
