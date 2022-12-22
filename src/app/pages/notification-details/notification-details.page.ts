import {Component, OnInit} from '@angular/core';

import {CommonService} from "../../services/common/common.service";
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {LoadingController} from '@ionic/angular';
import {NotificationService} from "../../services/notification/notification.service";
import {BrowsemeService} from "../../services/browseme/browseme.service";
import {NavController} from "@ionic/angular";
import {AppointmentService} from '../../services/appointment/appointment.service';
import {LearnerServiceService} from '../../services/learner/learner-service.service';


@Component({
    selector: 'app-notification-details',
    templateUrl: './notification-details.page.html',
    styleUrls: ['./notification-details.page.scss'],
})
export class NotificationDetailsPage implements OnInit {

    templateType: string;
    templateName: string;
    itemsList: any;
    nid: any;
    nidDateOfBirth: any;
    learnerDrivingLicenseData: any;
    vehicleInformationData: any;
    tinInfo:any;
    driverInformation:any;
    drivingLicenseInformation:any;
    appointmentInformation:any;
    showData: any=null;

    constructor(
        private alertController: AlertController,
        private router: Router,
        private route: ActivatedRoute,
        private commonService: CommonService,
        private appointmentService: AppointmentService,
        private notificationService: NotificationService,
        private loadingController: LoadingController,
        public browsemeService: BrowsemeService,
        private learnerService: LearnerServiceService,
        public NavCtl: NavController,

    ) { }


    ngOnInit() {
        let that = this;
        this.route
            .queryParams
            .subscribe(params => {
                this.templateName = params['notificationTypeName'];
                this.templateType = params['notificationType'];
                switch (this.templateType) {
                    case 'DRIVER_LICENSE':
                        this.templateName = 'ড্রাইভিং লাইসেন্স';
                        // this.getDriverInformation();
                        this.getDrivingLicenseInfomation();
                        break;

                    case 'LEARNER_STATUS':
                        this.templateName = 'শিক্ষানবিশ লাইসেন্স';
                        this.getLearnerLicenseList();
                        break;

                    case 'FITNESS_WILL_EXPIRE_SOON':
                        this.templateName = 'ফিটনেস মেয়াদ  শীঘ্রই  শেষ হবে';
                        this.getVehicleInformation('FITNESS_WILL_EXPIRE_SOON');
                        break;

                    case 'FITNESS':
                        this.templateName = 'মেয়াদোত্তীর্ণ ফিটনেস';
                        this.getVehicleInformation('FITNESS');
                        break;

                    case 'TAX_WILL_EXPIRE_SOON':
                        this.templateName = 'ট্যাক্স টোকেন মেয়াদ  শীঘ্রই  শেষ হবে';
                        this.getVehicleInformation('TAX_WILL_EXPIRE_SOON');
                        break;

                    case 'TAX':
                        this.templateName = 'মেয়াদোত্তীর্ণ ট্যাক্স টোকেন ';
                        this.getVehicleInformation('TAX');
                        break;

                    case 'ROUTE_PERMIT_WILL_EXPIRE_SOON':
                        this.templateName = 'রুট পারমিট মেয়াদ শীঘ্রই শেষ হবে';
                        this.getVehicleInformation('ROUTE_PERMIT_WILL_EXPIRE_SOON');
                        break;

                    case 'ROUTE_PERMIT':
                        this.templateName = 'মেয়াদোত্তীর্ণ রুট পারমিট';
                        this.getVehicleInformation('ROUTE_PERMIT');
                        break;

                    case 'APPOINTMENT_STATUS':
                        this.templateName = 'এপয়েন্টমেন্ট';
                        this.getAppointmentInformation();
                        break;

                    case 'TAGGED_VEHICLE':
                        this.templateName = 'মোটরযান সংযুক্ত করুন';
                        this.getVehicleInformation('TAGGED_VEHICLE');
                        break;

                    default:
                        this.commonService.toastMsg('দুঃখিত! পরে আবার চেষ্টা করুন', false);
                        this.router.navigateByUrl('home');
                        break;
                }
            }, err => function () {
                that.commonService.toastMsg('দুঃখিত! পরে আবার চেষ্টা করুন', false);
            });
    }


