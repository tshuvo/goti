import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {CommonService} from '../../services/common/common.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  // nidMobileNumber: any;
  mobile: any;
  password: any;
  name: any;
  email: any;
  dateOfBirth: any;
  nid: any;
  dob: any;
  re_password: any;
  serviceData: any;

  nidForNid: any;
  nidPhoneNumber: any;
  nidDateOfBirth: any;
  showNidOption: any = true;
  doReadOnly = false;
  where: any;
  nidVerificationData: any;
  mobileReadOnly: any = false;
  constructor(
      private commonService: CommonService,
      private menuCtrl: MenuController,
      private userService: UserService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.where = this.router.getCurrentNavigation().extras.state.where;
        if (this.where === 'justName') {
          this.mobileReadOnly = true;
          this.name = this.router.getCurrentNavigation().extras.state.name;
        }else{
          this.mobile = this.router.getCurrentNavigation().extras.state.phoneNo;
        }
      }
    });

  }

  ionViewWillEnter() {
    // console.log('navigation data', this.router.getCurrentNavigation());
    // if (this.router.getCurrentNavigation() != null){
    //   this.name = this.router.getCurrentNavigation().extras.state.userName;
    // }
    // // this.router.getCurrentNavigation().extras.state.serviceRequestId;
    // console.log('data from nid 2', this.name);
  }

  updateDate(event){

    let dateFormat = event.detail.value;

    // this.dateOfBirth = dateFormat.split('T')[0];
    console.log('get date:', this.dateOfBirth );
  }

  isdigit=(value)=>{
    const val=Number(value)?true:false;
    console.log(val);
    return val
  };

  async checkNidOption(){
    console.log('check number',this.isdigit(this.nidForNid));
    if(!this.isdigit(this.nidForNid)){
      this.commonService.toastMsg('আপনার জাতীয় পরিচয় পত্র নম্বর সঠিকভাবে লিখুন', false);
    }
    console.log('get nid date of birth: ', this.nidDateOfBirth);
    if (this.nidDateOfBirth.length > 10) {
      this.nidDateOfBirth = this.getFormattedDate(this.nidDateOfBirth.split('T')[0]);
    }
    console.log('get formatted date of birth: ', this.nidDateOfBirth);
    if (this.nidDateOfBirth === undefined || this.nidDateOfBirth == null || this.nidDateOfBirth === '') {
      this.commonService.toastMsg('আপনার জন্ম তারিখ লিখুন', false);
    } else if (this.nidForNid === undefined || this.nidForNid == null || this.nidForNid === '') {
      this.commonService.toastMsg('আপনার জাতীয় পরিচয় পত্র নম্বর লিখুন', false);
    } else {
      const dataObj = {
        dob: this.nidDateOfBirth,
        nid: this.nidForNid,
        otp: '',
        otpFound: '',
        registerMobileNumber: '0'+this.nidPhoneNumber,

      };

      // const postData = JSON.stringify(dataObj);
      const loading = await this.loadingController.create({message: 'অপেক্ষা করুন..'});
      await loading.present();
      this.userService.checkNid(dataObj).subscribe(result => {
        loading.dismiss();
        if (result ['status'] == 200) {
          this.showNidOption = false;
          this.doReadOnly = true;
          // this.bloodGroupList = result['data']['bloodGroupList'];
          console.log('get nid data: ', result);
          // return;
          // this.name = result['data'].name_en;
          // this.bnguserName = result['data'].name_bn;
          // console.log('nid dob before api calling: ', this.dateOfBirth);
          this.dateOfBirth = result['data'].dob;
          console.log('nid dob after api calling: ', this.dateOfBirth);
          // this.bngFatherName = result['data'].father_name;
          // this.bngMotherName = result['data'].mother_name;
          this.nid = result['data'].nid;
          this.mobile = result['data'].registerMobileNumber;
          this.commonService.toastMsg(result['data'].message);
          // this.gender = result['data'].gender;
          console.log('sending data by navigation', this.mobile +"//"+ this.nidDateOfBirth+"//"+ this.nidForNid);
          // this.router.navigate(['otp'], {state: {serviceRequestId: 'registration',
          //     phoneNo:  this.mobile, dob: this.nidDateOfBirth, nid: this.nidForNid
          //   }});

          this.router.navigate(['otp'], {state: {serviceRequestId: 'registration', phoneNo:  this.mobile , dob: this.nidDateOfBirth, nid: this.nidForNid}});
        } else {
            this.commonService.toastMsg(result ['message'],false);
        }

      });
    }
  }

  async userSignUp() {
    // var v = new Date(Date.parse(this.dateOfBirth));
    // var age = this.commonService.getAge(v);



    if (this.name === undefined || this.name == null || this.name === '') {
      this.commonService.toastMsg('আপনার নাম লিখুন', false );
    }
    // else if (this.email === undefined || this.email == null || this.email === '' || !this.commonService.emailValidate(this.email)) {
    //   this.commonService.toastMsg('আপনার ইমেইল লিখুন', false );
    // }
    else if (this.mobile === undefined || this.mobile == null || this.mobile === '') {
      this.commonService.toastMsg('আপনার মোবাইল নম্বর লিখুন', false );
    } else if (this.mobile.toString().length < 10 || !this.commonService.mobileValidate( this.mobile)) {
       console.log('error is in data match: ', this.commonService.mobileValidate(this.mobile) + this.mobile);
      this.commonService.toastMsg('সঠিক মোবাইল নম্বর লিখুন', false );
    } else if (this.dateOfBirth === undefined || this.dateOfBirth == null || this.dateOfBirth === '') {

      this.commonService.toastMsg('আপনার জন্ম তারিখ লিখুন', false );
    } else if (this.nid === undefined || this.nid == null || this.nid === '' || this.nid.toString().length < 10 || this.nid.toString().length > 17) {
      this.commonService.toastMsg('সঠিক জাতীয় পরিচয় পত্র নম্বর লিখুন', false );
    } else if (this.password === undefined || this.password.toString().length < 6 || this.password.toString().length > 15) {
      this.commonService.toastMsg('আপনার পাসওয়ার্ড ছয় থেকে পনেরো ডিজিটের মধ্যে লিখুন', false );
    } else if (this.re_password === undefined || this.re_password.toString().length < 6 || this.re_password.toString().length > 15) {
      this.commonService.toastMsg('আপনার পাসওয়ার্ড নিশ্চিত করুন', false );
    }

    /*else if (this.address === undefined || this.address == null || this.address === '') {
       this.commonService.toastErrMsg('Enter address.');
   }else if (this.postalCode === undefined || this.postalCode == null || this.postalCode === '') {
       this.commonService.toastErrMsg('Enter post code.');
   } else if (this.postalCode.toString().length < 4 || this.postalCode.toString().length > 4) {
       this.commonService.toastErrMsg('Invalid post code.');
   } else if (this.doc_type === undefined || this.doc_type == null || this.doc_type === '') {
       this.commonService.toastErrMsg('Please select identification option.');
   } else if (this.nid === undefined || this.nid == null || this.nid === '') {
       this.commonService.toastErrMsg('Please enter NID.');
   } else if (this.dateOfBirth === undefined || this.dateOfBirth == null || this.dateOfBirth === '') {
       this.commonService.toastErrMsg('Please date of birth.');
   } else if (this.p_gender === undefined || this.p_gender == null || this.p_gender === '') {
       this.commonService.toastErrMsg('Please select gender.');
   }*/
    else if (this.password != this.re_password) {
      this.commonService.toastMsg('পাসওয়ার্ড মেলেনি', false );
    }
    else {

      /*var v = new Date(Date.parse(this.dateOfBirth));
      var age = this.commonService.getAge(v);
      if (age < 18) {
          this.commonService.toastErrMsg('Your are under age');
          return;
      }

      if(this.doc_type == 'NID'){
          if (this.nid.toString().length ==13 || this.nid.toString().length ==17 || this.nid.toString().length ==10 ) {

          }else{
              this.commonService.toastErrMsg('Provide Your Valid National ID.');
              return;
          }

      }else{
          if(this.nid.toString().length<13 || this.nid.toString().length>17){
              this.commonService.toastErrMsg('Provide Your Valid Birth Cirtificate Number.');
              return;
          }
      }*/

      // var day =  v.getMonth()+ 1;
      // var birthYear = v.getDate() + '-' + (v.getMonth() + 1) + '-' + v.getFullYear();
      console.log('get nid date l:', this.dateOfBirth.length );
      console.log('get nid date:', this.dateOfBirth );
      let formattedDate;
      if (this.dateOfBirth.length == 10){
        console.log('length perfect');
        formattedDate = this.dateOfBirth;
      }else{
        console.log('length not perfect');
        formattedDate = this.getFormattedDate(this.dateOfBirth.split('T')[0]);
      }
      console.log('get formatted date:', formattedDate );

      // if (this.nidMobileNumber.toString().length === 10){
      //   this.nidMobileNumber =  this.nidMobileNumber;
      // }

      const myObj = {
        registerCpassword: this.re_password,
        registerDateOfBirth: formattedDate,
        registerMobileNumber:  this.mobile,
        registerName: this.name,
        registerNidNo: this.nid,
        registerPassword: this.password,
        user_email: this.email
      };
      const postData = JSON.stringify(myObj);

      console.log("sending data: ", postData);

      const loading = await this.loadingController.create({ message: 'অপেক্ষা করুন'});
      await loading.present();
      this.serviceData = this.userService.userSignUp(postData).subscribe(result => {
        loading.dismiss();

        console.log("registration massage: ", result);
        if (result['status'] == 200){
          this.commonService.toastMsg(result['data'].statusMessage);
          this.router.navigateByUrl('login');
        }else{
          this.commonService.toastMsg(result['message'], false );
        }

        // this.information = result;
        // if (result['STATUS']['CODE'] == 1) {
        //   this.commonService.toastMsg(result['STATUS']['MSG']);
        //   this.router.navigateByUrl('login');
        //
        // } else {
        //   this.commonService.toastErrMsg( result['STATUS']['MSG']);
        // }
      }, err => {
        // console.log(err.error.errors[0].message);
        this.commonService.toastMsg(err.error.errors[0].message, false );
        loading.dismiss();
      });
    }
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
