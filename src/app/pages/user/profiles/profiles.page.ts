import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../services/common/common.service';
import {Router} from '@angular/router';
import {ActionSheetController, Events, LoadingController, ToastController} from '@ionic/angular';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';

@Component({
    selector: 'app-profiles',
    templateUrl: './profiles.page.html',
    styleUrls: ['./profiles.page.scss'],
})

export class ProfilesPage implements OnInit {

    // -------------------------- URL
    profileUrl: any;
    bloodGroupUrl: any;
    divisionUrl: any;
    districtUrl: any;
    policeStationUrl: any;
    profileUpdateUrl: any;
    // ------------------------- PHOTO FIELD VARIABLE
    base64Image: any;
    uploadPhoto: any;
    photos: any;
    // ------------------------- INPUT FIELD VARIABLE
    logInName: any;
    email: any;
    mobileNo: any;
    userName: any;
    fatherName: any;
    motherName: any;
    address: any;
    dob: any;
    nationalId: any;
    passportNo: any;
    birthCertificateNo: any;
    postCode: any;
    gender: any;
    bloodGroupId: any;
    divisionId: any;
    districtId: any;
    policeStationId: any;
    photoSize: any;
    photoType: any;
    // --------------------- LIST TYPE VARIABLE
    bloodGroupList: any;
    divisionList: any;
    districtList: any;
    policeStationList: any;
    // --------------------------- TEMPORARY VARIABLE
    tempDisId: any;
    tempPSId: any;

    nidVerified: boolean = false;

    constructor(private commonService: CommonService, private router: Router, private camera: Camera,
                private actionsheetCtrl: ActionSheetController, public events: Events,
                private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
        // --------------------- URL INITIAL
        const urlBase = this.commonService.apiBaseUrl;
        this.bloodGroupUrl = urlBase + 'v1/user/blood-group-list';
        this.divisionUrl = urlBase + 'v1/user/division-list';
        this.profileUrl = urlBase + 'v1/user/getUserInfo';
        this.districtUrl = urlBase + 'v1/user/district-list';
        this.policeStationUrl = urlBase + 'v1/user/thana-list';
        this.profileUpdateUrl = urlBase + 'v1/user/updateUserInfo';
    }

    ngOnInit() {
        this.uploadPhoto = '/assets/icon/profile.png';
        let nidCondition = this.commonService.getItem('nid');
        console.log('nid condition: ', nidCondition);
        if (nidCondition == 'Y') {
            this.nidVerified = true;
        }else{
            this.nidVerified = false;
        }

            this.loader(true);
        this.loadBloodGroup();
        this.loadDivision();
        this.loadUserProfileData();
    }

    private async loadBloodGroup() {
        this.commonService.setReq('GET', this.bloodGroupUrl).subscribe(
            response => {
                if (response['status'] === 200) {
                    this.bloodGroupList = response['data'].bloodGroupList;
                } else {
                    this.commonService.toastMsg(response['message'], false);
                }
                console.log('blood_group_response', response);
            }, error => {
                console.log('blood_group_error', JSON.stringify(error));
            }
        );
    }

    private async loadDivision() {
        this.commonService.setReq('GET', this.divisionUrl).subscribe(
            response => {
                if (response['status'] === 200) {
                    this.divisionList = response['data'].divisionList;
                } else {
                    this.commonService.toastMsg(response['message'], false);
                }
                console.log('division_response', response);
            }, error => {
                console.log('division_error', JSON.stringify(error));
            }
        );
    }

    private loadUserProfileData() {
        this.commonService.setReq('GET', this.profileUrl).subscribe(
            response => {
                if (response['status'] === 200) {

                    const userData = response['data'].userInfo;

                    if (userData.photo !== '') {
                        this.uploadPhoto = `data:image/jpeg;base64,${userData.photo}`;
                    }

                    this.divisionId = userData.divisionId;
                    this.tempDisId = userData.districtId;
                    this.tempPSId = userData.thanaId;
                    this.loadDistrict(this.divisionId);
                    this.loadPoliceStation(this.tempDisId);
                    // this.uploadPhoto = userData.photo;
                    this.logInName = userData.loginName;
                    this.email = userData.email;
                    this.mobileNo = userData.contactNo;
                    this.userName = userData.userName;
                    this.fatherName = userData.fatherName;
                    this.motherName = userData.motherName;
                    this.address = userData.address;
                    this.nationalId = userData.nIDNo;
                    this.passportNo = userData.passportNo;
                    this.birthCertificateNo = userData.birthCertificateNo;
                    this.postCode = userData.postCode;
                    this.gender = userData.gender;
                    this.bloodGroupId = userData.bloodGroupId;

                    this.dob = this.getISODateFormat(userData.dateOfBirth);

                } else {
                    this.commonService.toastMsg(response['message'], false);
                }
                console.log('user_profile_response', response);
                this.loader(false);
            }, error => {
                console.log('user_profile_error', JSON.stringify(error));
                this.loader(false);
            }
        );
    }

