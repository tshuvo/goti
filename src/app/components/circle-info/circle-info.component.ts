import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {CommonService} from '../../services/common/common.service';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-circle-info',
  templateUrl: './circle-info.component.html',
  styleUrls: ['./circle-info.component.scss'],
})

export class CircleInfoComponent implements OnInit, AfterViewInit {

  @Input('contactData') contactData;

  public divisionData:any=[];
  public divisionName:any;
  public circleData:any=[];
  public circleName:any;
  public showContact:boolean=false;
  public searchData: any =[];
  circlePart: any = 'ion-hide';
  buttonPart: any = 'ion-hide';

  constructor(
      public platform: Platform,
      public commonService: CommonService,
      public loadingController: LoadingController,
  ) {
    this.showContact = false;
  }

  ngOnInit() {
    this.getContactData();
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.getContactData();
    });
  }

  async getContactData() {
    /*this.contactData = [
      {
        'name':'জনাব শফিকুজ্জামান ভূইয়া 1',
        'designation': 'উপপরিচালক (ইঞ্জিনিয়ারিং)',
        'mobile': '1550051604',
        'email': 'dd_dhaka@brta.gov.bd',
        'address': 'মিরপুর,সেকশন-১৩ ঢাকা-১২১৬   ',
        'circle': 'সার্কেল-1',
        'division':'ঢাকা'
      },
      {
        'name':'জনাব শফিকুজ্জামান ভূইয়া5',
        'designation': 'উপপরিচালক (ইঞ্জিনিয়ারিং)',
        'mobile': '1550051607',
        'email': 'dd_dhaka@brta.gov.bd',
        'address': 'মিরপুর,সেকশন-১৩ ঢাকা-১২১৬   ',
        'circle': 'সার্কেল-1',
        'division':'ঢাকা'
      },
      {
        'name':'জনাব শফিকুজ্জামান ভূইয়া4',
        'designation': 'উপপরিচালক (ইঞ্জিনিয়ারিং)',
        'mobile': '1550051607',
        'email': 'dd_dhaka@brta.gov.bd',
        'address': 'মিরপুর,সেকশন-১৩ ঢাকা-১২১৬   ',
        'circle': 'ডি,ডি  সার্কেল-1',
        'division':'ঢাকা'
      },
      {
        'name':'জনাব শফিকুজ্জামান ভূইয়া3',
        'designation': 'উপপরিচালক (ইঞ্জিনিয়ারিং)',
        'mobile': '1550051607',
        'email': 'dd_dhaka@brta.gov.bd',
        'address': 'মিরপুর,সেকশন-১৩ ঢাকা-১২১৬   ',
        'circle': 'ডি,ডি  সার্কেল-1',
        'division':'ঢাকা'
      }

    ];

    this.getDivision();*/

    const loading = await this.loadingController.create({message: 'অপেক্ষা করুন111...'});
    await loading.present();
    let url = this.commonService.apiBaseUrl + "file/menu/getCircleInfo";
    this.commonService.setReq('GET',url, {}).subscribe(result => {
      console.log('result', result);
      this.contactData = result;
      this.getDivision();
    },err => {
      console.log('error', err.getMessage());
    });
    loading.dismiss();
  }

  getDivision() {
    let that = this;
    let foundNew = 0;
    this.contactData.forEach(function (data, key) {
      if(that.divisionData.length > 0){
        foundNew = 0;
        that.divisionData.forEach(function (data1, key1){
          if(data1.division == data.division){
            foundNew++;
          }
        });
        if(foundNew == 0 &&  data.division.length >0){
          that.divisionData.push({'division': data.division});
        }
      }else{
        if (data.division.length >0){
          that.divisionData.push({'division': data.division});
        }

      }
    });

  }

  getCircle() {

    this.circleName = '';
    this.circleData = [];
    this.searchData = [];

    let divisionName = this.divisionName;
    let that = this;
    let foundNew = 0;

    this.contactData.forEach(function(data, key) {
      if (data.division == divisionName) {
        if (that.circleData.length > 0) {
          foundNew = 0;
          that.circleData.forEach(function(data1, key1) {
            if (data1.circle == data.circle) {
              foundNew++;
            }
          });
          if (foundNew == 0 && data.circle.length > 0) {
            that.circleData.push({'circle': data.circle});
          }
        } else {
          if (data.circle.length > 0) {
            that.circleData.push({'circle': data.circle});
          }
        }
      }
      that.circlePart = '';
    });
  }

  searchContact() {
    let that = this;
    this.searchData = [];

    if(this.commonService.inputFieldEmptyChecker( this.divisionName )){
      this.commonService.toastMsg('বিভাগ নির্বাচন করুন', false);
    }else if(this.commonService.inputFieldEmptyChecker( this.circleName ) ){
      this.commonService.toastMsg('সার্কেল নির্বাচন করুন', false);
    }else{
      this.contactData.forEach(function (data, key) {
        if((data.division == that.divisionName) && (data.circle == that.circleName)){
          that.searchData.push(data);
        }
      });

      if(this.searchData.length > 0){
        this.showContact = true;
      }else{
        this.showContact = false;
      }
    }

  }

  onCircleChange() {
    this.buttonPart = '';
    this.searchData = [];
  }
}
