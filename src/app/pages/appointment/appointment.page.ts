import { Component, OnInit } from '@angular/core';
import {LoadingController} from "@ionic/angular";
import {AppointmentService} from "../../services/appointment/appointment.service";
import {CommonService} from "../../services/common/common.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {


  public appointmentDate: any;
  public regNo: any;
  public timeSlot: any;
  public regNoList: any;
  public timeSlotList: any;
  public branchList: any;
  public branch: any;
  public mobileNumber: any;
  public emobileNumber: any;
  public showEditMObile: boolean;
  public showTimeSlot: boolean;
  mindate: any;
  maxdate: any;

  constructor(
      private loadingController: LoadingController,
      private appointmentService: AppointmentService,
      private commonService: CommonService,
      private router: Router,
  ) {
    this.mindate = new Date().toISOString();
    this.maxdate = new Date(new Date().setDate(new Date().getDate() + 20)).toISOString();
  }

  ngOnInit() {
    this.appointmentDate = '';
    this.getReg();

    this.timeSlotList = false;
    // this.showTimeSlot = false;

  }


  public updateDate(event)
  {
    let dateFormat = event.detail.value;
    this.appointmentDate = this.getFormattedDate(dateFormat.split('T')[0]);
    console.log('get date:', this.appointmentDate );
    // this.getTimeSlot();
    this.getBranchList();
  }

  public getFormattedDate(date)
  {
    var getDate = date.split('-');
    var month = getDate[1];
    var day = getDate[2];
    var year = getDate[0];
    return  day + '/' + month + '/' + year;
  }

  public getReg()
  {
    this.appointmentService.getReg().subscribe(result => {
      if (result['status'] == 200) {
        this.regNoList = result['data'];
      }
    },err => {
      console.log(err.message);
    });
  }

  async getTimeSlot()
  {
    this.timeSlot = '';
    const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
    await loading.present();
    console.log("branchID: ", this.branch);
    // this.appointmentService.getTimeSlot(this.appointmentDate, this.regNo).subscribe(result => {
    this.appointmentService.getTimeSlotByBranch(this.appointmentDate, this.branch).subscribe(result => {
      console.log("branch time slot: ", result);
      if (result['status'] == 200) {
        this.timeSlotList = result['data'];

        if(this.timeSlotList.length == 0){
          this.timeSlotList = false;
          this.showTimeSlot = false;
        }else{
          this.showTimeSlot = true;
        }
      }
    },err => {
      console.log(err.message);
      this.timeSlotList = false;
      this.showTimeSlot = false;
    });
    loading.dismiss();
  }

  async getContactNumber(){
    const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
    await loading.present();
    this.appointmentService.getContactNumberByRegistrationNo(this.regNo).subscribe(result => {
      console.log("contact number :", result);
      if (result['status'] == 200) {
        this.mobileNumber = result['data'].contactNo;
        console.log("mobile number : ", this.mobileNumber);
        if(this.mobileNumber === undefined || this.mobileNumber == null || this.mobileNumber === ''){
          console.log("mobile value : ", "false" );
          this.showEditMObile = false;
        }else {
          console.log("mobile value : ", "true" );
          this.showEditMObile = true;
        }

        console.log("mobile number editable: ", this.showEditMObile);
      }
    },err => {
      console.log(err.message);

    });
    loading.dismiss();

  }

  async getBranchList()
  {
    this.branchList = '';
    const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
    await loading.present();
    this.appointmentService.getBranchList().subscribe(result => {
      console.log("get branchList data: ", result);
      if (result['status'] == 200) {
        this.branchList = result['data'];


      }
    },err => {

    });
    loading.dismiss();
  }

  cleatAppointment()
  {
    this.appointmentDate = '';
    this.regNo='';
    this.timeSlotList = [];
    this.timeSlot=false;
    this.mobileNumber = '';
    this.branch = '';
    this.branchList = [];

  }

  async submitAppointment()
  {

    let mobile: any;
    if(this.appointmentDate == ''){
      this.commonService.toastMsg('সাক্ষাৎকারের তারিখ নির্বাচন করুন', false);
    }else if(this.regNo == '' || this.regNo == undefined){
      this.commonService.toastMsg('নিবন্ধন নম্বর নির্বাচন করুন', false);
    }
    else if(!this.showTimeSlot){
      this.commonService.toastMsg('সময় স্লট পাওয়া যায় নাই, অন্য সাক্ষাৎকার তারিখ দিয়ে চেষ্টা করুন', false);
    }else if(this.mobileNumber === undefined || this.mobileNumber == null || this.mobileNumber === ''){
      this.commonService.toastMsg('আপনার মোবাইল নম্বর টি দিন।', false);
    }else if(this.branch === undefined || this.branch == null || this.branch === ''){
      this.commonService.toastMsg('দয়াকরে যে কোন একটি শাখা বেঁছে নিন', false);
    }
    else if(this.timeSlot == ''){
      this.commonService.toastMsg('সময় স্লট নির্বাচন করুন', false);
    }else{
      const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
      await loading.present();
      this.appointmentService.submitAppointment(this.appointmentDate, this.branch, this.mobileNumber, this.regNo, this.timeSlot).subscribe(result => {
        try{
          if(result['success'] == true){
            this.commonService.toastMsg(result['data'].statusMessage);
            this.router.navigateByUrl('/notification-details?notificationType=APPOINTMENT_STATUS&notificationTypeName=Appointment');
          }else{
            this.commonService.toastMsg(result['message'], false);

          }
        }catch (e) {
          this.commonService.toastMsg('দুঃখিত! পরে আবার চেষ্টা করুন', false);

        }
        loading.dismiss();
      },err => {
        loading.dismiss();
        this.commonService.toastMsg('দুঃখিত! পরে আবার চেষ্টা করুন', false);
      });
    }


  }

}