    loadDistrictListByDivision($event: CustomEvent) {
        this.loadDistrict(this.divisionId);
    }

    private async loadDistrict(divId: any) {
        const params = {divisionId: divId};
        this.commonService.setReq('GET', this.districtUrl, params).subscribe(
            response => {
                if (response['status'] === 200) {
                    this.districtList = response['data'].districtList;
                } else {
                    this.commonService.toastMsg(response['message'], false);
                }
                this.districtId = this.tempDisId;
                console.log('district_response', response);
            }, error => {
                console.log('district_error', JSON.stringify(error));
            }
        );
    }

    loadPoliceStationListByDistrict($event: CustomEvent) {
        this.loadPoliceStation(this.districtId);
    }

    private async loadPoliceStation(disId: any) {
        const params = {districtId: disId};
        this.commonService.setReq('GET', this.policeStationUrl, params).subscribe(
            response => {
                if (response['status'] === 200) {
                    this.policeStationList = response['data'].thanaList;
                } else {
                    this.commonService.toastMsg(response['message'], false);
                }
                this.policeStationId = this.tempPSId;
                console.log('police_station_response', response);
            }, error => {
                console.log('police_station_error', JSON.stringify(error));
            }
        );
    }

    onCancelClick() {
        this.router.navigateByUrl('home');
    }

    onUpdateProfileClicked() {
        this.updateProfile();
    }

    private updateProfile() {
        /*if (this.commonService.inputFieldEmptyChecker(this.userName)) {
            this.commonService.toastMsg('আপনার ইউজার নেম লিখুন', false);
        } else if (this.commonService.inputFieldEmptyChecker(this.fatherName)) {
            this.commonService.toastMsg('আপনার পিতার নাম লিখুন', false);
        } else if (this.commonService.inputFieldEmptyChecker(this.motherName)) {
            this.commonService.toastMsg('আপনার মাতার নাম লিখুন', false);
        } else if (this.commonService.inputFieldEmptyChecker(this.address)) {
            this.commonService.toastMsg('আপনার ঠিকানা লিখুন', false);
        } else if (this.commonService.inputFieldEmptyChecker(this.gender)) {
            this.commonService.toastMsg('আপনার লিঙ্গগত পরিচয় নির্বাচন করুন', false);
        } else if (this.commonService.inputFieldEmptyChecker(this.bloodGroupId)) {
            this.commonService.toastMsg('আপনার রক্তের গ্রুপ নির্বাচন করুন', false);
        } else if (this.commonService.inputFieldEmptyChecker(this.dob)) {
            this.commonService.toastMsg('আপনার জন্ম তারিখ লিখুন', false);
        } else if (this.commonService.inputFieldEmptyChecker(this.nationalId)) {
            this.commonService.toastMsg('আপনার জাতীয় পরিচয় পত্র নম্বর লিখুন', false);
        } else if (this.commonService.inputFieldEmptyChecker(this.passportNo)) {
            this.commonService.toastMsg('আপনার পাসপোর্ট নম্বর লিখুন', false);
        } else if (this.commonService.inputFieldEmptyChecker(this.birthCertificateNo)) {
            this.commonService.toastMsg('আপনার জন্ম সনদপত্র নম্বর লিখুন', false);
        } else if (this.commonService.inputFieldEmptyChecker(this.divisionId)) {
            this.commonService.toastMsg('আপনার বিভাগের নাম লিখুন', false);
        } else if (this.commonService.inputFieldEmptyChecker(this.districtId)) {
            this.commonService.toastMsg('আপনার জেলার নাম লিখুন', false);
        } else if (this.commonService.inputFieldEmptyChecker(this.policeStationId)) {
            this.commonService.toastMsg('আপনার থানার নাম লিখুন', false);
        } else if (this.commonService.inputFieldEmptyChecker(this.postCode)) {
            this.commonService.toastMsg('পোস্ট কোড লিখুন', false);
        } else {*/

            this.loader(true);
            if (this.dob.length > 10) {
                this.dob = this.getIonDateToDBDateFormat2(this.dob.split('T')[0]);
                // this.dob = this.getFormattedDate(this.dob.split('T')[0]);
            } else {
                this.dob = this.getIonDateToDBDateFormat(this.dob);
            }

            const profileObj = {
                loginName: this.logInName,
                email: this.email,
                contactNo: this.mobileNo,
                userName: this.userName,
                fatherName: this.fatherName,
                motherName: this.motherName,
                address: this.address,
                gender: this.gender,
                photo: this.base64Image,
                bloodGroupId: this.bloodGroupId,
                dateOfBirth: this.dob,
                nIDNo: this.nationalId,
                passportNo: this.passportNo,
                birthCertificateNo: this.birthCertificateNo,
                divisionId: this.divisionId,
                districtId: this.districtId,
                thanaId: this.policeStationId,
                photoSize: this.photoSize,
                photoType: this.photoType,
                postCode: this.postCode,
            };

            this.commonService.setReq('POST', this.profileUpdateUrl, profileObj).subscribe(
                response => {
                    if (response['status'] === 200) {
                        this.dob = this.getISODateFormat(this.dob);

                        const userData = response['data'].userInfo;
                        this.commonService.setItem('userName', userData.userName);
                        this.commonService.setUserPhotoForMenu(userData.photo);

                        this.displayMsg('ব্যবহারকারীর প্রোফাইল আপডেট করা হয়েছে', 'success');

                        this.events.publish('profileUpdates');

                    } else {
                        this.commonService.toastMsg(response['message'], false);
                    }
                    console.log('update_profile_response', response);
                    this.loader(false);
                }, error => {
                    console.log('update_profile_error', JSON.stringify(error));
                    this.loader(false);
                }
            );
        // }
    }

