import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {CommonService} from '../../services/common/common.service';
import {VehicleService} from '../../services/vehicles/vehicle.service';
import {DriverService} from '../../services/driver/driver.service';

@Component({
    selector: 'app-vehicle-tagging',
    templateUrl: './vehicle-tagging.page.html',
    styleUrls: ['./vehicle-tagging.page.scss'],
})

export class VehicleTaggingPage implements OnInit {

    ownerName: any;
    registrationNo: any;
    engineNo: any;
    chassisNo: any;
    manuYear: any;
    displayRegistrationNumber:any;
    displayOwnerName: any;
    displayChassisNo:any;
    displayEngineNo: any;
    displayManuYear: any;
    isTaggedVehicle: boolean;
    listOfVehicleRegistrationNumber: [];
    regNoDistrictCode: any = '';
    regNoVehicleClass: any = '';
    regVehicleSeries: any = '';
    regVehicleRegNo: any = '';
    regNumFirstPartList: any;
    regNumSecondPartList: any;
    vehicleSearch: any = false;

    constructor(private loadingController: LoadingController,
                private driverService: DriverService,
                private alertController: AlertController,
                private vehicleService: VehicleService, private router: Router, private commonService: CommonService) {
    }

    ngOnInit() {
        this.isTaggedVehicle = false;
        this.getVehicleRegistrationNo();
        this.getRegNumFormat();

    }

    onCancelClick() {
        this.router.navigateByUrl('vehicle-tagging');
    }

    async searchVehicles() {
        if (this.commonService.inputFieldEmptyChecker(this.registrationNo)) {
            this.commonService.toastMsg('গাড়ির রেজিস্ট্রেশন নম্বরের শেষের চারটি সংখ্যা দিন', false);
        }  else if (this.commonService.inputFieldEmptyChecker(this.chassisNo)) {
            this.commonService.toastMsg('গাড়ীর চেসিস নম্বর দিন', false);
        } else if (this.commonService.inputFieldEmptyChecker(this.engineNo )) {
            this.commonService.toastMsg('গাড়ীর ইঞ্জিন নম্বর দিন', false);
        } else if (this.commonService.inputFieldEmptyChecker(this.manuYear)) {
            this.commonService.toastMsg('উৎপাদনের বছর দিন', false);
        } else {

            const myObj = {
                chassisNoSearch: this.chassisNo,
                // engineNo: this.engineNo,
                engineNoSearch: this.engineNo,
                registrationNoSearch: this.registrationNo,
                yearOfMenufactureSearch: this.manuYear
            };

            // const postData = JSON.stringify(myObj);
            const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
            await loading.present();
            console.log('sending data to tag vehicle.', myObj);
            this.vehicleService.searchVehicles(myObj).subscribe(result => {
                console.log('vehicle searching response:', result);
                loading.dismiss();
                if (result ['status'] == 200) {
                    // this.bloodGroupList = result['data']['bloodGroupList'];

                    this.displayChassisNo = result['data']['vehicleInformation'].chassisNo;
                    this.displayEngineNo = result['data']['vehicleInformation'].engineNo;
                    this.displayRegistrationNumber = result['data']['vehicleInformation'].registrationNo;
                    this.displayManuYear = result['data']['vehicleInformation'].yearOfMenufacture;
                    this.displayOwnerName = result['data']['vehicleInformation'].personName;
                    this.vehicleSearch = true;
                    this.commonService.toastMsg('Vehicle Found');

                    // console.log("got success data: ", result['data']);
                    // this.router.navigateByUrl('/notification-details?notificationType=TAGGED_VEHICLE&notificationTypeName=Tag Vehicle');
                    // this.router.navigateByUrl('/home');
                } else {
                    this.commonService.toastMsg('Vehicle not found!', false);
                }
            });
        }
    }

    async tagVehicles(){
        const myObj = {
            chassisNo: this.displayChassisNo,
            engineNo: this.displayEngineNo,
            personName: this.displayOwnerName,
            registrationNo: this.displayRegistrationNumber,
            yearOfMenufacture: this.displayManuYear
        };

        // const postData = JSON.stringify(myObj);
        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
        await loading.present();
        console.log('sending data to tag vehicle.', myObj);
        this.vehicleService.tagVehicles(myObj).subscribe(result => {
            console.log('vehicle searching response:', result);
            loading.dismiss();
            if (result ['status'] == 200) {
                // this.commonService.toastMsg(result['message']);
                this.commonService.toastMsg('Vehicle Tagged successfully.');

                // console.log("got success data: ", result['data']);
                // this.router.navigateByUrl('/notification-details?notificationType=TAGGED_VEHICLE&notificationTypeName=Tag Vehicle');
                this.router.navigateByUrl('/home');
            } else {
                this.commonService.toastMsg(result['message'], false);
            }
        });
    }

    async untagAlert(encTagId) {
        const alert = await this.alertController.create({
            header: 'আনট্যাগ',
            message: '<small>আপনি কি আপনার এই গাড়ীটি আনট্যাগ করতে চান ?<small>',
            buttons: [
                {
                    text: 'হ্যাঁ',
                    handler: (yes) => {
                        this.unTagVehicle(encTagId);
                    }
                }, {
                    text: 'না',
                    role: 'cancel',
                    cssClass: 'danger',
                    handler: () => {
                    }
                }
            ]
        });
        await alert.present();
    }

