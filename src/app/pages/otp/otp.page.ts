import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {CommonService} from '../../services/common/common.service';
import {LearnerServiceService} from '../../services/learner/learner-service.service';
import {LoadingController} from '@ionic/angular';
import {UserService} from '../../services/user/user.service';

@Component({
    selector: 'app-otp',
    templateUrl: './otp.page.html',
    styleUrls: ['./otp.page.scss'],
})

export class OtpPage implements OnInit {

    otpTimeCounter: number;
    varificationCode: number;
    serviceRequestNo: any;
    phoneNo: any;
    dateOFBirth: any;
    nidFromNid: any;


    constructor(public activatedRoute: ActivatedRoute, private commonService: CommonService,
                public loadingController: LoadingController, private userService: UserService,
                public route: Router, private learnerService: LearnerServiceService) {
    }

    ngOnInit() {
        this.setCounter(60);
        this.serviceRequestNo = this.route.getCurrentNavigation().extras.state.serviceRequestId;

        this.phoneNo = this.route.getCurrentNavigation().extras.state.phoneNo;
        if (this.serviceRequestNo == 'registration'){
            this.dateOFBirth = this.route.getCurrentNavigation().extras.state.dob;
            this.nidFromNid = this.route.getCurrentNavigation().extras.state.nid;
        }

        console.log('otp page serviceRequestNo', this.serviceRequestNo);
        console.log('otp page phoneNo', this.phoneNo);

    }


    async verifyOtp() {

        if (this.serviceRequestNo == 'login'){
            let subString = "@";
            let contactNO = '';
            if (this.phoneNo.includes(subString)) {
                contactNO = this.phoneNo;
            } else {
                contactNO =  this.phoneNo;
            }

            const myObj = {
                contactNo: contactNO,
                otp: this.varificationCode

            };

            const postData = JSON.stringify(myObj);
            console.log('i am sending', postData);

            this.learnerService.validateLoginOtp(postData).subscribe(result => {
                console.log('otp result: ', result);
                if (result['status'] == '200') {
                    this.commonService.toastMsg(result['data']['statusMessage']);
                     this.route.navigateByUrl('login');

                } else {
                    this.commonService.toastMsg('দয়া করে সঠিক OTP লিখুন', false);
                }
            });

        }else if(this.serviceRequestNo == 'registration'){

            const dataObj = {
                dob: this.dateOFBirth,
                nid: this.nidFromNid,
                otp: this.varificationCode,
                otpFound: 'Y',
                registerMobileNumber: this.phoneNo

            };

            // const postData = JSON.stringify(dataObj);
            const loading = await this.loadingController.create({message: 'অপেক্ষা করুন..'});
            await loading.present();
            this.userService.checkNid(dataObj).subscribe(result => {
                loading.dismiss();
                if (result ['status'] == 200) {
                    let data = result['data'].name_en;
                    console.log('sending name 1', result['data'].name_en);

                    // this.route.navigate(['registration'], {state: {userName: data}});
                    const navigationExtras: NavigationExtras = {state: {name: data, where: 'justName'}};
                    this.route.navigateByUrl('registration', navigationExtras);
                    console.log('sending name 2', result['data'].name_en);
                }else{
                this.commonService.toastMsg(result[''])
            }});
        }

        else {

            if (this.varificationCode == undefined || this.varificationCode.toString().length < 6 ||
                this.varificationCode.toString().length > 6) {
                this.commonService.toastMsg('OTP ছয় সংখ্যায় হওয়া উচিত', false);
            } else {

                const myObj = {
                    otp: this.varificationCode,
                    serviceRequestNo: this.serviceRequestNo
                };

                const postData = JSON.stringify(myObj);
                console.log('i am sending', postData);

                this.learnerService.validateOtp(postData).subscribe(result => {
                    console.log('otp result: ', result);
                    if (result['status'] == '200') {
                        // this.route.navigateByUrl('learner-application-success');
                        this.route.navigate(['learner-application-success'], {
                            state: {
                                serviceRequestId: this.serviceRequestNo,
                                phoneNo:  this.phoneNo
                            }
                        });
                        // this.session.setMobileNumberSession(this.phoneNo);
                    } else {
                        this.commonService.toastMsg('দয়া করে সঠিক OTP লিখুন', false);
                    }
                });
            }
        }

    }