    // ----------------------- TRUE FOR LOADER START ------ FALSE FOR LOADER STOP
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

    // ----------- APPLY ANY OF THIS COLOR 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'
    // ----------- APPLY ANY OF THIS POSITION 'bottom', 'middle', 'top'
    async displayMsg(msg: any = 'Warning', colors: any = 'warning', time: any = 3000, where: any = 'top') {
        const toast = await this.toastCtrl.create({
            message: '<medum>' + msg + '</medum>',
            showCloseButton: true,
            position: where,
            closeButtonText: 'X',
            animated: true,
            color: colors,
            duration: time
        });
        toast.present();
    }

    getFormattedDate(date) {
        var getDate = date.split('-');
        var month = getDate[1];
        var day = getDate[2];
        var year = getDate[0];
        // var apiformatDate = day + '/' + month + '/' + year;
        return day + '/' + month + '/' + year;
    }

    getISODateFormat(date) {
        const getDate = date.split('/');
        const day = getDate[0];
        const month = getDate[1];
        const year = getDate[2];
        return month + '/' + day + '/' + year;
    }

    getIonDateToDBDateFormat(date) {
        const getDate = date.split('/');
        const month = getDate[0];
        const day = getDate[1];
        const year = getDate[2];
        return day + '/' + month + '/' + year;
    }

    getIonDateToDBDateFormat2(date) {
        const getDate = date.split('-');
        const year = getDate[0];
        const month = getDate[1];
        const day = getDate[2];
        return day + '/' + month + '/' + year;
    }

    async browseImageFile(documentType: any) {
        const actionSheet = await this.actionsheetCtrl.create({
            header: 'Upload Photo',
            cssClass: 'action-sheets-page',
            buttons: [
                {
                    text: 'Camera',
                    role: 'destructive',
                    icon: 'camera.svg',
                    handler: () => {
                        this.captureImage(false, documentType);
                    }
                },
                {
                    text: 'Gallery',
                    icon: 'gallery.svg',
                    handler: () => {
                        this.captureImage(true, documentType);
                    }
                },
            ]
        });
        await actionSheet.present();
    }

    async captureImage(useAlbum: boolean, documentType: any) {
        const options: CameraOptions = {
            quality: 20,
            targetHeight: 600,
            targetWidth: 600,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true,
            mediaType: this.camera.MediaType.PICTURE,
            ...useAlbum ? {saveToPhotoAlbum: false} : {saveToPhotoAlbum: true},
            ...useAlbum ? {sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM} : {sourceType: this.camera.PictureSourceType.CAMERA}
        };

        const imageData = await this.camera.getPicture(options);
        this.base64Image = `${imageData}`;
        this.photoSize = 1;
        this.photoType = 'image/jpeg';
        // this.base64Image = `data:image/jpeg;base64,${imageData}`;

        if (documentType == 'user') {
            this.uploadPhoto = `data:image/jpeg;base64,${imageData}`;
            // this.uploadPhoto = this.base64Image;
        }
        console.log('base 64 format: ', this.base64Image);
        // this.photos.unshift(this.base64Image);
    }
}
