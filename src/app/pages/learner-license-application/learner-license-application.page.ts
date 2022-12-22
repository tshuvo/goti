import {Component, OnInit} from '@angular/core';
import {ActionSheetController, LoadingController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {CommonService} from '../../services/common/common.service';
import {LearnerServiceService} from '../../services/learner/learner-service.service';

@Component({
    selector: 'app-learner-license-application',
    templateUrl: './learner-license-application.page.html',
    styleUrls: ['./learner-license-application.page.scss'],
})

export class LearnerLicenseApplicationPage implements OnInit {
    showNidOption: any = true;
    doReadOnly: any;
    bgBtnNonProfessional: any = 'button-text-4';
    bgBtnProfessional: any = 'button-text-5';
    nonProfessionalGrid: any = '';
    professionalGrid: any = 'ion-hide';
    bgBtnNo: any = 'button-text-4';
    bgBtnYes: any = 'button-text-5';
    drivingLicense: any = 'ion-hide';
    isProffesionalActive: any;
    checked1: any = false;
    checked2: any = false;
    checked3: any = false;
    checked4: any = false;
    checked5: any = false;
    checked6: any = false;
    angshikPass: any = 'N';
    angshikPassShow: any = false;
    isExamVenueSingle: boolean = false;
    vehicleType: any = '';
    firstPart: any = '';
    secondPart: any = 'ion-hide';
    thirdPart: any = 'ion-hide';
    fourthPart: any = 'ion-hide';
    formPart: any = 0;
    previousButton: any = 'ion-hide';
    nextButton: any = '';

    isEducationCirtificateUpload: boolean;
    isMedicalCertificateUpload: boolean;
    isNationalCertificateUpload: boolean;
    isUtilityUpload: boolean;
    isDrivingLicenseUpload: boolean;
    takeDrivingLicenseNumber: boolean;
    base64Image: any;
    uploadPhoto: any;
    photos: any;
    serviceData: any;
    bloodGroupId: any;
    singleOccupationID: any;
    bngFatherName: any;
    bngMotherName: any;
    bngSpouseName: any;
    bnguserName: any;
    countryId: any;
    dateOfBirth: any;
    nidDateOfBirth: any;
    dateOfLicenseIssue: any;
    eduQualificationId: any;
    educationalCertificateAttachment: any;
    educationalCertificateFileSize: any;
    educationalCertificateFileType: any;
    electricityBillFileAttachment: any;
    electricityBillFileSize: any;
    electricityBillFileType: any;
    drivingLicenseFileAttachment: any;
    drivingLicenseFileSize: any;
    drivingLicenseFileType: any;
    email: any;
    emergPerMail: any;
    emergPercontactNo: any = '';
    emergencyName: any;
    engFatherName: any;
    engMotherName: any;
    engSpouseName: any;
    enguserName: any;
    examDate: any;
    examVenue: any;
    gender: any;
    instructorLicenseNo: any;
    learnerExamDate: any;
    learnerExamTime: any;
    learnerLicenseType: any;
    learnerLicenseProfesionalTypeId: any;
    learnerLicenseNonProfesionalLight: any;
    learnerLicenseNonProfesionalLightID: any;
    learnerLicenseNonProfesionalMotorCycle: any;
    learnerLicenseNonProfesionalMotorCycleID: any;
    licenseNo: any;
    licenseRefNo: any;
    maritalId: any;
    licenseClassId: any;
    licenseClassIdArray: any;
    issueAuthorityId: any;
    issueAuthorityIdArray: any;
    medicalCertificateAttachment: any;
    medicalCertificateFileSize: any;
    medicalCertificateFileType: any;
    mobileValidateByOtp: any;
    nationalId: any;
    nationalIdAttachment: any;
    nationalIdFileSize: any;
    nationalIdFileType: any;
    nationalityId: any;
    occupation: any;
    otherCitizen: any;
    pPostCode: any;
    pRoad: any;
    pVillage: any;

    tempPDisId: any;
    pdistrictId: any;
    tempPerDisId: any;
    perdistrictId: any;
    tempPThanaId: any;
    pthanaId: any;
    tempPerThanaId: any;
    perthanaId: any;
    eduText: any;
    pdivisionId: any;
    parRoad: any;
    parVillage: any;
    perAddressSameAsPresent: any;
    perPostCode: any;
    perdivisionId: any;
    phNoOffice: any = '';
    phNoRes: any = '';
    phNocell: any = '';
    photo: any;
    photoSize: any;
    photoType: any;
    relationship: any;
    serviceRequestNo: any;
    submittedYN: any;
    drivingLicenseDetails = [];
    othersLicenseClassList = [];
    bloodGroupList: any;
    occupationList: any;
    vehicleClassList: any = [];
    othersVehicleClassList: any = [];
    othersVehicleDataList: any = [];
    othersShow: any = false;
    maritualStatusList: any;
    // genderList: any;
    nationalityList: any;
    pDivisionList: any;
    pDistrictList: any;
    pPoliceStationList: any;
    parDivisionList: any;
    parDistrictList: any;
    parPoliceStationList: any;
    othersVehicleTypeId: any = [];
    tempOthersVehicleTypeId: any = [];
    educationalQualificationList: any;
    examVenueList: any;
    sameAsPresent: any;
    sesServiceNo: any;
    previousServiceRequestNo: any;
    chkBoxNo: any = true;
    chkBoxYes: any = false;
    dualCitizenShipCountry: any = '';
    loading: any;
    dualCitizenShipRow: any = 'ion-hide';
    nidForNid: any;
    tempVClassArray = [];
    tempOtherVClassArray = [];
    classHeavy: boolean = false;
    classMedium: boolean = false;
    classLight: boolean = false;
    comeToEdit: boolean = false;
    maxIssuedate: any;

    constructor(private camera: Camera, private actionsheetCtrl: ActionSheetController, private router: Router,
                private route: ActivatedRoute,
                private commonService: CommonService,
                private loadingController: LoadingController, private learnerService: LearnerServiceService) {

        this.maxIssuedate = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString();

    }

    ngOnInit() {
        this.takeDrivingLicenseNumber = false;
        this.eduText = 'শিক্ষাগত যোগ্যতার সনদ সংযুক্ত করুন*';
        this.isUtilityUpload = false;
        this.isEducationCirtificateUpload = false;
        this.isMedicalCertificateUpload = false;
        this.isNationalCertificateUpload = false;
        this.isDrivingLicenseUpload = false;
        this.uploadPhoto = '/assets/icon/profile.png';
        this.photo = '';
        this.otherCitizen = 'N';
        this.loadIssueAuthority();
        this.loadNationalityList();
        this.loadBloodGroupList();
        this.loadOccupationList();
        this.loadPDivisionList();
        this.loadMaritalStatus();
        this.loadEducationalQualification();
        this.loadParDivisionList();
        this.loadProfessionalVehicleClass(3);
    }

    ionViewWillEnter() {
        try {
            this.route
                .queryParams
                .subscribe(params => {
                    let notify = params['notification'];


                    if (notify == 'edit') {

                        this.nidForNid = params['nid'];
                        this.nidDateOfBirth = this.getNidFormattedDate(params['nidDob']);
                        this.serviceRequestNo = params['serviceNo'];

                    } else {
                        this.serviceRequestNo = this.router.getCurrentNavigation().extras.state.serviceRequestId;
                    }
                    this.onEdit(this.serviceRequestNo);
                });
        } catch (e) {
            this.sesServiceNo = null;
        }

        // this.sesServiceNo = this.commonService.getSession('service_request_no');
        /* console.log("here is your previous service no 2: ", this.serviceRequestNo);

         console.log("get previous service id from session:", this.sesServiceNo);
         if(this.sesServiceNo === undefined || this.sesServiceNo == null || this.sesServiceNo === '') {
           console.log("go forward men");
         }else{
           console.log("you are for edit");
           this.onEdit();
         }*/
    }

    async changeProfessionalVehicleClass() {
        const that = this;
        this.comeToEdit = false;

        // if(this.learnerLicenseProfesionalTypeId.length > 3 && this.learnerLicenseProfesionalTypeId.includes('-1')){
        //     this.angshikPassShow = true;
        //     this.learnerLicenseProfesionalTypeId = [];
        //     this.tempVClassArray.forEach(function(arrayItem, arrayIndex, array) {
        //         that.learnerLicenseProfesionalTypeId.push(array[arrayIndex]);
        //     });
        //     this.commonService.toastMsg('আপনি দুইটার বেশি মোটরযানের শ্রেণী নির্বাচন করতে পারবেন না', false);
        // }else
        // if (this.learnerLicenseProfesionalTypeId.length > 2 && !this.learnerLicenseProfesionalTypeId.includes('-1')) {
        //     this.angshikPassShow = true;
        //     this.learnerLicenseProfesionalTypeId = [];
        //     this.tempVClassArray.forEach(function(arrayItem, arrayIndex, array) {
        //         that.learnerLicenseProfesionalTypeId.push(array[arrayIndex]);
        //     });
        //     this.commonService.toastMsg('আপনি দুইটার বেশি মোটরযানের শ্রেণী নির্বাচন করতে পারবেন না', false);
        // } else {

            if (this.learnerLicenseProfesionalTypeId.length == 2 && !this.learnerLicenseProfesionalTypeId.includes('-1')) {
                this.angshikPassShow = true;
                this.othersShow = false;
                this.othersVehicleTypeId = [];
                this.othersVehicleClassList = [];
            } else if (this.learnerLicenseProfesionalTypeId.includes('-1')) {
                this.othersShow = true;
                this.othersVehicleTypeId = [];
                this.othersVehicleClassList = [];
                this.otherClassOptionClick();
            } else if(this.learnerLicenseProfesionalTypeId.length == 1 && !this.learnerLicenseProfesionalTypeId.includes('-1')){
                this.othersShow = false;
                this.othersVehicleTypeId = [];
                this.othersVehicleClassList = [];
                this.angshikPassShow = false;
            } else {
                this.othersShow = false;
                this.othersVehicleTypeId = [];
                this.othersVehicleClassList = [];
            }

            this.takeDrivingLicenseNumber = false;
            this.eduText = 'শিক্ষাগত যোগ্যতার সনদ সংযুক্ত করুন*';
            this.classHeavy = false;
            this.classMedium = false;
            this.classLight = false;
            this.learnerLicenseProfesionalTypeId.forEach(function(arrayItem, arrayIndex, array) {
                that.makeVehicleClassGroup(array[arrayIndex]);
            });
            if (this.classHeavy && this.classMedium) {
                this.learnerLicenseProfesionalTypeId = [];
                this.tempVClassArray.forEach(function(arrayItem, arrayIndex, array) {
                    that.learnerLicenseProfesionalTypeId.push(array[arrayIndex]);
                });
                this.angshikPassShow = false;
                this.commonService.toastMsg('মোটরযানের শ্রেণীতে HEAVY অথবা MEDIUM অথবা LIGHT যে কোন একটি নির্বাচন করতে পারবেন', false);
            } else if (this.classHeavy && this.classLight) {
                this.learnerLicenseProfesionalTypeId = [];
                this.tempVClassArray.forEach(function(arrayItem, arrayIndex, array) {
                    that.learnerLicenseProfesionalTypeId.push(array[arrayIndex]);
                });
                this.angshikPassShow = false;
                this.commonService.toastMsg('মোটরযানের শ্রেণীতে HEAVY অথবা MEDIUM অথবা LIGHT যে কোন একটি নির্বাচন করতে পারবেন', false);
            } else if (this.classMedium && this.classLight) {
                this.learnerLicenseProfesionalTypeId = [];
                this.tempVClassArray.forEach(function(arrayItem, arrayIndex, array) {
                    that.learnerLicenseProfesionalTypeId.push(array[arrayIndex]);
                });
                this.angshikPassShow = false;
                this.commonService.toastMsg('মোটরযানের শ্রেণীতে HEAVY অথবা MEDIUM অথবা LIGHT যে কোন একটি নির্বাচন করতে পারবেন', false);
            } else {
                that.tempVClassArray = [];

                this.learnerLicenseProfesionalTypeId.forEach(function(arrayItem, arrayIndex, array) {
                    that.tempVClassArray.push(array[arrayIndex]);

                    if (array[arrayIndex] == '1') {
                        that.takeDrivingLicenseNumber = true;
                        that.eduText = 'শিক্ষাগত যোগ্যতার সনদ সংযুক্ত করুন';
                        that.licenseClassIdArray = ['LIGHT', 'MEDIUM'];
                    } else if (array[arrayIndex] == '2') {
                        that.takeDrivingLicenseNumber = true;
                        that.eduText = 'শিক্ষাগত যোগ্যতার সনদ সংযুক্ত করুন';
                        that.licenseClassIdArray = ['LIGHT'];
                    }
                });
            }
        // }
    }

    /*
     VEHICLE CLASS GROUP SELECT ANY OF THEM
     1 == HEAVY
     2 == MEDIUM
     3 == LIGHT
   */

    isdigit = (value) => {
        const val = Number(value) ? true : false;
        return val;
    };

    async checkNidOption() {

        if (!this.isdigit(this.nidForNid)) {
            this.commonService.toastMsg('আপনার জাতীয় পরিচয় পত্র নম্বর সঠিকভাবে লিখুন', false);
        }

        if (this.nidDateOfBirth.length > 10) {
            this.nidDateOfBirth = this.getFormattedDate(this.nidDateOfBirth.split('T')[0]);

        }
        if (this.nidDateOfBirth === undefined || this.nidDateOfBirth == null || this.nidDateOfBirth === '') {
            this.commonService.toastMsg('আপনার জন্ম তারিখ লিখুন', false);
        } else if (this.nidForNid === undefined || this.nidForNid == null || this.nidForNid === '') {
            this.commonService.toastMsg('আপনার জাতীয় পরিচয় পত্র নম্বর লিখুন', false);
        } else {
            let localNidDate = this.getNidFormattedDate(this.nidDateOfBirth);
            const dataObj = {
                dob: localNidDate,
                nid: this.nidForNid,
            };

            // const postData = JSON.stringify(dataObj);
            const loading = await this.loadingController.create({message: 'অপেক্ষা করুন..'});
            await loading.present();
            this.learnerService.checkNid(dataObj).subscribe(result => {
                loading.dismiss();
                if (result ['status'] == 200) {
                    // this.showNidOption = false;
                    // this.doReadOnly = true;
                    // this.bloodGroupList = result['data']['bloodGroupList'];
                    this.enguserName = result['data'].name_en;
                    this.bnguserName = result['data'].name_bn;
                    this.dateOfBirth = result['data'].d_of_b;
                    this.bngFatherName = result['data'].father_name;
                    this.bngMotherName = result['data'].mother_name;
                    this.nationalId = result['data'].nid_no;
                    // this.gender = result['data'].gender;

                    this.showNidOption = false;
                    this.doReadOnly = true;

                } else {
                    this.commonService.toastMsg(result['message'], false);
                }

            });
        }
    }

    makeVehicleClassGroup(classId) {
        if (classId == '1') {
            this.classHeavy = true;
        } else if (classId == '2') {
            this.classMedium = true;
        } else if (classId == '3') {
            this.classLight = true;
        }
    }

    clearData() {
        this.bloodGroupId = null;
        this.singleOccupationID = null;
        this.bngFatherName = null;
        this.bngMotherName = null;
        this.bngSpouseName = null;
        this.bnguserName = null;
        this.countryId = null;
        this.dateOfBirth = null;
        this.dateOfLicenseIssue = null;
        this.eduQualificationId = null;
        this.educationalCertificateAttachment = null;
        this.educationalCertificateFileSize = null;
        this.educationalCertificateFileType = null;
        this.drivingLicenseFileAttachment = null;
        this.drivingLicenseFileSize = null;
        this.drivingLicenseFileType = null;
        this.electricityBillFileAttachment = null;
        this.electricityBillFileSize = null;
        this.electricityBillFileType = null;
        this.email = null;
        this.emergPerMail = null;
        this.emergPercontactNo = '';
        this.emergencyName = null;
        this.engFatherName = null;
        this.engMotherName = null;
        this.engSpouseName = null;
        this.enguserName = null;
        this.examDate = null;
        this.examVenue = null;
        this.drivingLicenseDetails = null;
        this.gender = null;
        this.instructorLicenseNo = null;
        this.learnerExamDate = null;
        this.learnerExamTime = null;
        this.learnerLicenseType = null;
        this.licenseNo = null;
        this.licenseRefNo = null;
        this.maritalId = null;
        this.licenseClassId = null;
        this.licenseClassIdArray = null;
        this.medicalCertificateAttachment = null;
        this.medicalCertificateFileSize = null;
        this.medicalCertificateFileType = null;
        this.mobileValidateByOtp = null;
        this.nationalId = null;
        this.nationalIdAttachment = null; // attachment base 64 file
        this.nationalIdFileSize = null; // converted file size
        this.nationalIdFileType = null; // file type is image type
        this.countryId = null;
        this.occupation = null;
        this.otherCitizen = null;
        this.pPostCode = null;
        this.pRoad = null;
        this.pVillage = null;
        this.pdistrictId = null;
        this.pdivisionId = null;
        this.pthanaId = null;
        this.parRoad = null;
        this.parVillage = null;
        this.perAddressSameAsPresent = null;
        this.perPostCode = null;
        this.perdistrictId = null;
        this.perdivisionId = null;
        this.perthanaId = null;
        this.phNoOffice = '';
        this.phNoRes = '';
        this.phNocell = '';
        this.photo = null;
        this.photoSize = null;
        this.photoType = null;
        this.relationship = null;
        this.serviceRequestNo = null;
        this.submittedYN = null;
        this.drivingLicenseDetails = [];
        this.uploadPhoto = null;
        this.learnerLicenseNonProfesionalLight = null;
        this.learnerLicenseNonProfesionalMotorCycle = null;
        this.learnerLicenseProfesionalTypeId = null;
        // this.dateOfBirth = null;
    }

    onCancle() {
        this.clearData();
        this.router.navigate(['home']);
    }

    async onEdit(serviceRequestNo = '') {

        const editLoading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
        // console.log("loading", this.loading.instance);

        editLoading.present();

        this.clearData();

        const myObj = {
            serviceRequestNo: serviceRequestNo
        };

        this.learnerService.getEditData(myObj).subscribe(result => {
            if (result['status'] == '200') {
                let tempData = result['data']['learnerDrivingLicense'];
                // this.reSetData(tempData);
                this.comeToEdit = true;
                this.reSetWithNidData(tempData);
            } else {
                this.commonService.toastMsg(result['message']);
            }

            editLoading.dismiss();
        });
    }

    updateDate(event) {

        let dateFormat = event.detail.value;
        this.dateOfBirth = this.getFormattedDate(dateFormat.split('T')[0]);
        // this.dateOfBirth = dateFormat.split('T')[0];
    }

    getFormattedDate(date) {
        var getDate = date.split('-');
        var day = getDate[1];
        var month = getDate[2];
        var year = getDate[0];
        // var apiformatDate = day + '/' + month + '/' + year;
        return day + '/' + month + '/' + year;
    }

    getNidFormattedDate(date) {
        var getDate = date.split('/');
        var month = getDate[0];
        var day = getDate[1];
        var year = getDate[2];
        var apiformatDate = day + '/' + month + '/' + year;
        return day + '/' + month + '/' + year;
    }

    reSetData(data: any) {

        let licenseTempData = [];
        licenseTempData = data['drivingLicenseDetails'];
        this.learnerLicenseType = data['learnerLicenseType'];
        this.learnerLicenseProfesionalTypeId = [];


        for (let i = 0; i < licenseTempData.length; i++) {
            const lcId = licenseTempData[i].licenseClassId;
            this.drivingLicenseDetails.push({'allowYN': licenseTempData[i].allowYN, 'licenseClassId': lcId});

            if (this.learnerLicenseType == '2') {
                this.loadProfessionalVehicleClass('2');
                this.bgBtnProfessional = 'button-text-4';
                this.bgBtnNonProfessional = 'button-text-5';
                this.professionalGrid = '';
                this.nonProfessionalGrid = 'ion-hide';
                this.isProffesionalActive = true;

                this.tempVClassArray.push(lcId);
                this.learnerLicenseProfesionalTypeId.push(lcId);

                if (lcId == '1' || lcId == '2') {
                    this.takeDrivingLicenseNumber = true;
                    this.eduText = 'শিক্ষাগত যোগ্যতার সনদ সংযুক্ত করুন';
                    if (lcId == '1') {
                        this.licenseClassIdArray = ['LIGHT', 'MEDIUM'];
                    } else if (lcId == '2') {
                        this.licenseClassIdArray = ['LIGHT'];
                    }
                }
            } else if (this.learnerLicenseType == '3') {
                this.bgBtnNonProfessional = 'button-text-4';
                this.bgBtnProfessional = 'button-text-5';
                this.nonProfessionalGrid = '';
                this.professionalGrid = 'ion-hide';
                this.isProffesionalActive = false;

                if (lcId === '3') {
                    this.learnerLicenseNonProfesionalLight = true;
                } else if (lcId === '4') {
                    this.learnerLicenseNonProfesionalMotorCycle = true;
                }
            }
        }

        this.pdivisionId = data['p_divisionId'];
        this.tempPDisId = data['p_districtId'];
        this.loadPresentDistrictList(this.pdivisionId);

        this.tempPThanaId = data['p_thanaId'];
        this.loadPresentThanaList(this.tempPDisId);

        this.perdivisionId = data['per_divisionId'];
        this.tempPerDisId = data['per_districtId'];
        this.loadPermanentDistrictList(this.perdivisionId);

        this.tempPerThanaId = data['per_thanaId'];
        this.loadPermanentThanaList(this.tempPerDisId);

        this.bloodGroupId = data['bloodGroupId'];
        this.singleOccupationID = data['occupationId'];
        this.countryId = data['countryId'];
        this.dateOfBirth = data['dateOfBirth'];
        // this.drivingLicenseDetails =  /* todo should display dinamically */
        this.eduQualificationId = data['eduQualificationId'];
        this.educationalCertificateFileSize = data['educationalCertificateFileSize'];
        this.educationalCertificateFileType = data['educationalCertificateFileType'];
        this.electricityBillFileSize = data['electricityBillFileSize'];
        this.electricityBillFileType = data['electricityBillFileType'];
        this.email = data['email'];
        this.emergPerMail = data['emerg_per_Mail'];

        if (data['emerg_per_contactNo'].length > 11) {
            this.emergPercontactNo = data['emerg_per_contactNo'].substr(1);
        } else if (data['emerg_per_contactNo'].length < 7) {
            this.emergPercontactNo = '';
        } else {
            this.emergPercontactNo = data['emerg_per_contactNo'];
        }

        this.emergencyName = data['emergency_Name'];
        this.engFatherName = data['engFatherName'];
        this.engMotherName = data['engMotherName'];
        this.engSpouseName = data['engSpouseName'];
        this.enguserName = data['enguserName'];
        this.examDate = data['examDate'];
        this.examVenue = data['examVenue'];
        this.gender = data['gender'];
        this.licenseClassId = data['prevLicenseClass'];
        this.issueAuthorityId = data['dlIssuingAuthorityId'];
        this.dateOfLicenseIssue = data['prevLicenseIssueDate'];
        this.instructorLicenseNo = data['instructorLicenseNo'];
        this.learnerExamDate = data['learnerExamDate'];
        this.learnerExamTime = data['learnerExamTime'];
        this.licenseNo = data['licenseNo'];

        this.licenseRefNo = data['dlReferenceNo'];
        this.maritalId = data['maritalId'];
        this.medicalCertificateFileSize = data['medicalCertificateFileSize'];
        this.medicalCertificateFileType = data['medicalCertificateFileType'];
        this.mobileValidateByOtp = data['mobileValidateByOtp'];
        this.nationalId = data['nationalId'];
        this.nationalIdFileSize = data['nationalIdFileSize'];
        this.nationalIdFileType = data['nationalIdFileType'];
        this.nationalityId = data['nationalityId'];
        this.occupation = data['occupation'];
        this.otherCitizen = data['otherCitizen'];
        this.pPostCode = data['p_PostCode'];
        this.pRoad = data['p_Road'];
        this.pVillage = data['p_Village'];
        this.parRoad = data['par_Road'];
        this.parVillage = data['par_Village'];
        this.perAddressSameAsPresent = data['perAddressSameAsPresent'];
        this.perPostCode = data['per_PostCode'];

        if (data['ph_No_Office'].length > 11) {
            this.phNoOffice = data['ph_No_Office'].substr(1);
        } else if (data['ph_No_Office'].length < 7) {
            this.phNoOffice = '';
        } else {
            this.phNoOffice = data['ph_No_Office'];
        }

        if (data['ph_No_Res'].length > 11) {
            this.phNoRes = data['ph_No_Res'].substr(1);
        } else if (data['ph_No_Res'].length < 7) {
            this.phNoRes = '';
        } else {
            this.phNoRes = data['ph_No_Res'];
        }

        if (data['ph_No_cell'].length > 11) {
            this.phNocell = data['ph_No_cell'].substr(1);
        } else if (data['ph_No_cell'].length < 7) {
            this.phNocell = '';
        } else {
            this.phNocell = data['ph_No_cell'];
        }
        this.photo = data['photo'];
        this.photoSize = data['photoSize'];
        this.photoType = data['photoType'];
        this.uploadPhoto = `data:image/jpeg;base64,${this.photo}`;
        this.relationship = data['relationship'];
        this.serviceRequestNo = data['serviceRequestNo'];
        this.submittedYN = data['submittedYN'];

        this.educationalCertificateAttachment = data['educationalCertificateAttachment'];
        this.medicalCertificateAttachment = data['medicalCertificateAttachment'];
        this.nationalIdAttachment = data['nationalIdAttachment'];
        this.electricityBillFileAttachment = data['electricityBillFileAttachment'];
        this.drivingLicenseFileAttachment = data['drivingLicenseFileAttachment'];

        if (this.educationalCertificateAttachment != '') {
            this.isEducationCirtificateUpload = true;
        }
        if (this.medicalCertificateAttachment != '') {
            this.isMedicalCertificateUpload = true;
        }
        if (this.nationalIdAttachment != '') {
            this.isNationalCertificateUpload = true;
        }
        if (this.drivingLicenseFileAttachment != '') {
            this.isDrivingLicenseUpload = true;
        }
        if (this.electricityBillFileAttachment != '') {
            this.isUtilityUpload = true;
        }
    }

    reSetWithNidData(data: any) {
        console.log('reset data: ', data);
        let licenseTempData = [];
        let licenseOthersTempData = [];
        licenseTempData = data['drivingLicenseDetails'];
        licenseOthersTempData = data['othersLicenseClassList'];
        // this.othersLicenseClassList = licenseOthersTempData;
        this.learnerLicenseType = data['learnerLicenseType'];
        this.learnerLicenseProfesionalTypeId = [];
        console.log('others class data: ', this.othersLicenseClassList);
        if(licenseOthersTempData.length > 0){
            this.otherClassOptionClick();
            console.log('come to adapt others data');

            for(let k =0; k<licenseOthersTempData.length; k++){
                const lcIdOthers = licenseOthersTempData[k].licenseClassId;
                console.log('push others data id: ', lcIdOthers);
                this.othersVehicleTypeId.push(lcIdOthers);
                // this.othersLicenseClassList.push({'allowYN': licenseTempData[k].allowYN, 'licenseClassId': lcIdOthers});
            }
            const that = this;
            if (this.othersVehicleTypeId.length > 0) {

                this.othersVehicleTypeId.forEach(function(arrayItem, arrayIndex, array) {
                    // that.othersVehicleTypeId.push(array[arrayIndex]);
                    that.othersVehicleClassList.push({allowYN: '', licenseClassId: array[arrayIndex]});

                });

            }
            console.log('final others data', this.othersVehicleTypeId);
        }

        // if (this.othersLicenseClassList.length >= 1){
        //     this.othersShow = true;
        // }
        //
        // if(this.othersLicenseClassList.length >= 1 && this.drivingLicenseDetails.length >= 1){
        //     this.othersShow = true;
        // }
        for (let i = 0; i < licenseTempData.length; i++) {
            const lcId = licenseTempData[i].licenseClassId;
            this.drivingLicenseDetails.push({'allowYN': licenseTempData[i].allowYN, 'licenseClassId': lcId});
            if(this.drivingLicenseDetails.length >= 2){
                this.angshikPassShow = true;
            }

            if (this.learnerLicenseType == '2') {

                this.loadProfessionalVehicleClass('2');
                this.bgBtnProfessional = 'button-text-4';
                this.bgBtnNonProfessional = 'button-text-5';
                this.professionalGrid = '';
                this.nonProfessionalGrid = 'ion-hide';
                this.isProffesionalActive = true;

                this.tempVClassArray.push(lcId);
                this.learnerLicenseProfesionalTypeId.push(lcId);

                if (this.learnerLicenseProfesionalTypeId.includes('-1')) {
                    this.othersShow = true;
                }

                if (lcId == '1' || lcId == '2') {
                    this.takeDrivingLicenseNumber = true;
                    this.eduText = 'শিক্ষাগত যোগ্যতার সনদ সংযুক্ত করুন';
                    if (lcId == '1') {
                        this.licenseClassIdArray = ['LIGHT', 'MEDIUM'];
                    } else if (lcId == '2') {
                        this.licenseClassIdArray = ['LIGHT'];
                    }
                }
            }

            else if (this.learnerLicenseType == '3') {
                this.othersShow = false;
                this.othersVehicleTypeId = [];
                this.othersVehicleClassList = [];
                this.bgBtnNonProfessional = 'button-text-4';
                this.bgBtnProfessional = 'button-text-5';
                this.nonProfessionalGrid = '';
                this.professionalGrid = 'ion-hide';
                this.isProffesionalActive = false;

                if (lcId === '3') {
                    this.learnerLicenseNonProfesionalLight = true;
                } else if (lcId === '4') {
                    this.learnerLicenseNonProfesionalMotorCycle = true;
                }

                if(this.learnerLicenseNonProfesionalLight && this.learnerLicenseNonProfesionalMotorCycle){
                    this.angshikPassShow = true;
                }
            }
        }

        this.pdivisionId = data['p_divisionId'];
        this.tempPDisId = data['p_districtId'];
        this.loadPresentDistrictList(this.pdivisionId);

        this.tempPThanaId = data['p_thanaId'];
        this.loadPresentThanaList(this.tempPDisId);
        this.loadExamVanue(this.tempPThanaId);
        this.perdivisionId = data['per_divisionId'];
        this.tempPerDisId = data['per_districtId'];
        this.loadPermanentDistrictList(this.perdivisionId);

        this.tempPerThanaId = data['per_thanaId'];
        this.loadPermanentThanaList(this.tempPerDisId);

        this.bloodGroupId = data['bloodGroupId'];
        this.singleOccupationID = data['occupationId'];
        this.countryId = data['countryId'];
        // this.dateOfBirth = data['dateOfBirth'];
        // this.drivingLicenseDetails =  /* todo should display dinamically */

        this.eduQualificationId = data['eduQualificationId'];
        this.angshikPass = data['partialPassYn'];
        this.educationalCertificateFileSize = data['educationalCertificateFileSize'];
        this.educationalCertificateFileType = data['educationalCertificateFileType'];
        this.electricityBillFileSize = data['electricityBillFileSize'];
        this.electricityBillFileType = data['electricityBillFileType'];
        this.email = data['email'];
        this.emergPerMail = data['emerg_per_Mail'];

        if (data['emerg_per_contactNo'].length > 11) {
            this.emergPercontactNo = data['emerg_per_contactNo'].substr(1);
        } else if (data['emerg_per_contactNo'].length < 7) {
            this.emergPercontactNo = '';
        } else {
            this.emergPercontactNo = data['emerg_per_contactNo'];
        }

        this.emergencyName = data['emergency_Name'];
        this.engFatherName = data['engFatherName'];
        this.engMotherName = data['engMotherName'];
        this.engSpouseName = data['engSpouseName'];
        // this.enguserName = data['enguserName'];
        this.examDate = data['examDate'];
        this.examVenue = data['examVenue'];
        this.gender = data['gender'];
        this.licenseClassId = data['prevLicenseClass'];
        this.issueAuthorityId = data['dlIssuingAuthorityId'];
        this.dateOfLicenseIssue = data['prevLicenseIssueDate'];
        this.instructorLicenseNo = data['instructorLicenseNo'];
        this.learnerExamDate = data['learnerExamDate'];
        this.learnerExamTime = data['learnerExamTime'];
        this.licenseNo = data['licenseNo'];

        this.licenseRefNo = data['dlReferenceNo'];
        this.maritalId = data['maritalId'];
        this.medicalCertificateFileSize = data['medicalCertificateFileSize'];
        this.medicalCertificateFileType = data['medicalCertificateFileType'];
        this.mobileValidateByOtp = data['mobileValidateByOtp'];
        // this.nationalId = data['nationalId'];
        this.nationalIdFileSize = data['nationalIdFileSize'];
        this.nationalIdFileType = data['nationalIdFileType'];
        this.nationalityId = data['nationalityId'];
        this.occupation = data['occupation'];
        this.otherCitizen = data['otherCitizen'];
        this.pPostCode = data['p_PostCode'];
        this.pRoad = data['p_Road'];
        this.pVillage = data['p_Village'];
        this.parRoad = data['par_Road'];
        this.parVillage = data['par_Village'];
        this.perAddressSameAsPresent = data['perAddressSameAsPresent'];
        this.perPostCode = data['per_PostCode'];

        if (data['ph_No_Office'].length > 11) {
            this.phNoOffice = data['ph_No_Office'].substr(1);
        } else if (data['ph_No_Office'].length < 7) {
            this.phNoOffice = '';
        } else {
            this.phNoOffice = data['ph_No_Office'];
        }

        if (data['ph_No_Res'].length > 11) {
            this.phNoRes = data['ph_No_Res'].substr(1);
        } else if (data['ph_No_Res'].length < 7) {
            this.phNoRes = '';
        } else {
            this.phNoRes = data['ph_No_Res'];
        }

        if (data['ph_No_cell'].length > 11) {
            this.phNocell = data['ph_No_cell'].substr(1);
        } else if (data['ph_No_cell'].length < 7) {
            this.phNocell = '';
        } else {
            this.phNocell = data['ph_No_cell'];
        }
        this.photo = data['photo'];
        this.photoSize = data['photoSize'];
        this.photoType = data['photoType'];
        this.uploadPhoto = `data:image/jpeg;base64,${this.photo}`;
        this.relationship = data['relationship'];
        this.serviceRequestNo = data['serviceRequestNo'];
        this.submittedYN = data['submittedYN'];

        this.educationalCertificateAttachment = data['educationalCertificateAttachment'];
        this.medicalCertificateAttachment = data['medicalCertificateAttachment'];
        this.nationalIdAttachment = data['nationalIdAttachment'];
        this.electricityBillFileAttachment = data['electricityBillFileAttachment'];
        this.drivingLicenseFileAttachment = data['drivingLicenseFileAttachment'];

        if (this.educationalCertificateAttachment != '') {
            this.isEducationCirtificateUpload = true;
            this.educationalCertificateFileSize = 1;
            this.educationalCertificateFileType = 'image/jpeg';
        }
        if (this.medicalCertificateAttachment != '') {
            this.isMedicalCertificateUpload = true;
            this.medicalCertificateFileSize = 1;
            this.medicalCertificateFileType = 'image/jpeg';
        }
        if (this.nationalIdAttachment != '') {
            this.isNationalCertificateUpload = true;
            this.nationalIdFileSize = 1;
            this.nationalIdFileType = 'image/jpeg';
        }
        if (this.drivingLicenseFileAttachment != '') {
            this.isDrivingLicenseUpload = true;
            this.drivingLicenseFileSize = 1;
            this.drivingLicenseFileType = 'imgae/jpeg';
        }
        if (this.electricityBillFileAttachment != '') {
            this.isUtilityUpload = true;
            this.electricityBillFileSize = 1;
            this.electricityBillFileType = 'imgae/jpeg';

        }
    }

    addressCheckBox() {
        if (this.sameAsPresent) {
            this.perAddressSameAsPresent = true;
            this.perdivisionId = this.pdivisionId;
            this.perdistrictId = this.pdistrictId;
            this.perthanaId = this.pthanaId;
            this.parVillage = this.pVillage;
            this.parRoad = this.pRoad;
            this.perPostCode = this.pPostCode;
        }

    }

    loadBloodGroupList() {
        this.learnerService.getBloodGroup().subscribe(result => {

            if (result ['status'] == 200) {
                this.bloodGroupList = result['data']['bloodGroupList'];

            } else {

            }

        });
    }

    loadOccupationList() {
        this.learnerService.getOccupationList().subscribe(result => {

            if (result ['status'] == 200) {
                this.occupationList = result['data']['occupationList'];

            } else {

            }

        });
    }

    loadProfessionalVehicleClass(id) {
        const myObj = {
            learnerLicenseType: id
        };
        this.learnerService.getProfessionalVehicle(myObj).subscribe(result => {

            if (result ['status'] == 200) {
                this.vehicleClassList = result['data']['vehicleClassList'];
                // let obj = { id: -1, name: 'OTHERS' }
                // this.vehicleClassList.push(obj);
            } else {

            }

        });
    }

    async otherClassOptionClick() {

        const dataObj = {
            learnerLicenseType: 2
        };

        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন..'});
        await loading.present();
        this.learnerService.getOthersVehicleClassData(dataObj).subscribe(result => {
            loading.dismiss();
            if (result ['status'] == 200) {
                this.othersVehicleDataList = result['data']['vehicleClassList'];
            }
        });

    }

    changeOthersProfessionalVehicleClass() {

        const that = this;
        if (this.othersVehicleTypeId.length > 0) {
            that.othersVehicleClassList = [];
            console.log('ohters selected data: ', this.othersVehicleTypeId.length);
            this.othersVehicleTypeId.forEach(function(arrayItem, arrayIndex, array) {
                // that.othersVehicleTypeId.push(array[arrayIndex]);

                console.log('come to change others list');
                console.log('clicked item id', array[arrayIndex]);
                if(!Object.values(that.othersLicenseClassList).includes(array[arrayIndex])){
                    console.log('clicked item id exits ', array[arrayIndex]);
                }else{
                    console.log('clicked item id not exits ', array[arrayIndex]);
                }
                that.othersVehicleClassList.push({allowYN: '', licenseClassId: array[arrayIndex]});

            });
            console.log('ohters selected data to send: ', this.othersVehicleClassList);
        }

        if (this.learnerLicenseProfesionalTypeId.length >= 1 && this.othersVehicleTypeId.length >= 1) {
            this.angshikPassShow = true;
        } else if (this.othersVehicleTypeId.length > 1) {
            this.angshikPassShow = true;
        }else{
            this.angshikPassShow = false;
        }
    }

    loadNationalityList() {
        this.learnerService.getNationalityList().subscribe(result => {

            if (result ['status'] == 200) {
                this.nationalityList = result['data']['nationalityList'];

            } else {

            }

        });
    }

    loadIssueAuthority() {
        this.issueAuthorityIdArray = [];
        this.learnerService.getIssueAuthorityList().subscribe(result => {
            if (result ['status'] == 200) {
                this.issueAuthorityIdArray = result['data']['dlIssuingAuthorityList'];
            } else {

            }

        });
    }

    loadMaritalStatus() {
        this.learnerService.getMaritualStatusList().subscribe(result => {

            if (result ['status'] == 200) {
                this.maritualStatusList = result['data']['maritalStatusList'];

            } else {

            }

        });
    }

    loadPDivisionList() {
        this.learnerService.getPDivisionList().subscribe(result => {

            if (result ['status'] == 200) {
                this.pDivisionList = result['data']['divisionList'];

            } else {

            }

        });
    }

    loadParDivisionList() {

        this.learnerService.getPDivisionList().subscribe(result => {

            if (result ['status'] == 200) {
                this.parDivisionList = result['data']['divisionList'];

            } else {

            }

        });
    }

    loadPDistrictList(event) {
        this.loadPresentDistrictList(this.pdivisionId);
    }

    loadPresentDistrictList(pDivId: any) {
        const params = {divisionId: pDivId};
        this.learnerService.getPDistrictList(params).subscribe(result => {
            if (result ['status'] == 200) {
                this.pDistrictList = result['data']['districtList'];
            } else {
            }
            this.pdistrictId = this.tempPDisId;
        });
    }

    loadParDistrictList(event) {
        this.loadPermanentDistrictList(this.perdivisionId);
    }

    loadPermanentDistrictList(parDivId: any) {
        const params = {divisionId: parDivId};
        this.learnerService.getPDistrictList(params).subscribe(result => {
            if (result ['status'] == 200) {
                this.parDistrictList = result['data']['districtList'];
            } else {
            }
            this.perdistrictId = this.tempPerDisId;
        });
    }

    loadPThanaList(event) {
        this.loadPresentThanaList(this.pdistrictId);
    }

    loadPresentThanaList(pDisId: any) {
        const params = {districtId: pDisId};
        this.learnerService.getPoliceStationList(params).subscribe(result => {
            if (result ['status'] == 200) {
                this.pPoliceStationList = result['data']['thanaList'];
            }
            this.pthanaId = this.tempPThanaId;
        });

        this.loadExamVanue(this.pthanaId);
    }

    loadParThanaList(event) {
        this.loadPermanentThanaList(this.perdistrictId);
    }

    loadPermanentThanaList(perDisId: any) {
        const params = {districtId: perDisId};
        this.learnerService.getPoliceStationList(params).subscribe(result => {
            if (result ['status'] == 200) {
                this.parPoliceStationList = result['data']['thanaList'];
            }
            this.perthanaId = this.tempPerThanaId;
        });
    }

    loadExamVanueList(item) {
        const myObj = {
            thanaId: this.pthanaId
        };
        this.learnerService.getExamVenueList(myObj).subscribe(result => {
            if (result ['status'] == 200) {
                this.examVenueList = result['data']['examVenueList'];
                if (this.examVenueList.length == 1) {
                    this.isExamVenueSingle = true;
                    this.examVenue = this.examVenueList[0].name;
                }
            }


        });
    }

    loadExamVanue(thanaId) {
        const myObj = {
            thanaId: thanaId
        };
        this.learnerService.getExamVenueList(myObj).subscribe(result => {
            if (result ['status'] == 200) {
                this.examVenueList = result['data']['examVenueList'];
                if (this.examVenueList.length == 1) {
                    this.isExamVenueSingle = true;
                    this.examVenue = this.examVenueList[0].name;
                }
            }


        });
    }

    loadEducationalQualification() {
        this.learnerService.getEducationalQualificationList().subscribe(result => {

            if (result ['status'] == 200) {
                this.educationalQualificationList = result['data']['educationQualificationList'];
            }

        });
    }

    fao() {
        this.router.navigate(['learner-application-success'], {state: {serviceRequestId: '2019121900017', phoneNo: '01775403903'}});
    }

    async sandLearnerLicenseApi() {
        const that = this;
        // this.fao();
        // return;
        if (this.emergPercontactNo.length > 10) {
            this.emergPercontactNo = this.emergPercontactNo.substr(1);
        }

        if (this.phNoOffice.length > 10) {
            this.phNoOffice = this.phNoOffice.substr(1);
        }

        if (this.phNoRes.length > 10) {
            this.phNoRes = this.phNoRes.substr(1);
        }

        if (this.phNocell.length > 10) {
            this.phNocell = this.phNocell.substr(1);
        }

        this.countryId = this.dualCitizenShipCountry;
        if (this.dateOfBirth.length > 10) {
            this.dateOfBirth = this.getFormattedDate(this.dateOfBirth.split('T')[0]);
        }


        if (!this.comeToEdit) {
            this.drivingLicenseDetails = [];
            if (this.isProffesionalActive) {
                this.learnerLicenseType = 2;
                let ageLimit = this.getAge(this.dateOfBirth);
                if (ageLimit <= 21) {
                    this.commonService.toastMsg('ন্যূনতম বয়স হতে হবে : ২১ বছর', false);
                    return;
                }
                that.learnerLicenseProfesionalTypeId.forEach(function(arrayItem, arrayIndex, array) {
                    that.drivingLicenseDetails.push({allowYN: '', licenseClassId: array[arrayIndex]});

                });
                if (this.takeDrivingLicenseNumber) {
                    if (this.dateOfLicenseIssue.length > 11) {
                        this.dateOfLicenseIssue = this.getFormattedDate(this.dateOfLicenseIssue.split('T')[0]);
                    }
                }
            } else {
                this.learnerLicenseType = 3;
                let ageLimit = this.getAge(this.dateOfBirth);
                if (ageLimit <= 18) {
                    this.commonService.toastMsg('ন্যূনতম বয়স হতে হবে : ১৮ বছর', false);
                    return;
                }
                if (this.learnerLicenseNonProfesionalMotorCycleID != -1) {
                    this.drivingLicenseDetails.push({allowYN: '', licenseClassId: this.learnerLicenseNonProfesionalMotorCycleID});
                }
                if (this.learnerLicenseNonProfesionalLightID != -1) {
                    this.drivingLicenseDetails.push({allowYN: '', licenseClassId: this.learnerLicenseNonProfesionalLightID});
                }

            }

        }

        const myObj = {
            bloodGroupId: this.bloodGroupId,
            bngFatherName: this.bngFatherName,
            bngMotherName: this.bngMotherName,
            bngSpouseName: this.bngSpouseName,
            bnguserName: this.bnguserName,
            countryId: this.countryId,
            dateOfBirth: this.dateOfBirth,
            eduQualificationId: this.eduQualificationId,
            educationalCertificateAttachment: this.educationalCertificateAttachment,
            educationalCertificateFileSize: this.educationalCertificateFileSize,
            educationalCertificateFileType: this.educationalCertificateFileType,
            electricityBillFileAttachment: this.electricityBillFileAttachment,
            electricityBillFileSize: this.electricityBillFileSize,
            electricityBillFileType: this.electricityBillFileType,
            drivingLicenseFileAttachment: this.drivingLicenseFileAttachment,
            drivingLicenseFileType: this.drivingLicenseFileType,
            drivingLicenseFileSize: this.drivingLicenseFileSize,
            partialPassYn: this.angshikPass,
            email: this.email,
            emerg_per_Mail: this.emergPerMail,
            emerg_per_contactNo: '0' + this.emergPercontactNo,
            emergency_Name: this.emergencyName,
            engFatherName: this.engFatherName,
            engMotherName: this.engMotherName,
            engSpouseName: this.engSpouseName,
            enguserName: this.enguserName,
            examDate: this.examDate,
            prevLicenseClass: this.licenseClassId,
            dlIssuingAuthorityId: this.issueAuthorityId,
            prevLicenseIssueDate: this.dateOfLicenseIssue,
            examVenue: (this.isExamVenueSingle) ? this.examVenueList[0].name : this.examVenue,
            drivingLicenseDetails: this.drivingLicenseDetails,
            gender: this.gender,
            instructorLicenseNo: this.instructorLicenseNo,
            learnerExamDate: this.learnerExamDate,
            learnerExamTime: this.learnerExamTime,
            learnerLicenseType: this.learnerLicenseType,
            licenseNo: this.licenseNo,
            dlReferenceNo: this.licenseRefNo,
            maritalId: this.maritalId,
            medicalCertificateAttachment: this.medicalCertificateAttachment,
            medicalCertificateFileSize: this.medicalCertificateFileSize,
            medicalCertificateFileType: this.medicalCertificateFileType,
            mobileValidateByOtp: this.mobileValidateByOtp,
            nationalId: this.nationalId,
            nationalIdAttachment: this.nationalIdAttachment, // attachment base 64 file
            nationalIdFileSize: this.nationalIdFileSize, // converted file size
            nationalIdFileType: this.nationalIdFileType, // file type is image type
            nationalityId: this.nationalityId,
            occupation: '',
            occupationId: this.singleOccupationID,
            otherCitizen: this.otherCitizen,
            othersLicenseClassList: this.othersVehicleClassList,
            p_PostCode: this.pPostCode,
            p_Road: this.pRoad,
            p_Village: this.pVillage,
            p_districtId: this.pdistrictId,
            p_divisionId: this.pdivisionId,
            p_thanaId: this.pthanaId,
            par_Road: this.parRoad,
            par_Village: this.parVillage,
            perAddressSameAsPresent: this.perAddressSameAsPresent,
            per_PostCode: this.perPostCode,
            per_districtId: this.perdistrictId,
            per_divisionId: this.perdivisionId,
            per_thanaId: this.perthanaId,
            ph_No_Office: '0' + this.phNoOffice,
            ph_No_Res: '0' + this.phNoRes,
            ph_No_cell: '0' + this.phNocell,
            photo: this.photo,
            photoSize: this.photoSize,
            photoType: this.photoType,
            relationship: this.relationship,
            serviceRequestNo: this.serviceRequestNo,
            submittedYN: this.submittedYN
        };
        console.log('send data: ', myObj);
        const postData = JSON.stringify(myObj);
        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
        await loading.present();
        this.serviceData = this.learnerService.saveLearnerLicense(postData).subscribe(result => {

            if (result['status'] == 200) {

                let serviceRequestNo = result['data']['learnerSaveResponse']['serviceRequestNo'];
                if (result['data']['learnerSaveResponse']['userOtpValidated']) {
                    this.router.navigate(['learner-application-success'], {
                        state: {
                            serviceRequestId: serviceRequestNo,
                            phoneNo: '0' + this.phNocell
                        }
                    });
                } else {
                    this.router.navigate(['otp'], {state: {serviceRequestId: serviceRequestNo, phoneNo: '0' + this.phNocell}});
                }

                this.commonService.setItem('service_request_no', serviceRequestNo);
            } else {
                this.commonService.toastMsg(result['message'], false);
            }

            loading.dismiss();
        });
    }

    async onLicenseTypeClick(type: string) {
        this.learnerLicenseType = type;
        if (type == '1') {
            const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
            await loading.present();
            this.learnerLicenseProfesionalTypeId = '';
            this.othersVehicleTypeId = '';
            this.takeDrivingLicenseNumber = false;
            this.bgBtnNonProfessional = 'button-text-4';
            this.bgBtnProfessional = 'button-text-5';
            this.chkBokController(type);
            this.isProffesionalActive = false;
            loading.dismiss();
        } else if (type == '2') {
            const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
            await loading.present();
            this.learnerLicenseNonProfesionalMotorCycle = false;
            this.learnerLicenseNonProfesionalLight = false;
            this.isProffesionalActive = true;
            this.bgBtnNonProfessional = 'button-text-5';
            this.bgBtnProfessional = 'button-text-4';
            this.chkBokController(type);
            loading.dismiss();
        }
        // else if (type == '3') {
        //     this.otherCitizen = 'N';
        //     this.bgBtnNo = 'button-text-4';
        //     this.bgBtnYes = 'button-text-5';
        // } else if (type == '4') {
        //     this.otherCitizen = 'Y';
        //     this.bgBtnYes = 'button-text-4';
        //     this.bgBtnNo = 'button-text-5';
        // }
    }

    formDataValidation() {
        // let date = this.getFormattedDate(this.dateOfLicenseIssue.split('T')[0]);

        // return;

        if (this.nationalId === undefined || this.nationalId == null || this.nationalId === '') {
            this.commonService.toastMsg('আপনার জাতীয় পরিচয় পত্র নম্বর লিখুন', false);
        } else if (this.dateOfBirth === undefined || this.dateOfBirth == null || this.dateOfBirth === '') {
            this.commonService.toastMsg('আপনার জন্ম তারিখ লিখুন', false);
        } else if (this.enguserName === undefined || this.enguserName == null || this.enguserName === '') {
            this.commonService.toastMsg('আপনার ইউজার নেম লিখুন', false);
        } else if (this.engFatherName === undefined || this.engFatherName == null || this.engFatherName === '') {
            this.commonService.toastMsg('আপনার পিতার নাম লিখুন', false);
        } else if (this.engMotherName === undefined || this.engMotherName == null || this.engMotherName === '') {
            this.commonService.toastMsg('আপনার মাতার নাম লিখুন', false);
        } else if (this.bloodGroupId === undefined || this.bloodGroupId == null || this.bloodGroupId === '') {
            this.commonService.toastMsg('আপনার রক্তের গ্রুপ নির্বাচন করুন', false);
        } else if (this.singleOccupationID === undefined || this.singleOccupationID == null || this.singleOccupationID === '') {
            this.commonService.toastMsg('আপনার পেশা নির্বাচন করুন', false);
        } else if (this.gender === undefined || this.gender == null || this.gender === '') {
            this.commonService.toastMsg('আপনার লিঙ্গগত পরিচয় নির্বাচন করুন', false);
        } else if (this.eduQualificationId === undefined || this.eduQualificationId == null || this.eduQualificationId === '') {
            this.commonService.toastMsg('আপনার শিক্ষাগত যোগ্যতা নির্বাচন করুন', false);
        }
        // else if (this.educationalCertificateAttachment === undefined) {
        //     this.commonService.toastMsg('আপনার শিক্ষাগত যোগ্যতার সনদপত্রের ছবি দিন', false);
        // }
        else if (this.pVillage === undefined || this.pVillage == null || this.pVillage === '') {
            this.commonService.toastMsg('আপনার বর্তমান ঠিকানায় গ্রামের নাম লিখুন', false);
        } else if (this.pRoad === undefined || this.pRoad == null || this.pRoad === '') {
            this.commonService.toastMsg('আপনার বর্তমান ঠিকানায় রাস্তার নাম লিখুন', false);
        } else if (this.pdivisionId === undefined || this.pdivisionId == null || this.pdivisionId === '') {
            this.commonService.toastMsg('আপনার বর্তমান ঠিকানায় বিভাগের নাম লিখুন', false);
        } else if (this.pdistrictId === undefined || this.pdistrictId == null || this.pdistrictId === '') {
            this.commonService.toastMsg('আপনার বর্তমান ঠিকানায় জেলার নাম লিখুন', false);
        } else if (this.pthanaId === undefined || this.pthanaId == null || this.pthanaId === '') {
            this.commonService.toastMsg('আপনার বর্তমান ঠিকানায় থানার নাম লিখুন', false);
        }
        // else if (this.parVillage === undefined || this.parVillage == null || this.parVillage === '') {
        //     this.commonService.toastMsg('আপনার স্থায়ী ঠিকানায় গ্রামের নাম লিখুন', false);
        // } else if (this.parRoad === undefined || this.parRoad == null || this.parRoad === '') {
        //     this.commonService.toastMsg('আপনার স্থায়ী ঠিকানায় রাস্তার নাম লিখুন', false);
        // } else if (this.perdivisionId === undefined || this.perdivisionId == null || this.perdivisionId === '') {
        //     this.commonService.toastMsg('আপনার স্থায়ী ঠিকানায় বিভাগের নাম লিখুন', false);
        // } else if (this.perdistrictId === undefined || this.perdistrictId == null || this.perdistrictId === '') {
        //     this.commonService.toastMsg('আপনার স্থায়ী ঠিকানায় জেলার নাম লিখুন', false);
        // } else if (this.perthanaId === undefined || this.perthanaId == null || this.perthanaId === '') {
        //     this.commonService.toastMsg('আপনার স্থায়ী ঠিকানায় থানার নাম লিখুন', false);
        // }
        else if (this.nationalityId === undefined || this.nationalityId == null || this.nationalityId === '') {
            this.commonService.toastMsg('আপনার জাতীয়তা নির্বাচন করুন', false);
        } else if (this.emergencyName === undefined || this.emergencyName == null || this.emergencyName === '') {
            this.commonService.toastMsg('জরুরি যোগাযোগের ব্যক্তির নাম লিখুন', false);
        } else if (this.emergPercontactNo === undefined || this.emergPercontactNo == null || this.emergPercontactNo === '') {
            this.commonService.toastMsg('জরুরি যোগাযোগের ব্যক্তির মোবাইল নম্বর লিখুন', false);
        } else if (!this.commonService.mobileValidate(this.emergPercontactNo)) {
            this.commonService.toastMsg('জরুরি যোগাযোগের ব্যক্তির সঠিক মোবাইল নম্বর লিখুন', false);
        } else if (this.phNocell === undefined || this.phNocell == null || this.phNocell === '') {
            this.commonService.toastMsg('আপনার মোবাইল নম্বর লিখুন', false);
        }  else if (!this.commonService.mobileValidate(this.phNocell)) {
            this.commonService.toastMsg('আপনার সঠিক মোবাইল নম্বর লিখুন', false);
        } else if (this.examVenue === undefined || this.examVenue == null || this.examVenue === '') {
            this.commonService.toastMsg('আপনার পরীক্ষার কেন্দ্র নির্বাচন করুন', false);
        } else if (this.medicalCertificateAttachment === undefined) {
            this.commonService.toastMsg('আপনার মেডিকেল সনদপত্রের ছবি দিন', false);
        } else if (this.uploadPhoto === undefined) {
            this.commonService.toastMsg('আপনার প্রোফাইল এর  ছবি দিন', false);
        } else if (this.nationalIdAttachment === undefined) {
            this.commonService.toastMsg('আপনার জাতীয় পরিচয় পত্রের ছবি দিন', false);
        } else if (!this.takeDrivingLicenseNumber && this.commonService.inputFieldEmptyChecker(this.educationalCertificateAttachment)) {
            this.commonService.toastMsg('আপনার শিক্ষাগত যোগ্যতার সনদপত্রের ছবি দিন', false);
        } else {
            if (this.isProffesionalActive) {
                if (this.learnerLicenseProfesionalTypeId.length == 0) {
                    this.commonService.toastMsg('মোটরযানের শ্রেণী নির্বাচন করুন', false);
                } else if (this.othersShow && this.othersVehicleTypeId.length == 0) {
                    this.commonService.toastMsg('অন্যান্য যানবাহনের শ্রেণী নির্বাচন করুন', false);
                } else {
                    if (this.takeDrivingLicenseNumber) {
                        if (this.commonService.inputFieldEmptyChecker(this.licenseNo)) {
                            this.commonService.toastMsg('মোটরযান শ্রেণীতে আপনার ড্রাইভিং লাইসেন্স নম্বর লিখুন', false);
                        } else if (this.commonService.inputFieldEmptyChecker(this.licenseRefNo)) {
                            this.commonService.toastMsg('মোটরযান শ্রেণীতে আপনার ড্রাইভিং লাইসেন্স রেফারেন্স নম্বর লিখুন', false);
                        } else if (this.licenseClassId === undefined || this.licenseClassId == null || this.licenseClassId === '') {

                            this.commonService.toastMsg('মলাইসেন্সের শ্রেনী নির্বাচন করুন', false);
                        } else if (this.issueAuthorityId === undefined || this.issueAuthorityId == null || this.issueAuthorityId === '') {
                            this.commonService.toastMsg('ইস্যুকারী কর্তৃপক্ষ নির্বাচন করুন', false);
                        } else if (this.drivingLicenseFileAttachment === undefined || this.commonService.inputFieldEmptyChecker(this.drivingLicenseFileAttachment)) {
                            this.commonService.toastMsg('আপনার ড্রাইভিং লাইসেন্স সংযুক্ত করুন', false);
                        } else if (this.dateOfLicenseIssue === undefined || this.dateOfLicenseIssue == null || this.dateOfLicenseIssue === '') {
                            this.commonService.toastMsg('ইস্যুর তারিখ লিখুন', false);
                        }
                        // else if (this.angshikPassShow && (this.angshikPass == null || this.angshikPass === '')) {
                        //     this.commonService.toastMsg('আংশিক পাশ নির্বাচন করুন', false);
                        // }
                        else {
                            this.sandLearnerLicenseApi();
                        }
                    } else {
                        this.sandLearnerLicenseApi();
                    }


                }
            } else {
                this.sandLearnerLicenseApi();
            }
        }

        // else if (this.vehicleType === undefined || this.vehicleType == null || this.vehicleType === '') {
        //     this.commonService.toastMsg('আপনার যানবাহনের ধরণ নির্বাচন করুন', false );
        // }
    }

    chooseVehicleClassTypeProfessional(event: any, id: any) {

        this.comeToEdit = false;
        if (this.learnerLicenseNonProfesionalMotorCycle) {
            this.learnerLicenseNonProfesionalMotorCycleID = 4;
        } else {
            this.learnerLicenseNonProfesionalMotorCycleID = -1;
        }


        if (this.learnerLicenseNonProfesionalLight) {
            this.learnerLicenseNonProfesionalLightID = 3;

        } else {
            this.learnerLicenseNonProfesionalLightID = -1;
        }

        if (this.learnerLicenseNonProfesionalLightID == 3 && this.learnerLicenseNonProfesionalMotorCycleID == 4) {
            this.angshikPassShow = true;
        }else{
            this.angshikPassShow = false;
        }

        // if (type == '1') {
        //   this.vehicleType = 'MOTORCYCLE';
        //   this.chkCheckUnChecked(this.checked1);
        //   this.dlShowHider(type, this.checked1);
        // } else if (type == '2') {
        //   this.vehicleType = 'LIGHT';
        //   this.chkCheckUnChecked(this.checked2);
        //   this.dlShowHider(type, this.checked2);
        // } else if (type == '3') {
        //   this.vehicleType = 'THREE WHEELER';
        //   this.chkCheckUnChecked(this.checked3);
        //   this.dlShowHider(type, this.checked3);
        // } else if (type == '4') {
        //   this.vehicleType = 'MEDIUM';
        //   this.chkCheckUnChecked(this.checked4);
        //   this.dlShowHider(type, this.checked4);
        // } else if (type == '5') {
        //   this.vehicleType = 'HEAVY';
        //   this.chkCheckUnChecked(this.checked5);
        //   this.dlShowHider(type, this.checked5);
        // } else if (type == '6') {
        //   this.vehicleType = 'PSV';
        //   this.chkCheckUnChecked(this.checked6);
        //   this.dlShowHider(type, this.checked6);
        // }
        // alert(this.vehicleType);
    }

    private chkCheckUnChecked(checked: any) {
        this.checked1 = false;
        this.checked2 = false;
        this.checked3 = false;
        this.checked4 = false;
        this.checked5 = false;
        this.checked6 = false;
        checked = true;
    }

    private dlShowHider(type: any, checked: any) {
        if (type == '4' && checked == false) {
            this.drivingLicense = '';
        } else if (type == '5' && checked == false) {
            this.drivingLicense = '';
        } else {
            this.drivingLicense = 'ion-hide';
        }
    }

    onPreviousClicked() {
        if (this.formPart == '1') {
            this.firstPart = '';
            this.secondPart = 'ion-hide';
            this.previousButton = 'ion-hide';
        } else if (this.formPart == '2') {
            this.secondPart = '';
            this.thirdPart = 'ion-hide';
        } else if (this.formPart == '3') {
            this.nextButton = '';
            this.thirdPart = '';
            this.fourthPart = 'ion-hide';
        }
        this.formPart--;
    }

    onNextClicked() {
        this.formPart++;
        if (this.formPart === 1) {
            this.formPart--;
            if (this.uploadPhoto === '/assets/icon/profile.png') {
                this.commonService.toastMsg('আপনার প্রোফাইল এর ছবি দিন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.nationalId)) {
                this.commonService.toastMsg('আপনার জাতীয় পরিচয় পত্র নম্বর লিখুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.dateOfBirth)) {
                this.commonService.toastMsg('আপনার জন্ম তারিখ লিখুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.enguserName)) {
                this.commonService.toastMsg('নাম লিখুন ইংরেজিতে', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.engFatherName)) {
                this.commonService.toastMsg('আপনার পিতার নাম লিখুন ইংরেজিতে', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.bloodGroupId)) {
                this.commonService.toastMsg('আপনার রক্তের গ্রুপ নির্বাচন করুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.singleOccupationID)) {
                this.commonService.toastMsg('আপনার পেশা নির্বাচন করুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.engMotherName)) {
                this.commonService.toastMsg('আপনার মাতার নাম লিখুন ইংরেজিতে', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.gender)) {
                this.commonService.toastMsg('আপনার লিঙ্গগত পরিচয় নির্বাচন করুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.eduQualificationId)) {
                this.commonService.toastMsg('আপনার শিক্ষাগত যোগ্যতা নির্বাচন করুন', false);
            }
            // else if (this.commonService.inputFieldEmptyChecker(this.educationalCertificateAttachment)) {
            //     this.commonService.toastMsg('আপনার শিক্ষাগত যোগ্যতার সনদপত্রের ছবি দিন', false);
            // }
            else {
                this.formPart++;
                this.firstPart = 'ion-hide';
                this.secondPart = '';
                this.previousButton = '';
            }
        } else if (this.formPart === 2) {
            this.formPart--;
            if (this.commonService.inputFieldEmptyChecker(this.pVillage)) {
                this.commonService.toastMsg('আপনার বর্তমান ঠিকানায় গ্রাম অথবা বাড়ির নাম লিখুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.pRoad)) {
                this.commonService.toastMsg('আপনার বর্তমান ঠিকানায় রোড বা ব্লক বা সেক্টর এর নাম লিখুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.pdivisionId)) {
                this.commonService.toastMsg('আপনার বর্তমান ঠিকানায় বিভাগের নাম নির্বাচন করুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.pdistrictId)) {
                this.commonService.toastMsg('আপনার বর্তমান ঠিকানায় জেলার নাম নির্বাচন করুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.pthanaId)) {
                this.commonService.toastMsg('আপনার বর্তমান ঠিকানায় থানার নাম নির্বাচন করুন', false);
            }

            // else if (this.commonService.inputFieldEmptyChecker(this.parVillage)) {
            //     this.commonService.toastMsg('আপনার স্থায়ী ঠিকানায় গ্রাম অথবা বাড়ির লিখুন', false);
            // } else if (this.commonService.inputFieldEmptyChecker(this.parRoad)) {
            //     this.commonService.toastMsg('আপনার স্থায়ী ঠিকানায় রোড বা ব্লক বা সেক্টর এর নাম লিখুন', false);
            // } else if (this.commonService.inputFieldEmptyChecker(this.perdivisionId)) {
            //     this.commonService.toastMsg('আপনার স্থায়ী ঠিকানায় বিভাগের নাম নির্বাচন করুন', false);
            // } else if (this.commonService.inputFieldEmptyChecker(this.perdistrictId)) {
            //     this.commonService.toastMsg('আপনার স্থায়ী ঠিকানায় জেলার নাম নির্বাচন করুন', false);
            // } else if (this.commonService.inputFieldEmptyChecker(this.perthanaId)) {
            //     this.commonService.toastMsg('আপনার স্থায়ী ঠিকানায় থানার নাম নির্বাচন করুন', false);
            // }
            //
            else if (this.commonService.inputFieldEmptyChecker(this.nationalityId)) {
                this.commonService.toastMsg('আপনার জাতীয়তা নির্বাচন করুন', false);
            } else if (this.dualCitizenShipCountry === '' && this.dualCitizenShipRow === '') {
                this.commonService.toastMsg('দ্বৈত নাগরিকত্বের দেশ নির্বাচন করুন', false);
            } else {
                this.formPart++;
                this.secondPart = 'ion-hide';
                this.thirdPart = '';
                this.previousButton = '';
            }
        } else if (this.formPart === 3) {
            this.formPart--;
            if (this.commonService.inputFieldEmptyChecker(this.emergencyName)) {
                this.commonService.toastMsg('জরুরি যোগাযোগের ব্যক্তির নাম লিখুন', false);
            } else if (!this.commonService.mobileValidate(this.phNocell)) {
                this.commonService.toastMsg('আপনার সঠিক মোবাইল নম্বর লিখুন', false);
            } else if (!this.commonService.mobileValidate(this.emergPercontactNo)) {
                this.commonService.toastMsg('জরুরি যোগাযোগের ব্যক্তির সঠিক মোবাইল নম্বর লিখুন', false);
            } else {
                this.formPart++;
                this.nextButton = 'ion-hide';
                this.thirdPart = 'ion-hide';
                this.fourthPart = '';
                this.previousButton = '';
            }
        }
    }

    private chkBokController(type: any) {
        if (type == '1') {
            this.nonProfessionalGrid = '';
            this.professionalGrid = 'ion-hide';

        } else if (type == '2') {
            this.nonProfessionalGrid = 'ion-hide';
            this.professionalGrid = '';

            this.loadProfessionalVehicleClass(2);
        }


    }

    async browseImageFile(documentType: any) {
        const actionSheet = await this.actionsheetCtrl.create({
            header: 'Upload Photo',
            cssClass: 'action-sheets-page',
            buttons: [
                {
                    text: 'Camera',
                    role: 'destructive',
                    icon: 'camera',
                    handler: () => {
                        this.captureImage(false, documentType);
                    }
                },
                {
                    text: 'Gallery',
                    icon: 'images',
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

        console.log('taken image info', options);

        const imageData = await this.camera.getPicture(options);
        // console.log('taken image info1', imageData);
        this.base64Image = `${imageData}`;
        console.log('taken image info2', this.base64Image);
        // this.base64Image = `data:image/jpeg;base64,${imageData}`;
        console.log('taken image info3', `data:image/jpeg;base64,${imageData}`);
        if (documentType == 'EC') {
            this.educationalCertificateFileSize = 1;
            // this.educationalCertificateFileType = 'image/jpeg';
            this.educationalCertificateFileType = 'data:image/jpeg';
            this.educationalCertificateAttachment = this.base64Image;
            this.isEducationCirtificateUpload = true;
        } else if (documentType == 'MC') {
            this.medicalCertificateFileSize = 1;
            this.medicalCertificateFileType = 'data:image/jpeg';
            this.medicalCertificateAttachment = this.base64Image;
            this.isMedicalCertificateUpload = true;
        } else if (documentType == 'OT') {
            this.nationalIdFileSize = 1;
            this.nationalIdFileType = 'data:image/jpeg';
            this.nationalIdAttachment = this.base64Image;
            this.isNationalCertificateUpload = true;
        } else if (documentType == 'UB') {
            this.electricityBillFileSize = 1;
            this.electricityBillFileType = 'data:image/jpeg';
            this.electricityBillFileAttachment = this.base64Image;
            this.isUtilityUpload = true;
        } else if (documentType == 'DL') {
            this.drivingLicenseFileSize = 1;
            this.drivingLicenseFileType = 'data:image/jpeg';
            this.drivingLicenseFileAttachment = this.base64Image;
            this.isDrivingLicenseUpload = true;
        } else if (documentType == 'user') {
            this.photoSize = 1;
            this.photoType = 'data:image/jpeg';
            this.photo = this.base64Image;
            this.uploadPhoto = `data:image/jpeg;base64,${imageData}`;
            // this.uploadPhoto = this.base64Image;
        }

        // this.photos.unshift(this.base64Image);

    }

    onDualCitizenShip(type: any) {
        if (type === '1') {
            this.dualCitizenShipCountry = '';
            this.chkDualCitizenShip(this.chkBoxNo);
            this.dualCitizenShipRow = 'ion-hide';
        } else if (type === '2') {
            this.dualCitizenShipRow = '';
            this.chkDualCitizenShip(this.chkBoxYes);
        }
    }

    chkDualCitizenShip(checked: any) {
        this.chkBoxNo = false;
        this.chkBoxYes = false;
        checked = true;
    }

    getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
}
