import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {CommonService} from '../../services/common/common.service';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.page.html',
    styleUrls: ['./forget-password.page.scss'],
})

export class ForgetPasswordPage implements OnInit {

    email: any = '';
    isMobileSelected: boolean = true;
    mobileNumber: any = '';
    forgotPasswordUrl: any;
    mobileOrEmail: any;

    constructor(private router: Router, private commonService: CommonService, private loadingCtrl: LoadingController) {
        this.forgotPasswordUrl = this.commonService.apiBaseUrl + 'login/forgetPass';
        this.mobileOrEmail = 'MOBILE';
    }

    ngOnInit() {
    }

    onCancelClicked() {
        this.router.navigateByUrl('login');
    }

    changeSigment(event: any) {
        console.log('sigment', event);
        if (event === 'EMAIL') {
            this.mobileNumber = '';
            this.mobileOrEmail = 'EMAIL';
            this.isMobileSelected = false;
        } else {
            this.email = '';
            this.mobileOrEmail = 'MOBILE';
            this.isMobileSelected = true;
        }
    }

    onForgotPassClicked() {
        console.log('calling api');

        if (!this.isMobileSelected && !this.commonService.inputFieldEmptyChecker(this.email)) {
            if (!this.commonService.emailValidate(this.email)) {
                this.commonService.toastMsg('সঠিক ইমেইল লিখুন', false);
                return;
            }
        } else if (this.isMobileSelected && !this.commonService.inputFieldEmptyChecker(this.mobileNumber)) {

            if (this.mobileNumber.toString().length == 10) {
                this.mobileNumber = '0'+this.mobileNumber;
            }
            if (this.mobileNumber.toString().length < 10 || !this.commonService.mobileValidate(this.mobileNumber)) {
                this.commonService.toastMsg('সঠিক মোবাইল নম্বর লিখুন', false);
                return;
            }
            // if (!this.commonService.mobileValidate(this.mobileNumber)) {
            //     this.commonService.toastMsg('সঠিক মোবাইল নাম্বার লিখুন', false);
            // }else{
            //     this.commonService.toastMsg('you select Mobile number and its not valid');
            //     console.log('wrong mobile', this.mobileNumber);
            // }
            // this.mobileOrEmail = "MOBILE";
        } else if (this.commonService.inputFieldEmptyChecker(this.email) && this.commonService.inputFieldEmptyChecker(this.mobileNumber)) {
            this.commonService.toastMsg('মোবাইল নাম্বার অথবা ইমেইল, যে কোন একটি ডাটা দিন।', false);
            return;
        }

            this.loader(true);

            const forgotPassObj = {
                contactNo: this.mobileNumber,
                email: this.email,
                resetType: this.mobileOrEmail
            };
            console.log('forgot pass obj', forgotPassObj);
            this.commonService.setReq('POST', this.forgotPasswordUrl, forgotPassObj).subscribe(
                response => {
                    if (response['status'] === 200) {
                        this.commonService.toastMsg(response['data'].statusMessage, true);
                        console.log('mobile selected', this.isMobileSelected);
                        if (this.isMobileSelected == true){
                            console.log('navigating to change-password', this.isMobileSelected);
                            const navigationExtras: NavigationExtras = {state: {phoneNo: this.mobileNumber, where: ''}};
                            this.router.navigateByUrl('c-password', navigationExtras);
                            // this.router.navigate(['change-password'], {state: { phoneNo:  this.mobileNumber}});
                            // this.router.navigateByUrl('login');
                            // this.router.navigateByUrl('change-password');
                        }
                    } else {
                        this.commonService.toastMsg(response['message'], false);
                    }
                    console.log('password_forgot_response', response);
                    this.loader(false);
                }, error => {
                    console.log('password_forgot_error', JSON.stringify(error));
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