    async getLearnerLicenseList() {
        console.log('Calling', 'getLearnerLicenseList');
        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
        await loading.present();
        this.notificationService.getLearnerLicenseList().subscribe(result => {
            if (result['status'] == 200) {
                this.learnerDrivingLicenseData = result['data'].learnerLicense;
                console.log('learner license data to show: ', this.learnerDrivingLicenseData);
                if(this.learnerDrivingLicenseData.length > 0){
                    this.showData = true;
                }else{
                    this.showData = false;
                }
            } else {
                this.learnerDrivingLicenseData = [];
                this.showData = false;
            }
            loading.dismiss();
        },err => {
            loading.dismiss();
            this.showData = false;

        });
    }


    downloadLearnerLicense(item) {
        console.log('come to download : ',item);
        let encServiceRequestNo = encodeURIComponent(item.encServiceRequestNo);
        // return this.notificationService.getLearnerLicensePrint(encServiceRequestNo);
        window.open(this.notificationService.getLearnerLicensePrint(encServiceRequestNo), '_system', 'location=yes');
    }


    downloadAppointment(item){
        console.log("enc ", item);
        let encServiceRequestNo = encodeURIComponent(item);
        console.log("encoded enc ", encServiceRequestNo);
        let url = this.notificationService.getAppointmentPrint(encServiceRequestNo);
        window.open(url, '_system');
    }

    async appointmentDeleteAlert(item){

        const alert = await this.alertController.create({
            header: 'নিশ্চিতকরণ!',
            message: 'আপনি কি নিশ্চিত?',
            buttons: [
                {
                    text: 'বাতিল করুন',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        alert.dismiss();
                    }
                }, {
                    text: 'ঠিক আছে',
                    handler: () => {
                        this.deleteAppointment(item);
                    }
                }
            ]
        });