    async sendOtp() {

        if (this.serviceRequestNo == 'login'){

            let subString = "@";
            let contactNO = '';
            if (this.phoneNo.includes(subString)) {
                contactNO = this.phoneNo;
            } else {
                contactNO =  this.phoneNo;
            }
            const myObj = {
                contactNo: contactNO
            };

            const postData = JSON.stringify(myObj);
            console.log('i am sending', postData);

            this.learnerService.resendLoginOtp(postData).subscribe(result => {

                console.log('receiving result: ', result);

                if (result['status'] == '200') {
                    // this.common.toastMsg( result['STATUS']['MSG']);
                    console.log('sending mobile no', this.phoneNo);
                    this.commonService.toastMsg('পাঠানো হয়েছে');
                    this.setCounter(300);
                    // this.route.navigate(['verification',{'phone': this.phoneNo}]);
                    // this.router.navigateByUrl('/verification', {queryParams: { val: '0' + this.mobile}});
                    // this.showAlert();
                    // tslint:disable-next-line:max-line-length
                    // this.route.navigate(['learner-application-success'], { state: { serviceRequestId: this.serviceRequestNo , phoneNo: '0'+ this.phoneNo} });
                    console.log('message', result['data']);
                } else {
                    this.commonService.toastMsg(result['message'],false);
                }
            });

        }else if(this.serviceRequestNo == 'registration'){
            const dataObj = {
                dob: this.dateOFBirth,
                nid: this.nidFromNid,
                otp: this.varificationCode,
                otpFound: '',
                registerMobileNumber: this.phoneNo

            };

            // const postData = JSON.stringify(dataObj);
            const loading = await this.loadingController.create({message: 'অপেক্ষা করুন..'});
            await loading.present();
            this.userService.checkNid(dataObj).subscribe(result => {
                loading.dismiss();
                if (result ['status'] == 200) {
                    this.commonService.toastMsg('পাঠানো হয়েছে');
                    this.setCounter(300);
                }else {
                    this.commonService.toastMsg(result['message'],false);
                }

            })

        }

        else{

            const myObj = {
                ph_No_cell: this.phoneNo,
                serviceRequestNo: this.serviceRequestNo
            };

            const postData = JSON.stringify(myObj);
            console.log('i am sending', postData);

            this.learnerService.resendOtp(postData).subscribe(result => {

                console.log('receiving result: ', result);

                if (result['status'] == '200') {
                    // this.common.toastMsg( result['STATUS']['MSG']);
                    console.log('sending mobile no', this.phoneNo);
                    this.commonService.toastMsg('পাঠানো হয়েছে');
                    this.setCounter(300);
                    // this.route.navigate(['verification',{'phone': this.phoneNo}]);
                    // this.router.navigateByUrl('/verification', {queryParams: { val: '0' + this.mobile}});
                    // this.showAlert();
                    // tslint:disable-next-line:max-line-length
                    // this.route.navigate(['learner-application-success'], { state: { serviceRequestId: this.serviceRequestNo , phoneNo: '0'+ this.phoneNo} });
                    console.log('message', result['data']);
                } else {
                    this.commonService.toastMsg(result['message'],false);

                }
            });
        }

    }

    setCounter(time) {
        this.otpTimeCounter = time;
        const interval = setInterval(() => {
            this.otpTimeCounter--;
            if (this.otpTimeCounter === 0) {
                clearInterval(interval);
            }
        }, 1000);
    }
}
