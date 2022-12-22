import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../services/common/common.service';
import {LoadingController} from '@ionic/angular';
import {LearnerServiceService} from '../../services/learner/learner-service.service';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nidverification',
  templateUrl: './nidverification.page.html',
  styleUrls: ['./nidverification.page.scss'],
})
export class NidverificationPage implements OnInit {

  nidForNid: any;
  nidDateOfBirth: any;
  validNid: any;
  validDob: any;
  validName: any;
  validGuardian: any;
  showNidData: boolean = false;
  editNid: boolean = false;

  constructor(
      private commonService: CommonService,private router: Router,
      private loadingController: LoadingController,private userService: UserService) { }

  ngOnInit() {
  }

  async checkNidOption(){
    console.log('check number',this.isdigit(this.nidForNid));
    if(!this.isdigit(this.nidForNid)){
      this.commonService.toastMsg('আপনার জাতীয় পরিচয় পত্র নম্বর সঠিকভাবে লিখুন', false);
    }
    console.log('get nid date of birth: ', this.nidDateOfBirth);
    if (this.nidDateOfBirth.length > 10) {


      this.nidDateOfBirth = this.getNidFormattedDate(this.nidDateOfBirth.split('T')[0]);
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

      };

      // const postData = JSON.stringify(dataObj);
      const loading = await this.loadingController.create({message: 'অপেক্ষা করুন..'});
      await loading.present();
      this.userService.checkNid(dataObj).subscribe(result => {
        loading.dismiss();
        console.log("api calling ", result);
        if (result ['status'] == 200) {
          console.log('get nid data: ', result);
          this.showNidData = true;
          // this.enguserName = result['data'].name_en;
          this.validName = result['data'].name_bn;
          this.validDob = result['data'].d_of_b;
          // console.log('get nid dob data: ', this.dateOfBirth);
          this.validGuardian = result['data'].father_name;
          // this.bngMotherName = result['data'].mother_name;
          this.validNid = result['data'].nid_no;
          // console.log('get nid number: ', this.nationalId);
          // // this.gender = result['data'].gender;
          //
          // this.showNidOption = false;
          // this.doReadOnly = true;

        } else {
          this.commonService.toastMsg(result['message'], false);
        }

      });
    }
  }



  getFormattedDate(date) {
    console.log("sending date for convert", date);
    var getDate = date.split('-');
    console.log("split date", getDate);
    var day = getDate[1];
    var month = getDate[2];
    var year = getDate[0];
    // var apiformatDate = day + '/' + month + '/' + year;
    return day + '/' + month + '/' + year;
  }

  getNidFormattedDate(date) {
    console.log('NId date raw', date);
    var getDate = date.split('-');
    var year = getDate[0];
    console.log('after change month', year);
    var month = getDate[1];
    console.log('after change day', month);
    var day = getDate[2];
    console.log('after change year', year);
    var apiformatDate = day + '/' + month + '/' + year;
    console.log('nid date after change', apiformatDate);
    return apiformatDate;
  }

  isdigit=(value)=>{
    const val=Number(value)?true:false;
    console.log(val);
    return val
  };

  async validateNid(){
    const dataObj = {
      dob: this.nidDateOfBirth,
      nid: this.nidForNid,

    };

    // const postData = JSON.stringify(dataObj);
    const loading = await this.loadingController.create({message: 'অপেক্ষা করুন..'});
    await loading.present();
    this.userService.validateNid(dataObj).subscribe(result => {
      loading.dismiss();
      if (result ['status'] == 200) {
        this.editNid = true;
        this.commonService.toastMsg("Nid validate successfully.");
        console.log('validet nid data: ', result);
        this.router.navigateByUrl('login');

      } else {
        this.commonService.toastMsg(result['message'], false);
      }

    });
  }
}