        await alert.present();

    }

    async deleteAppointment(item){
        console.log("your appointment item", item);
        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
        await loading.present();
        this.appointmentService.deleteAppointment(item).subscribe(result => {
            console.log("delete appointment: ", result);
            if (result['status'] == 200) {

                this.commonService.toastMsg(result['data'].statusMessage);
                this.router.navigateByUrl('dashboard');
            }else{
                this.commonService.toastMsg(result['message'], false);

            }
        },err => {
            console.log(err.message);

        });
        loading.dismiss();
    }


    async getVehicleInformation(cat) {
        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
        await loading.present();
        this.notificationService.getVehicleInformation().subscribe(result => {
            if (result['status'] == 200) {
                let data = [];
                result['data'].vehicleInformation.forEach(function (val, index) {
                    switch (cat) {
                        case 'FITNESS_WILL_EXPIRE_SOON':
                            if (val.fitnessExpiryDateYn == 'W') {
                                console.log("fitness expire date", val.fitnessExpiryDateYn + "fitness expiry date: ", val.fitnessExpiryDate + "data :", val);
                            }
                            if(val.fitnessExpiryDateYn == 'W' && val.fitnessExpiryDate !=''){
                                data.push({
                                    'encFitnessRuleId': val.encFitnessRuleId,
                                    'encModelYear': val.encModelYear,
                                    'encRegistrationId': val.encRegistrationId,
                                    'encOwnershipTypeId': val.encOwnershipTypeId,
                                    'encVehicleTypeId': val.encVehicleTypeId,
                                    'encRegistrationNo': val.encRegistrationNo,
                                    'encRoutePermitRuleId': val.encRoutePermitRuleId,
                                    'encTagId': val.encTagId,
                                    'encTaxTokenRuleId': val.encTaxTokenRuleId,
                                    'encVehicleClassId': val.encVehicleClassId,
                                    'fitnessExpiryDate': val.fitnessExpiryDate,
                                    'fitnessExpiryDateYn': val.fitnessExpiryDateYn,
                                    'fitnessRuleId': val.fitnessRuleId,
                                    'freeTaxTokenYN': val.freeTaxTokenYN,
                                    'modelYear': val.modelYear,
                                    'registrationId': val.registrationId,
                                    'routePermitExpiryDateYn': val.routePermitExpiryDateYn,
                                    // 'routePermitExpiryDate': val.routePermitExpiryDate,
                                    'routePermitRuleId': val.routePermitRuleId,
                                    'registrationNo': val.registrationNo,
                                    'tagId': val.tagId,
                                    'taxTokenExpiryDate': val.taxTokenExpiryDate,
                                    'taxTokenExpiryDateYn': val.taxTokenExpiryDateYn,
                                    'taxTokenRuleId': val.taxTokenRuleId,
                                    'vehicleClassId': val.vehicleClassId,
                                });
                            }
                            break;

                        case 'FITNESS':
                            if(val.fitnessExpiryDateYn == 'Y' && val.fitnessExpiryDate !=''){
                                data.push({
                                    'encFitnessRuleId': val.encFitnessRuleId,
                                    'encModelYear': val.encModelYear,
                                    'encRegistrationId': val.encRegistrationId,
                                    'encRegistrationNo': val.encRegistrationNo,
                                    'encOwnershipTypeId': val.encOwnershipTypeId,
                                    'encVehicleTypeId': val.encVehicleTypeId,
                                    'encRoutePermitRuleId': val.encRoutePermitRuleId,
                                    'encTagId': val.encTagId,
                                    'encTaxTokenRuleId': val.encTaxTokenRuleId,
                                    'encVehicleClassId': val.encVehicleClassId,
                                    'fitnessExpiryDate': val.fitnessExpiryDate,
                                    'fitnessExpiryDateYn': val.fitnessExpiryDateYn,
                                    'fitnessRuleId': val.fitnessRuleId,
                                    'freeTaxTokenYN': val.freeTaxTokenYN,
                                    'modelYear': val.modelYear,
                                    'registrationId': val.registrationId,
                                    'routePermitExpiryDateYn': val.routePermitExpiryDateYn,
                                    'routePermitExpiryDate': val.routePermitExpiryDate,
                                    'routePermitRuleId': val.routePermitRuleId,
                                    'registrationNo': val.registrationNo,
                                    'tagId': val.tagId,
                                    'taxTokenExpiryDate': val.taxTokenExpiryDate,
                                    'taxTokenExpiryDateYn': val.taxTokenExpiryDateYn,
                                    'taxTokenRuleId': val.taxTokenRuleId,
                                    'vehicleClassId': val.vehicleClassId,
                                });
                            }

                            break;

                        case 'TAX_WILL_EXPIRE_SOON':
                            if (val.taxTokenExpiryDateYn == 'W'){

                                console.log("TAX_WILL_EXPIRE_SOON", val.taxTokenExpiryDateYn + "TAX_WILL_EXPIRE_SOON date: ", val.taxTokenExpiryDate);
                            }
                            if(val.taxTokenExpiryDateYn == 'W' && val.taxTokenExpiryDate !=''){
                                data.push({
                                    'encFitnessRuleId': val.encFitnessRuleId,
                                    'encModelYear': val.encModelYear,
                                    'encRegistrationId': val.encRegistrationId,
                                    'encRegistrationNo': val.encRegistrationNo,
                                    'encRoutePermitRuleId': val.encRoutePermitRuleId,
                                    'encTagId': val.encTagId,
                                    'encOwnershipTypeId': val.encOwnershipTypeId,
                                    'encVehicleTypeId': val.encVehicleTypeId,
                                    'encTaxTokenRuleId': val.encTaxTokenRuleId,
                                    'encVehicleClassId': val.encVehicleClassId,
                                    'fitnessExpiryDate': val.fitnessExpiryDate,
                                    'fitnessExpiryDateYn': val.fitnessExpiryDateYn,
                                    'fitnessRuleId': val.fitnessRuleId,
                                    'freeTaxTokenYN': val.freeTaxTokenYN,
                                    'modelYear': val.modelYear,
                                    'registrationId': val.registrationId,
                                    'routePermitExpiryDateYn': val.routePermitExpiryDateYn,
                                    'routePermitExpiryDate': val.routePermitExpiryDate,
                                    'routePermitRuleId': val.routePermitRuleId,
                                    'registrationNo': val.registrationNo,
                                    'tagId': val.tagId,
                                    'taxTokenExpiryDate': val.taxTokenExpiryDate,
                                    'taxTokenExpiryDateYn': val.taxTokenExpiryDateYn,
                                    'taxTokenRuleId': val.taxTokenRuleId,
                                    'vehicleClassId': val.vehicleClassId,
                                });
                            }
                            break;

                        case 'TAX':
                            if(val.taxTokenExpiryDateYn == 'Y' && val.taxTokenExpiryDate !=''){
                                data.push({
                                    'encFitnessRuleId': val.encFitnessRuleId,
                                    'encModelYear': val.encModelYear,
                                    'encRegistrationId': val.encRegistrationId,
                                    'encRegistrationNo': val.encRegistrationNo,
                                    'encRoutePermitRuleId': val.encRoutePermitRuleId,
                                    'encTagId': val.encTagId,
                                    'encOwnershipTypeId': val.encOwnershipTypeId,
                                    'encVehicleTypeId': val.encVehicleTypeId,
                                    'encTaxTokenRuleId': val.encTaxTokenRuleId,
                                    'encVehicleClassId': val.encVehicleClassId,
                                    'fitnessExpiryDate': val.fitnessExpiryDate,
                                    'fitnessExpiryDateYn': val.fitnessExpiryDateYn,
                                    'fitnessRuleId': val.fitnessRuleId,
                                    'freeTaxTokenYN': val.freeTaxTokenYN,
                                    'modelYear': val.modelYear,
                                    'registrationId': val.registrationId,
                                    'routePermitExpiryDateYn': val.routePermitExpiryDateYn,
                                    'routePermitExpiryDate': val.routePermitExpiryDate,
                                    'routePermitRuleId': val.routePermitRuleId,
                                    'registrationNo': val.registrationNo,
                                    'tagId': val.tagId,
                                    'taxTokenExpiryDate': val.taxTokenExpiryDate,
                                    'taxTokenExpiryDateYn': val.taxTokenExpiryDateYn,
                                    'taxTokenRuleId': val.taxTokenRuleId,
                                    'vehicleClassId': val.vehicleClassId,
                                });
                            }
                            break;

                        case 'ROUTE_PERMIT_WILL_EXPIRE_SOON':
                            if (val.routePermitExpiryDateYn == 'W') {

                                console.log("ROUTE_PERMIT_WILL_EXPIRE_SOON", val.routePermitExpiryDateYn + "ROUTE_PERMIT_WILL_EXPIRE_SOON date: ", val.routePermitExpiryDate);
                            }
                            if(val.routePermitExpiryDateYn == 'W' && val.routePermitExpiryDate !=''){
                                data.push({
                                    'encFitnessRuleId': val.encFitnessRuleId,
                                    'encModelYear': val.encModelYear,
                                    'encRegistrationId': val.encRegistrationId,
                                    'encRegistrationNo': val.encRegistrationNo,
                                    'encRoutePermitRuleId': val.encRoutePermitRuleId,
                                    'encTagId': val.encTagId,
                                    'encTaxTokenRuleId': val.encTaxTokenRuleId,
                                    'encVehicleClassId': val.encVehicleClassId,
                                    'fitnessExpiryDate': val.fitnessExpiryDate,
                                    'fitnessExpiryDateYn': val.fitnessExpiryDateYn,
                                    'fitnessRuleId': val.fitnessRuleId,
                                    'freeTaxTokenYN': val.freeTaxTokenYN,
                                    'modelYear': val.modelYear,
                                    'registrationId': val.registrationId,
                                    'routePermitExpiryDateYn': val.routePermitExpiryDateYn,
                                    'routePermitExpiryDate': val.routePermitExpiryDate,
                                    'routePermitRuleId': val.routePermitRuleId,
                                    'registrationNo': val.registrationNo,
                                    'tagId': val.tagId,
                                    'taxTokenExpiryDate': val.taxTokenExpiryDate,
                                    'taxTokenExpiryDateYn': val.taxTokenExpiryDateYn,
                                    'taxTokenRuleId': val.taxTokenRuleId,
                                    'vehicleClassId': val.vehicleClassId,
                                });
                            }
                            break;

                        case 'ROUTE_PERMIT':
                            if(val.routePermitExpiryDateYn == 'Y' && val.routePermitExpiryDate !=''){
                                data.push({
                                    'encFitnessRuleId': val.encFitnessRuleId,
                                    'encModelYear': val.encModelYear,
                                    'encRegistrationId': val.encRegistrationId,
                                    'encRegistrationNo': val.encRegistrationNo,
                                    'encRoutePermitRuleId': val.encRoutePermitRuleId,
                                    'encTagId': val.encTagId,
                                    'encTaxTokenRuleId': val.encTaxTokenRuleId,
                                    'encVehicleClassId': val.encVehicleClassId,
                                    'fitnessExpiryDate': val.fitnessExpiryDate,
                                    'fitnessExpiryDateYn': val.fitnessExpiryDateYn,
                                    'fitnessRuleId': val.fitnessRuleId,
                                    'freeTaxTokenYN': val.freeTaxTokenYN,
                                    'modelYear': val.modelYear,
                                    'registrationId': val.registrationId,
                                    'routePermitExpiryDateYn': val.routePermitExpiryDateYn,
                                    'routePermitExpiryDate': val.routePermitExpiryDate,
                                    'routePermitRuleId': val.routePermitRuleId,
                                    'registrationNo': val.registrationNo,
                                    'tagId': val.tagId,
                                    'taxTokenExpiryDate': val.taxTokenExpiryDate,
                                    'taxTokenExpiryDateYn': val.taxTokenExpiryDateYn,
                                    'taxTokenRuleId': val.taxTokenRuleId,
                                    'vehicleClassId': val.vehicleClassId,
                                });
                            }
                            break;


                        case 'TAGGED_VEHICLE':
                            if(val.fitnessExpiryDate !='' || val.routePermitExpiryDate !='' || val.taxTokenExpiryDate !=''){
                                data.push({
                                    'encFitnessRuleId': val.encFitnessRuleId,
                                    'encModelYear': val.encModelYear,
                                    'encRegistrationId': val.encRegistrationId,
                                    'encRegistrationNo': val.encRegistrationNo,
                                    'encRoutePermitRuleId': val.encRoutePermitRuleId,
                                    'encVehicleTypeId': val.encVehicleTypeId,
                                    'encTagId': val.encTagId,
                                    'encOwnershipTypeId': val.encOwnershipTypeId,
                                    'encTaxTokenRuleId': val.encTaxTokenRuleId,
                                    'encVehicleClassId': val.encVehicleClassId,
                                    'fitnessExpiryDate': val.fitnessExpiryDate,
                                    'fitnessExpiryDateYn': val.fitnessExpiryDateYn,
                                    'fitnessRuleId': val.fitnessRuleId,
                                    'freeTaxTokenYN': val.freeTaxTokenYN,
                                    'modelYear': val.modelYear,
                                    'registrationId': val.registrationId,
                                    'routePermitExpiryDateYn': val.routePermitExpiryDateYn,
                                    'routePermitExpiryDate': val.routePermitExpiryDate,
                                    'routePermitRuleId': val.routePermitRuleId,
                                    'registrationNo': val.registrationNo,
                                    'tagId': val.tagId,
                                    'taxTokenExpiryDate': val.taxTokenExpiryDate,
                                    'taxTokenExpiryDateYn': val.taxTokenExpiryDateYn,
                                    'taxTokenRuleId': val.taxTokenRuleId,
                                    'vehicleClassId': val.vehicleClassId,
                                });
                            }
                            break;

                        default:
                            break;
                    }
                });
                this.vehicleInformationData = data;
                if(this.vehicleInformationData.length == 0){
                    loading.dismiss();
                    this.showData = false;
                }else{
                    this.showData = true;
                }

            } else {
                this.vehicleInformationData = [];
                this.showData = false;
            }

            if(!this.showData){
                this.commonService.toastMsg('দুঃখিত! কোন তথ্য পাওয়া যায় নি',false);
                this.NavCtl.pop();
            }

            loading.dismiss();
        },err => {loading.dismiss(); this.showData = false;});
    }

    goFor(billFor, data){
        console.log("getting data",data);
        let url = '/notification-details';
        let ruleId = '';
        if(billFor == 'FITNESS'){
            ruleId = data.encFitnessRuleId;
            url = '/tin-information';
        }else if (billFor == 'TAX'){
            ruleId = data.encTaxTokenRuleId;
            url = '/tin-information';
        } else if (billFor == 'ROUTE_PERMIT'){
            ruleId = data.encRoutePermitRuleId;
            url = '/bill-info';
        } else{
            this.commonService.toastMsg('দুঃখিত! পরে আবার চেষ্টা করুন', false);
        }

        console.log("encOwnershipTypeId" , data.encOwnershipTypeId);
        console.log("encVehicleTypeId" , data.encVehicleTypeId);

        let params = {
            encModelYear: data.encModelYear,
            encOwnershipTypeId: data.encOwnershipTypeId,
            encRegistrationNo: data.encRegistrationNo,
            encRuleId: ruleId,
            encTagId: data.encTagId,
            encVehicleTypeId: data.encVehicleTypeId,
            encVehicleClassId: data.encVehicleClassId,
            registrationNo: data.registrationNo,
            billFor: billFor
        };
        if (billFor == 'ROUTE_PERMIT'){
            this.router.navigate([url], {queryParams: params});
        } else{
            console.log("check for tin");
            this.shouldGOForTin(params, url, billFor);
        }

    }


    async shouldGOForTin(params, url, billFor) {

        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
        await loading.present();

        /* this.notificationService.tinDistrictList().subscribe(result => {
          this.tinDistrictList = result['data'].tinDistrictList;
        }); */

        /* this.notificationService.tinTypeList().subscribe(result => {
          this.tinTypeList = result['data'].tinTypelist;
        }); */

        console.log('sending params ', params);


            this.notificationService.getFitnessTinInfo(params['encModelYear'], params['encRegistrationNo'],
                params['encRuleId'], params['encTagId'], params['encVehicleClassId'],params['encVehicleTypeId'] , params['encOwnershipTypeId'], billFor)
                .subscribe(result => {
                        if (result['status'] == 200) {
                            console.log("tin required ?" ,result['data']);
                            if(!result['data'].tinRequired){

                                let totalBill = 0;
                                let billData = [];
                                result['data'].paymentDetailslist.forEach(function(val) {
                                    totalBill = parseFloat(String(totalBill)) + parseFloat(val.totalFee);
                                });

                                billData = result['data'].paymentDetailslist;
                                this.commonService.setItem('billData', billData);
                                this.commonService.setItem('totalBill', totalBill);
                                loading.dismiss();
                                if (billFor == 'TAX') {
                                    this.router.navigate(['/bill-info'], {
                                        queryParams: {
                                            billFor: 'TAX'
                                        }

                                    });
                                }else if (billFor == 'FITNESS'){
                                    this.router.navigate(['/bill-info'], {
                                        queryParams: {
                                            billFor: 'FITNESS'
                                        }

                                    });
                                }

                                return;
                            }else{
                                loading.dismiss();
                                this.router.navigate([url], {queryParams: params});
                            }

                        } else if (result['success'] == false) {
                            this.commonService.toastMsg(result['message'], false);

                        }
                        loading.dismiss();
                    }
                );


    }

    async getDriverInformation() {
        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
        await loading.present();
        this.notificationService.getDriverInformation().subscribe(result => {
            if (result['status'] == 200) {
                this.driverInformation = result['data'].drivingLicense;
                console.log("driver info", this.driverInformation.length);
                if(this.driverInformation.length > 0){
                    this.showData = true;
                }else{
                    this.showData = false;
                }
            } else {
                this.driverInformation = [];
                this.showData = false;

            }

            console.log('this.driverInformation',this.driverInformation);

            loading.dismiss();
        },err => {
            loading.dismiss();
            console.log(err.message);
            this.driverInformation = [];
            this.showData = false;
        });

        if(this.showData == false){
            this.commonService.toastMsg('দুঃখিত! কোন তথ্য পাওয়া যায় নি',false);
            this.NavCtl.pop();
        }


    }

    async getDrivingLicenseInfomation() {
        console.log('Calling', 'getNewDataList');
        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
        await loading.present();
        this.notificationService.getDrivingDataList().subscribe(result => {

            console.log('sdfdsf',result);

            if (result['status'] == 200) {
                this.drivingLicenseInformation = result['data'].dlApplicationInfo;
                console.log('newDataListData to show: ', this.drivingLicenseInformation);
                if(this.drivingLicenseInformation.length > 0){
                    this.showData = true;
                }else{
                    this.showData = false;
                }
            } else {
                this.drivingLicenseInformation = [];
                this.showData = false;
            }
            loading.dismiss();
        },err => {
            loading.dismiss();
            this.showData = false;

        });
    }

    async getAppointmentInformation() {
        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
        await loading.present();
        this.notificationService.getAppointmentInformation().subscribe(result => {
            if (result['status'] == 200) {
                this.appointmentInformation = result['data'].appointmentTime;
                if(this.appointmentInformation.length > 0){
                    this.showData = true;
                }else{
                    this.showData = false;
                }
            } else {
                this.appointmentInformation = [];
                this.showData = false;
            }

            loading.dismiss();
        },err => {loading.dismiss(); this.showData = false;});
    }

    gotoLearnerLicenseApplication(encCitizenDLId)
    {
        this.router.navigate(['/driving-license-application'], {queryParams: {'serviceNo': encCitizenDLId, 'notification': 'edit'}});
        // this.getNidNumber(serviceRequestNo);
        // console.log("notification edit ", serviceRequestNo);
        // this.router.navigate(['learner-license-application'], { state: { serviceRequestId: serviceRequestNo } });
    }

    async getNidNumber(serviceRequestNo = '') {

        const editLoading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
        editLoading.present();
        const myObj = {
            serviceRequestNo: serviceRequestNo
        };

        this.learnerService.getEditData(myObj).subscribe(result => {
            if (result['status'] == '200') {
                let tempData = result['data']['learnerDrivingLicense'];
                // this.nid = tempData['nationalId'];
                // this.nidDateOfBirth = tempData['dateOfBirth'];
                console.log('nid date of birth: ', tempData['dateOfBirth']);
                editLoading.dismiss();
                this.router.navigate(['/learner-license-application'], {queryParams: {'serviceNo': serviceRequestNo, 'notification': 'edit', 'nid': tempData['nationalId'] , 'nidDob': tempData['dateOfBirth']}});

            } else {
                this.commonService.toastMsg(result['message']);
                editLoading.dismiss();
            }


        });
    }


}