    async unTagVehicle(encTagId) {
        const myObj = {
            encTagId: encTagId,
            registrationNo: this.registrationNo
        };
        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
        await loading.present();
        this.vehicleService.untagVehicles(myObj).subscribe(result => {
            loading.dismiss();
            if (result ['status'] == 200) {
                // this.bloodGroupList = result['data']['bloodGroupList'];
                this.commonService.toastMsg(result['data']['statusMessage']);
                this.getVehicleRegistrationNo();
            } else {
                this.commonService.toastMsg(result['message'], false);
            }
        });
    }

    async goForTagDriver(regNo, driverTagged) {
        console.log("you have al ready tagged driver", driverTagged);
        if (driverTagged == 1){
            this.tagDriver(regNo, 1);
        } else {
            const alert = await this.alertController.create({
                header: 'ড্রাইভার সংযুক্ত করণ',
                message: '<small>ড্রাইভার যাচাই এর জন্য ড্রাইভার এর মোবাইল নম্বর এ একটি OTP যাবে। এবং আপনার অ্যাপ থেকে OTP টি যাচাই করা লাগবে ।<small>',
                buttons: [
                    {
                        text: 'একমত',
                        handler: (yes) => {
                            this.tagDriver(regNo, 0);
                        }
                    }, {
                        text: 'এখন নয়',
                        role: 'cancel',
                        cssClass: 'danger',
                        handler: () => {
                        }
                    }
                ]
            });
            await alert.present();
        }

    }

    tagDriver(regNo, isDriverTagged) {
        // this.router.navigateByUrl('/notification-details?notificationType=TAGGED_VEHICLE&notificationTypeName=Tag Vehicle');
        // if (isDriverTagged){
        //     this.router.navigate(['driver-tagging'], { state: { registrationNo: regNo , isDriver: isDriverTagged} });
        // } else{
            this.router.navigateByUrl('/driver-tagging?registrationNo=' + regNo+"&isDriver="+isDriverTagged);
        // }
    }

    updateDate(event) {
        let dateFormat = event.detail.value;
        this.manuYear = this.getFormattedDate(dateFormat.split('T')[0]);
        console.log('get date:', this.manuYear);
    }

    getFormattedDate(date) {
        var getDate = date.split('-');
        var month = getDate[1];
        var day = getDate[2];
        var year = getDate[0];
        console.log('parse formet date: ', day + '/' + month + '/' + year);
        return day + '/' + month + '/' + year;
    }

    async getVehicleRegistrationNo() {
        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
        await loading.present();
        this.driverService.getVehicleInfo().subscribe(result => {
            // console.log("get list of vehicle registration number: ", result);
            // console.log("list of vehicle ", result['data']);
            if (result['status'] == 200) {
                // let vehicleList = result['data'];
                this.listOfVehicleRegistrationNumber = result['data']['vehicleInformation'];
                console.log('your cars :', this.listOfVehicleRegistrationNumber);
                // console.log("your cars registration no:", this.listOfVehicleRegistrationNumber['registrationNo']);
                if (this.listOfVehicleRegistrationNumber.length > 0) {
                    this.isTaggedVehicle = true;
                } else {
                    this.isTaggedVehicle = false;
                }
            } else {
                this.commonService.toastMsg(result['message'], false);
            }
            loading.dismiss();
        });
    }

    onRegNoDistrictCodeChange() {
        // tslint:disable-next-line:max-line-length
        this.registrationNo = this.regNoDistrictCode + '-' + this.regNoVehicleClass + '-' + this.regVehicleSeries + '-' + this.regVehicleRegNo;
    }

    onRegNoVehicleClassChange() {
        // tslint:disable-next-line:max-line-length
        this.registrationNo = this.regNoDistrictCode + '-' + this.regNoVehicleClass + '-' + this.regVehicleSeries + '-' + this.regVehicleRegNo;
    }

    onRegVehicleSeries() {
        // tslint:disable-next-line:max-line-length
        this.registrationNo = this.regNoDistrictCode + '-' + this.regNoVehicleClass + '-' + this.regVehicleSeries + '-' + this.regVehicleRegNo;
    }

    onRegVehicleRegNo() {
        // tslint:disable-next-line:max-line-length
        this.registrationNo = this.regNoDistrictCode + '-' + this.regNoVehicleClass + '-' + this.regVehicleSeries + '-' + this.regVehicleRegNo;
    }

    getRegNumFormat() {
        this.commonService.loadVehicleRegNumFirstPartList().subscribe(result => {
            if (result ['status'] == 200) {
                let tempData = result['data']['apiRegNoList'];
                let allFirstPart = [];
                for (var k in tempData) {
                    if (tempData.hasOwnProperty(k)) {
                        allFirstPart.push({'id': tempData[k].id, 'name': tempData[k].value});
                    }
                }
                this.regNumFirstPartList = allFirstPart;
                console.log('getting data 1: ', this.regNumFirstPartList);
            } else {
            }
        });

        this.commonService.loadVehicleRegNumSecondPartList().subscribe(result => {
            if (result ['status'] == 200) {
                let tempData = result['data']['apiRegNoList'];
                let allSecondPart = [];
                for (var k in tempData) {
                    if (tempData.hasOwnProperty(k)) {
                        allSecondPart.push({'id': tempData[k].id, 'name': tempData[k].value});
                    }
                }
                this.regNumSecondPartList = allSecondPart;
            } else {
            }
        });
    }
}
