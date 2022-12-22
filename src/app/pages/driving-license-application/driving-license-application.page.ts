import {Component, OnInit, ViewChild} from '@angular/core';
import {LearnerServiceService} from '../../services/learner/learner-service.service';
import {CommonService} from '../../services/common/common.service';
import {ActionSheetController, IonContent, IonSlides, LoadingController} from '@ionic/angular';
import {AbstractControl, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import {__await} from 'tslib';
import {NotificationService} from '../../services/notification/notification.service';

@Component({
    selector: 'app-driving-license-application',
    templateUrl: './driving-license-application.page.html',
    styleUrls: ['./driving-license-application.page.scss'],
})
export class DrivingLicenseApplicationPage implements OnInit {


    @ViewChild(IonContent, {static: true}) ionContent: IonContent;
    @ViewChild(IonSlides, {static: false}) ionSlides: IonSlides;
    //@ViewChild('billingFormRef', { static: false }) billingFormRef: NgForm;
    //@ViewChild('shippingFormRef', { static: false }) shippingFormRef: NgForm;
    //@ViewChild('paymentFormRef', { static: false }) paymentFormRef: NgForm;


    //public billingForm: FormGroup;
    //public paymentForm: FormGroup;
    // public shippingForm: FormGroup;

    //public imagePath: SafeResourceUrl;

    public times = [];

    public slidesOpts = {
        allowTouchMove: false,
        autoHeight: true,
    };

    // UPDATES
    public progressBar: any = 0;
    public wizardSteps: string[];
    public completeWizardSteps: any = [];

    // public slides: string[];
    public currentSlide: string;
    public isBeginning: boolean = true;
    public isEnd: boolean = false;


    formPart: any = 1;
    nidDataPart: any;
    drivingLicensePart: any = 'ion-hide';
    saveCanclePart: any = 'ion-hide';
    previousButton: any = 'ion-hide';
    nextButton: any = '';
    typeOfCardDelivery: any;
    cardDeliveryAddressType: any;
    nidData: any;
    nidNo: any;
    dob: any;
    nameEng: any;
    nameBn: any;
    fatherNameBn: any;
    motherNameBn: any;
    nidPhoto: any;

    maritualStatusList: any;
    // genderList: any;
    nationalityList: any;
    pDivisionList: any;
    pDistrictList: any;
    pPoliceStationList: any;
    parDivisionList: any;
    parDistrictList: any;
    perDisIdForThanaLoadEdit: any = '';
    parPoliceStationList: any;
    othersLicenseClassList = [];
    learnerData: any;
    bloodGroupList: any;
    occupationList: any;
    vehicleClassList: any = [];
    othersVehicleClassList: any = [];
    othersVehicleDataList: any = [];
    languageLicenseList: any;
    applicationTypeLists: any;
    applicaticantList: any;

    maritalId: any;
    bloodGroupId: any;
    licenseClassId: any;
    licenseClassIdArray: any;
    issueAuthorityId: any;
    issueAuthorityIdArray: any;
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
    examVenueList: any;
    parVillage: any;
    perAddressSameAsPresent: any;
    perPostCode: any;
    perdivisionId: any;
    examDate = null;
    examVenue = null;
    angshikPass: any = 'N';
    angshikPassShow: any = false;
    isExamVenueSingle: boolean = false;
    educationalQualificationList: any;
    selectedLicenseType: any;
    languageLicenseSelected: any;
    attachmentFileList: any;

    comeToEdit: boolean = false;
    classHeavy: boolean = false;
    classMedium: boolean = false;
    classLight: boolean = false;
    learnerLicenseProfesionalTypeId: any;
    othersShow: any = false;
    othersVehicleTypeId: any;
    takeDrivingLicenseNumber: boolean;
    tempVClassArray = [];
    nonProfessionalGrid: any = '';
    professionalGrid: any = 'ion-hide';
    learnerLicenseNonProfesionalLight: any;
    learnerLicenseNonProfesionalMotorCycle: any;
    learnerLicenseNonProfesionalMotorCycleID: any;
    learnerLicenseNonProfesionalLightID: any;
    learnerLicenseType: any;
    isProffesionalActive: any;
    drivingLicenseDetails = [];
    dateOfLicenseIssue: any;
    applicationType: any;
    applicantType: any;
    licenseNo: any;
    licenseRefNo: any;
    encCitizenDLID: any;
    nationalityId: any;
    dualCitizenShipCountry: any;

    isDualCitizen: any;
    dualCitizenYN: any;
    eduQualificationId: any;
    singleOccupationID: any;
    fatherNameEn: any;
    motherNameEn: any;
    spouseNameEn: any;
    spousePhoneNo: any = '';
    gender: any;
    applicantEmergencyContactNo: any;
    applicantEmail: any;
    applicantMobileNo: any;
    applicantMobileNoOffice: any = '';
    applicantMobileNoRasidence: any = '';
    emergencyContactName: any = '';
    applicantRelation: any = '';
    applicantEmargencyEmail: any = '';
    nidPresentHome: any;
    nidPresentBlock: any;
    nidPresentBivag: any;
    nidPresentDistict: any;
    nidPresentThana: any;
    nidPresentPostcode: any;
    nidPermanentHome: any;
    nidPermanentBlock: any;
    nidPermanentBivag: any;
    nidPermanentDistrict: any;
    nidPermanentThana: any;
    nidPermanentPostcode: any;
    presentHome: any;
    presentBlock: any;
    presentVibag: any;
    presentVibagId: any;
    presentDistrict: any;
    presentDistrictId: any;
    presentThana: any;
    presentThanaId: any;
    presentPostcode: any;
    permanentHome: any;
    permanentBlock: any;
    permanentVibag: any;
    permanentDistrict: any;
    permanentThana: any;
    permanentPostcode: any;
    cercleOffice: any;
    examVanueEmargency: any;
    fileMedical: any;
    fileEducation: any;
    fileUtility: any;
    fileNID: any;


    base64Image: any;
    educationalCertificateFileSize: any;
    educationalCertificateFileType: any;
    electricityBillFileAttachment: any;
    electricityBillFileSize: any;
    electricityBillFileType: any;
    drivingLicenseFileAttachment: any;
    drivingLicenseFileSize: any;
    drivingLicenseFileType: any;
    educationalCertificateAttachment: any;
    medicalCertificateAttachment: any;
    medicalCertificateFileSize: any;
    medicalCertificateFileType: any;
    mobileValidateByOtp: any;
    nationalId: any;
    nationalIdAttachment: any;
    nationalIdFileSize: any;
    nationalIdFileType: any;
    isEducationCirtificateUpload: boolean;
    isMedicalCertificateUpload: boolean;
    isNationalCertificateUpload: boolean;
    isUtilityUpload: boolean;
    isDrivingLicenseUpload: boolean;
    photo: any;
    photoSize: any;
    photoType: any;
    uploadPhoto: any;
    nidUploadComplete: boolean = false;
    ubUploadComplete: boolean = false;
    eduUploadComplete: boolean = false;
    mcUploadComplete: boolean = false;

    nidUploadButtonActive: boolean = true;
    ubUploadButtonActive: boolean = true;
    eduUploadButtonActive: boolean = true;
    mcUploadButtonActive: boolean = true;

    othersHome: any;
    othersBlock: any;
    othersDivision: any;
    othersPerDivision: any;
    othersDivisionID: any;
    othersDistrict: any;
    othersPerDistrict: any;
    othersDistrictID: any;
    othersThana: any;
    othersPerThana: any;
    othersThanaID: any;
    othersPostCode: any;
    othersPerPostCode: any;
    othersMobileNo: any;
    othersCardDeliveryActive: boolean = false;
    isPermanet: boolean = false;
    othersParDivisionList: any;
    othersParDistrictList: any;
    othersParThanaList: any;

    serviceRequestNo: any;
    sesServiceNo: any;

    nidGenderFound: any = false;
    nidGenderID: any;
    nidBloodGroupID: any;
    nidBloodGroupFound: any = false;

    constructor(private learnerService: LearnerServiceService, private notificationService: NotificationService, private router: Router, private route: ActivatedRoute, private camera: Camera, private actionsheetCtrl: ActionSheetController,
                private loadingController: LoadingController, private commonService: CommonService) {
    }

    ngOnInit() {

        this.buildSlides();
        this.isDualCitizen = false;

        this.loadIssueAuthority();
        this.loadNationalityList();
        this.loadBloodGroupList();
        this.loadOccupationList();
        this.loadPDivisionList();
        this.loadMaritalStatus();
        this.loadEducationalQualification();
        this.loadParDivisionList();
        this.loadDrivingLicenseData();
        this.otherClassOptionClick();
        this.loadExamVanueList();

        try {
            this.route.queryParams.subscribe(params => {
                const notify = params['notification'];
                console.log('notify', notify);
                console.log('service no', params['serviceNo']);
                this.serviceRequestNo = params['serviceNo'];
                this.comeToEdit = true;
                if (notify === 'edit') {
                    this.comeToEdit = true;
                    this.onEdit(this.serviceRequestNo);
                } else {
                    this.loadNIDData();
                }
                // } else {
                //     this.serviceRequestNo = this.router.getCurrentNavigation().extras.state.serviceRequestId;
                // }

            });
        } catch (e) {
            this.sesServiceNo = null;
        }

        this.takeDrivingLicenseNumber = false;

    }

    ionViewWillEnter() {

    }

    public customOptions: any = {
        header: 'Please Select Any One'
    };

     public customOptionsWithReminder: any = {
        header: '** স্মার্ট কার্ডে জাতীয় পরিচয়পত্রের স্থায়ী ঠিকানা প্রিন্ট হবে বিধায় জাতীয় পরিচয়পত্রের স্থায়ী ঠিকানা অনুযায়ী ইংরেজিতে অনুবাদ করুন।',
        cssStyle:'--color: red'
    };




    async onEdit(serviceRequestNo) {
        const editLoading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
        editLoading.present();
        this.clearData();
        // const myObj = {
        //     encCitizenDLId: this.encCitizenDLID
        // };
        // const postData = JSON.stringify(myObj);
        console.log('serviceRequestNo: ', serviceRequestNo);
        this.learnerService.getDrivingLicenseEditData(serviceRequestNo).subscribe(async result => {
            console.log('onEdit getDrivingLicenseEditData:', result);
            if (result['status'] == '200') {
                this.encCitizenDLID = serviceRequestNo;
                let tempData = result['data'];
                this.learnerLicenseType = tempData['typeOfLicenseId'];
                await this.loadProfessionalVehicleClass(this.learnerLicenseType, tempData);
                // this.reSetData(tempData);
                console.log('edit data', tempData);
                this.comeToEdit = true;
            } else {
                this.commonService.toastMsg(result['message'], false);
                editLoading.dismiss();
                return;
            }
            editLoading.dismiss();
        });
    }

    async reSetData(data) {
        let licenseTempData = [];
        let licenseOthersTempData = [];
        licenseTempData = data['licenseVehicleClassDetails'];
        licenseOthersTempData = data['othersLicenseVehicleClassDetails'];
        // this.learnerLicenseType = data['typeOfLicenseId'];
        console.log('learnerLicenseType', this.learnerLicenseType);
        this.learnerLicenseProfesionalTypeId = [];
        // console.log('licenseOthersTempData', licenseOthersTempData.);


        if (licenseTempData != null) {
            for (let i = 0; i < licenseTempData.length; i++) {
                const lcId = licenseTempData[i].licenseClassId;
                console.log('into the loop', licenseTempData.length);
                console.log('into the loop lcId', lcId);

                if (this.drivingLicenseDetails.length >= 2) {
                    this.angshikPassShow = true;
                }
                if (this.learnerLicenseType == '2') {
                    console.log('for professional');
                    this.drivingLicenseDetails.push({'allowYN': licenseTempData[i].allowYN, 'licenseClassId': lcId});


                    // await this.loadProfessionalVehicleClass('2');
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
                } else if (this.learnerLicenseType == '3') {
                    // await this.loadProfessionalVehicleClass('3');
                    this.othersShow = false;
                    this.othersVehicleTypeId = [];
                    this.othersVehicleClassList = [];
                    this.isProffesionalActive = false;
                    // this.learnerLicenseProfesionalTypeId = [];
                    if (lcId === '3') {
                        this.learnerLicenseProfesionalTypeId.push(lcId);
                        // this.learnerLicenseNonProfesionalLight = true;
                    } else if (lcId === '4') {
                        this.learnerLicenseProfesionalTypeId.push(lcId);
                        // this.learnerLicenseNonProfesionalMotorCycle = true;
                    }

                    // if(this.learnerLicenseNonProfesionalLight && this.learnerLicenseNonProfesionalMotorCycle){
                    //     this.angshikPassShow = true;
                    // }
                }
            }

        }

        if (licenseOthersTempData != null && licenseOthersTempData.length > 0) {

            console.log('come to adapt others data');
            this.othersShow = true;
            this.learnerLicenseProfesionalTypeId.push('-1');
            this.othersVehicleTypeId = [];
            for (let k = 0; k < licenseOthersTempData.length; k++) {
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
        //first part
        this.nidPhoto = 'data:image/png;base64,' + data['photoBase64'];
        this.nidNo = data['nid'];
        this.dob = data['dateOfBirth'];
        this.nameEng = data['nameEnglish'];
        this.nameBn = data['nameBangla'];
        this.fatherNameBn = data['fathersNameBangla'];
        this.motherNameBn = data['mothersNameBangla'];

        // second part
        this.languageLicenseSelected = data['drivingLicenseLanguageName'];
        this.applicationType = data['applicationTypeId'];
        this.selectedLicenseType = data['typeOfLicenseId'];
        this.applicantType = data['applicantTypeId'];
        // this.learnerLicenseProfesionalTypeId = data['nid'];
        // this.othersVehicleTypeId = data['nid'];
        this.licenseNo = data['previousLicenseNo'];
        this.licenseClassId = data['previousLicenseClass'];
        this.dateOfLicenseIssue = data['previousLicenseIssueDate'];
        this.licenseRefNo = data['dlReferenceNo'];
        this.issueAuthorityId = data['dlIssuingAuthorityId'];

        //third part
        this.fatherNameEn = data['fathersNameEnglish'];
        this.motherNameEn = data['mothersNameEnglish'];
        this.spouseNameEn = data['spouseNameEnglish'];
        this.spousePhoneNo = data['spouseContactNo'];
        this.nidGenderID = data['nid_genderId'];
        this.nidBloodGroupID = data['nid_bloodGroupId'];
        if (this.nidGenderID === undefined || this.nidGenderID == null || this.nidGenderID === '') {

            this.nidGenderFound = false;
        } else {
            this.nidGenderFound = true;
        }

        if (this.nidBloodGroupID === undefined || this.nidBloodGroupID == null || this.nidBloodGroupID === '') {
            this.nidBloodGroupFound = false;
        } else {

            this.nidBloodGroupFound = true;
        }
        this.gender = data['genderId'];
        this.bloodGroupId = data['bloodGroupId'];
        this.eduQualificationId = data['educationalQualificationId'];
        this.singleOccupationID = data['occupationId'];
        this.maritalId = data['maritalStatusId'];
        this.nationalityId = data['nationalityId'];
        if (data['dualCitizenYn'] === 'Y') {
            this.isDualCitizen = true;
        } else {
            this.isDualCitizen = false;
        }
        // this.isDualCitizen = data['dualCitizenYn'];
        this.dualCitizenShipCountry = data['countryId'];
        console.log('dual citizen edit: ', this.dualCitizenShipCountry);
        //forth part
        this.applicantMobileNo = data['mobileNo'];
        this.applicantMobileNoOffice = data['phoneNoOffice'];
        this.applicantMobileNoRasidence = data['phoneNoHome'];
        this.applicantEmail = data['email'];
        this.emergencyContactName = data['emergencyName'];
        this.applicantEmergencyContactNo = data['emergencyContactNo'];
        this.applicantRelation = data['emergencyRelationship'];
        this.applicantEmargencyEmail = data['emergencyEmail'];

        this.nidPresentHome = data['nid_village'];
        this.nidPresentBlock = data['nid_road'];
        this.nidPresentBivag = data['nid_division'];
        this.nidPresentDistict = data['nid_district'];
        this.nidPresentThana = data['nid_thana'];
        this.nidPresentPostcode = data['nid_postCode'];
        this.nidPermanentHome = data['nid_per_village'];
        this.nidPermanentBlock = data['nid_per_road'];
        this.nidPermanentBivag = data['nid_per_divisionName'];
        this.nidPermanentDistrict = data['nid_per_districtName'];
        this.nidPermanentThana = data['nid_per_thanaName'];
        this.nidPermanentPostcode = data['nid_per_postCode'];


        this.presentHome = data['p_village'];
        this.presentBlock = data['p_road'];
        this.presentVibag = data['p_divisionName'];
        this.presentDistrictId = data['p_districtId'];
        this.presentVibagId = data['p_divisionId'];
        this.presentThanaId = data['p_thanaId'];

        this.presentDistrict = data['p_districtName'];
        this.presentThana = data['p_thanaName'];
        this.presentPostcode = data['p_postCode'];
        this.permanentHome = data['per_village'];
        this.permanentBlock = data['per_road'];
        this.perdivisionId = data['per_divisionId'];
        this.loadPermanentDistrictListEdit(data['per_districtId'], data['per_thanaId']);
        // attachment base 64 file
        // this.perdistrictId = data['per_districtId'];
        // converted file size
        // file type is image type
        this.permanentPostcode = data['per_postCode'];
        this.cercleOffice = data['branchName'];
        // this.loadExamVanueList();

        this.examVenue = data['examVenue'];
        console.log('exam vanue', data['examVenue']);
        if (this.commonService.inputFieldEmptyChecker(this.examVenue)) {
            console.log('exam venue null');
            this.isExamVenueSingle = false;
            this.examVenueList = data['venueList'];
            console.log('exam venue list', this.examVenueList);

        } else {
            this.isExamVenueSingle = true;
            console.log('exam venue not null');
        }

        //fifth part

        this.attachmentFileList = data['attachmentFileDetails'];
        console.log('attachment file list: ', this.attachmentFileList);
        console.log('attachment file list MC: ', this.attachmentFileList[0]);
        console.log('attachment file list UB: ', this.attachmentFileList[1]);
        console.log('attachment file list EDU: ', this.attachmentFileList[2]);
        console.log('attachment file list NID: ', this.attachmentFileList[3]);
        console.log('have file?: ', this.commonService.inputFieldEmptyChecker(this.attachmentFileList));
        if (!this.commonService.inputFieldEmptyChecker(this.attachmentFileList)) {
            this.mcUploadComplete = true;
            this.eduUploadComplete = true;
            this.ubUploadComplete = true;
            this.nidUploadComplete = true;

            this.educationalCertificateFileSize = 1;
            this.educationalCertificateFileType = 'image/jpeg';
            console.log('load edu attachment file', this.attachmentFileList[2].dlAttachmentFileValue);
            this.educationalCertificateAttachment = this.attachmentFileList[2].dlAttachmentFileValue;
            this.isEducationCirtificateUpload = true;

            this.medicalCertificateFileSize = 1;
            this.medicalCertificateFileType = 'image/jpeg';
            console.log('load med attachment file', this.attachmentFileList[0].dlAttachmentFileValue);
            this.medicalCertificateAttachment = this.attachmentFileList[0].dlAttachmentFileValue;
            this.isMedicalCertificateUpload = true;


            this.nationalIdFileSize = 1;
            this.nationalIdFileType = 'image/jpeg';
            console.log('load nid attachment file', this.attachmentFileList[3].dlAttachmentFileValue);
            this.nationalIdAttachment = this.attachmentFileList[3].dlAttachmentFileValue;
            this.isNationalCertificateUpload = true;


            this.electricityBillFileSize = 1;
            this.electricityBillFileType = 'image/jpeg';
            console.log('load utility attachment file', this.attachmentFileList[1].dlAttachmentFileValue);
            this.electricityBillFileAttachment = this.attachmentFileList[1].dlAttachmentFileValue;
            this.isUtilityUpload = data['nid'];
        }


        this.typeOfCardDelivery = data['cardDeliveryByPostalYn'];
        this.cercleOffice = data['branchName'];
        this.cardDeliveryAddressType = data['addressTypeId'];
        if (this.typeOfCardDelivery == 'Y') {
            if (this.cardDeliveryAddressType == '1') {
                this.othersCardDeliveryActive = false;
                this.isPermanet = false;
                this.othersDivision = data['postal_DivisionId'];
                this.othersDistrictID = data['postal_DistrictId'];
                this.othersThanaID = data['postal_ThanaId'];
            } else if (this.cardDeliveryAddressType == '2') {
                this.othersCardDeliveryActive = false;
                this.isPermanet = true;
                this.othersPerDivision = data['postal_DivisionId'];
                this.othersPerDistrict = data['postal_DistrictId'];
                this.othersPerThana = data['postal_ThanaId'];
            } else {
                this.othersCardDeliveryActive = true;
                this.isPermanet = false;
                this.othersDivisionID = data['postal_DivisionId'];
                this.othersDistrict = data['postal_DistrictId'];
                this.othersThana = data['postal_ThanaId'];
            }
        }

        this.othersMobileNo = data['deliveryMobileNo'];
        this.othersHome = data['postal_Village'];
        this.othersBlock = data['postal_Road_Block'];
        this.othersPostCode = data['postal_Code'];
    }

    clearData() {
        //first part
        this.nidPhoto = null;
        this.nidNo = null;
        this.dob = null;
        this.nameEng = null;
        this.nameBn = null;
        this.fatherNameBn = null;
        this.motherNameBn = null;

        //second part
        this.languageLicenseSelected = null;
        this.applicationType = null;
        this.selectedLicenseType = null;
        this.applicantType = null;
        this.learnerLicenseProfesionalTypeId = null;
        this.othersVehicleTypeId = null;
        this.licenseNo = null;
        this.licenseClassId = null;
        this.dateOfLicenseIssue = null;
        this.licenseRefNo = null;
        this.issueAuthorityId = null;

        //third part
        this.fatherNameEn = null;
        this.motherNameEn = null;
        this.spouseNameEn = null;
        this.spousePhoneNo = '';
        this.gender = null;
        this.bloodGroupId = null;
        this.eduQualificationId = null;
        this.singleOccupationID = null;
        this.maritalId = null;
        this.nationalityId = null;
        this.isDualCitizen = null;
        this.dualCitizenShipCountry = null;

        //forth part
        this.applicantMobileNo = '';
        this.applicantMobileNoOffice = '';
        this.applicantMobileNoRasidence = '';
        this.applicantEmail = null;
        this.emergencyContactName = null;
        this.applicantEmergencyContactNo = '';
        this.applicantRelation = null;
        this.applicantEmargencyEmail = null;
        this.nidPresentHome = null;
        this.nidPresentBlock = null;
        this.nidPresentBivag = null;
        this.nidPresentDistict = null;
        this.nidPresentThana = null;
        this.nidPresentPostcode = null;
        this.nidPermanentHome = null;
        this.nidPermanentBlock = null;
        this.nidPermanentBivag = null;
        this.nidPermanentDistrict = null;
        this.nidPermanentThana = null;
        this.nidPermanentPostcode = null;
        this.presentHome = null;
        this.presentBlock = null;
        this.presentVibag = null;
        this.presentDistrict = null;
        this.presentThana = null;
        this.presentPostcode = null;
        this.permanentHome = null;
        this.permanentBlock = null;
        this.perdivisionId = null; // attachment base 64 file
        this.perdistrictId = null; // converted file size
        this.perthanaId = null; // file type is image type
        this.permanentPostcode = null;
        this.cercleOffice = null;
        this.examVenue = null;

        //fifth part
        this.mcUploadComplete = false;
        this.eduUploadComplete = false;
        this.ubUploadComplete = false;
        this.nidUploadComplete = false;

        this.educationalCertificateFileSize = null;
        this.educationalCertificateFileType = null;
        this.educationalCertificateAttachment = null;
        this.isEducationCirtificateUpload = null;

        this.medicalCertificateFileSize = null;
        this.medicalCertificateFileType = null;
        this.medicalCertificateAttachment = null;
        this.isMedicalCertificateUpload = null;


        this.nationalIdFileSize = null;
        this.nationalIdFileType = null;
        this.nationalIdAttachment = null;
        this.isNationalCertificateUpload = null;


        this.electricityBillFileSize = null;
        this.electricityBillFileType = null;
        this.electricityBillFileAttachment = null;
        this.isUtilityUpload = null;

        this.typeOfCardDelivery = null;
        this.cercleOffice = null;
        this.cardDeliveryAddressType = null;
        this.othersMobileNo = '';
        this.othersHome = null;
        this.othersBlock = null;
        this.othersDivisionID = null;
        this.othersPerDivision = null;
        this.othersDivision = null;
        this.othersCardDeliveryActive = false;
        this.isPermanet = false;
        this.othersDistrictID = null;
        this.othersPerDistrict = null;
        this.othersDistrict = null;
        this.othersThanaID = null;
        this.othersPerThana = null;
        this.othersThana = null;
        this.othersPostCode = null;
    }

    changeDualCitizen() {
        if (this.isDualCitizen) {
            this.isDualCitizen = false;
            this.dualCitizenYN = 'N';
            this.dualCitizenShipCountry = '';
        } else {
            this.isDualCitizen = true;
            this.dualCitizenYN = 'Y';
        }
    }

    loadNIDData() {

        this.learnerService.getNidDataForDrivingLicense().subscribe(result => {
            if (result ['status'] == 200) {
                this.nidData = result['data'];
                console.log('nid data: ', this.nidData);
                this.applicantMobileNo = this.nidData['contactNo'].substring(2, 13);
                console.log('pohne number:', this.applicantMobileNo);
                this.applicantEmail = this.nidData['email'];
                this.nidNo = this.nidData['nid'];
                this.presentVibag = this.nidData['divisionName'];
                this.presentVibagId = this.nidData['divisionId'];
                this.presentDistrictId = this.nidData['districtId'];
                this.presentDistrict = this.nidData['districtName'];
                this.presentThanaId = this.nidData['thanaId'];
                this.presentThana = this.nidData['thanaName'];
                this.dob = this.nidData['dateOfBirth'];
                this.nameEng = this.nidData['nid_nameEnglish'];
                this.nameBn = this.nidData['nid_nameBangla'];
                this.fatherNameBn = this.nidData['nid_fathersNameBangla'];
                this.motherNameBn = this.nidData['nid_mothersNameBangla'];
                this.nidPhoto = this.nidData['nid_photo_base64'];
                this.gender = this.nidData['nid_genderId'];
                if (this.gender === undefined || this.gender == null || this.gender === '') {

                    this.nidGenderFound = false;
                } else {
                    this.nidGenderFound = true;
                }

                // if (this.gender != null){
                this.bloodGroupId = this.nidData['nid_bloodGroupId'];
                if (this.bloodGroupId === undefined || this.bloodGroupId == null || this.bloodGroupId === '') {
                    this.nidBloodGroupFound = false;

                } else {
                    this.nidBloodGroupFound = true;
                }
                //     this.nidGenderFound = true;
                // }
                // if (this.bloodGroupId != null){
                //     this.nidBloodGroupFound = true;
                // }
                this.nidPresentHome = this.nidData['nid_village'];
                this.nidPresentBlock = this.nidData['nid_road'];
                this.nidPresentBivag = this.nidData['nid_divisionName'];
                this.nidPresentDistict = this.nidData['nid_districtName'];
                this.nidPresentThana = this.nidData['nid_thanaName'];
                this.nidPresentPostcode = this.nidData['nid_postCode'];
                this.nidPermanentHome = this.nidData['nid_per_village'];
                this.nidPermanentBlock = this.nidData['nid_per_road'];
                this.nidPermanentBivag = this.nidData['nid_per_divisionName'];
                this.nidPermanentDistrict = this.nidData['nid_per_districtName'];
                this.nidPermanentThana = this.nidData['nid_per_thanaName'];
                this.nidPermanentPostcode = this.nidData['nid_per_postCode'];
                this.cercleOffice = this.nidData['branchName'];
            } else {
                this.commonService.toastMsg(result['message'], false);
            }

        });

        this.loadExamVanueList();
    }

    async onLicenseTypeClick() {
        console.log(this.selectedLicenseType);
        this.learnerLicenseType = this.selectedLicenseType;
        if (this.selectedLicenseType == '3') {
            const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
            await loading.present();
            this.learnerLicenseProfesionalTypeId = '';
            this.othersVehicleTypeId = '';
            this.takeDrivingLicenseNumber = false;
            this.chkBokController(this.selectedLicenseType);
            this.isProffesionalActive = false;
            loading.dismiss();
        } else if (this.selectedLicenseType == '2') {
            const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
            await loading.present();
            this.learnerLicenseProfesionalTypeId = '';
            this.learnerLicenseNonProfesionalMotorCycle = false;
            this.learnerLicenseNonProfesionalLight = false;
            this.isProffesionalActive = true;
            this.chkBokController(this.selectedLicenseType);
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

    private chkBokController(type: any) {
        if (type == '3') {
            this.nonProfessionalGrid = '';
            this.loadProfessionalVehicleClass(3, null);
            this.professionalGrid = 'ion-hide';

        } else if (type == '2') {
            this.nonProfessionalGrid = 'ion-hide';
            this.professionalGrid = '';

            this.loadProfessionalVehicleClass(2, null);
        }


    }


    loadNationalityList() {
        this.learnerService.getNationalityList().subscribe(result => {

            if (result ['status'] == 200) {
                this.nationalityList = result['data']['countryList'];

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

    loadDrivingLicenseData() {
        this.learnerService.getDrivingLicenseData().subscribe(result => {

            if (result ['status'] == 200) {
                this.learnerData = result['data'];
                this.languageLicenseList = this.learnerData.dlLanguageList;
                this.applicationTypeLists = this.learnerData.applicationTypeList;
                this.applicaticantList = this.learnerData.applicantList;

                console.log("languageLicenseList length", this.languageLicenseList.length);
                console.log("applicationTypeLists length", this.applicationTypeLists.length);
                console.log("applicaticantList length", this.applicaticantList.length);

                if(this.languageLicenseList.length === 1){
                    this.languageLicenseSelected = this.languageLicenseList[0].languageValue;
                }
                if(this.applicationTypeLists.length === 1){
                    this.applicationType = this.applicationTypeLists[0].applicationTypeId;
                }
                if(this.applicaticantList.length === 1){
                    this.applicantType = this.applicaticantList[0].applicantTypeId;
                }

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

    loadOthersParDivisionList(divisionId) {

        this.learnerService.getPDivisionList().subscribe(result => {

            if (result ['status'] == 200) {
                this.othersParDivisionList = result['data']['divisionList'];
            }


            // if (autoSearch){
            //     this.loadOthersPermanentDistrictList(true, divisionId);
            // }


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
        // console.log('event', event);
        // let selectedID = event.detail.value;
        // console.log('clicked at division list', this.parDivisionList);
        // let divisionData = this.parDivisionList.filter(division => division.id == selectedID);
        // this.othersPerDivision = divisionData[0].name;
        // this.othersDivision = event
        this.loadPermanentDistrictList(event);
        this.loadExamVanueList();
    }

    loadPermanentDistrictList(parDivId: any) {
        console.log('get division', parDivId);
        const params = {divisionId: parDivId};
        this.learnerService.getPDistrictList(params).subscribe(result => {
            if (result ['status'] == 200) {
                this.parDistrictList = result['data']['districtList'];
                console.log('district list', this.perdistrictId);
            } else {
            }
            this.perdistrictId = this.tempPerDisId;
            console.log('district list', this.perdistrictId);
        });
    }

    loadPermanentDistrictListEdit(parDisId: any, thanaID: any) {
        console.log('get edit division', this.perdivisionId);
        console.log('get edit distric', parDisId);
        console.log('get edit thana', thanaID);
        const params = {divisionId: this.perdivisionId};
        this.learnerService.getPDistrictList(params).subscribe(result => {
            if (result ['status'] == 200) {
                this.parDistrictList = result['data']['districtList'];
                this.perdistrictId = parDisId;
                this.perDisIdForThanaLoadEdit = parDisId;
                console.log('get edit distric list', this.parDistrictList);
                this.loadPermanentThanaListEdit(thanaID);
            } else {
            }
            // this.perdistrictId = this.tempPerDisId;
            console.log('district list', this.perdistrictId);
        });
    }

    loadOthersPermanentDistrictList(othersDivisionID: any) { //@todo make it dynamic
        console.log('get division', othersDivisionID.detail.value);
        // let params : any;
        // if (autoSearch){
        //     params = {divisionId: othersDivisionID};
        // } else{
        const params = {divisionId: othersDivisionID.detail.value};
        // }
        this.learnerService.getPDistrictList(params).subscribe(result => {
            if (result ['status'] == 200) {
                this.othersParDistrictList = result['data']['districtList'];
                console.log('district list', this.perdistrictId);
            }
            // if (autoSearch){
            //
            //     this.loadOthersPermanentThanaList(true,othersDivisionID );
            // } else {
            //     this.othersDistrictID = this.tempPerDisId;
            // }
            console.log('district list', this.perdistrictId);
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

        // this.loadExamVanue(this.pthanaId);
    }

    loadParThanaList(event) {
        // let selectedID = event.detail.value;
        // console.log('selectedID', selectedID);
        // if(this.commonService.inputFieldEmptyChecker(selectedID) == false && this.commonService.inputFieldEmptyChecker(this.parDistrictList) == false){
        //     let divisionData = this.parDistrictList.filter(division => division.id == selectedID);
        //     this.othersPerDistrict = divisionData[0].name;
        // }
        this.loadPermanentThanaList(event);

    }

    thanaChange(event) {
        let selectedID = event.detail.value;
        if (this.commonService.inputFieldEmptyChecker(selectedID) == false && this.commonService.inputFieldEmptyChecker(this.parPoliceStationList) == false) {
            let divisionData = this.parPoliceStationList.filter(division => division.id == selectedID);
            this.othersPerThana = divisionData[0].name;
        }


    }

    async loadPermanentThanaList(perDisId: any) {
        const params = {districtId: perDisId};
        this.learnerService.getPoliceStationList(params).subscribe(result => {
            if (result ['status'] == 200) {
                this.parPoliceStationList = result['data']['thanaList'];
            }
            this.perthanaId = this.tempPerThanaId;
        });
    }

    async loadPermanentThanaListEdit(perDisId: any) {
        const params = {districtId: this.perDisIdForThanaLoadEdit};
        this.learnerService.getPoliceStationList(params).subscribe(result => {
            if (result ['status'] == 200) {
                this.parPoliceStationList = result['data']['thanaList'];
                this.perthanaId = perDisId;
            }
            // this.perthanaId = this.tempPerThanaId;
        });
    }

    loadOthersPermanentThanaList(othersDistrictID: any) {
        const params = {districtId: othersDistrictID.detail.value};
        this.learnerService.getPoliceStationList(params).subscribe(result => {
            if (result ['status'] == 200) {
                this.othersParThanaList = result['data']['thanaList'];
            }
            // if (!autoSearch){
            //     this.othersThanaID = this.tempPerThanaId;
            // }
        });
    }

    loadExamVanueList() {
        console.log('come to load exam vanue list', this.presentThanaId);
        const myObj = {
            thanaId: this.presentThanaId
        };
        this.learnerService.getExamVenueList(myObj).subscribe(result => {
            if (result ['status'] == 200) {
                this.examVenueList = result['data']['examVenueList'];
                if (this.examVenueList.length == 1) {
                    this.isExamVenueSingle = true;
                    this.examVenue = this.examVenueList[0].name;
                }
            }
            console.log('loaded exam vanue list', this.examVenueList);

        });
    }

    /* loadExamVanue(thanaId) {
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
     }*/

    loadEducationalQualification() {
        this.learnerService.getEducationalQualificationList().subscribe(result => {

            if (result ['status'] == 200) {
                this.educationalQualificationList = result['data']['educationQualificationList'];
            }

        });
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

    async loadProfessionalVehicleClass(id, data) {
        console.log('calling loadProfessionalVehicleClass', data);
        const myObj = {
            learnerLicenseType: id
        };
        this.learnerService.getProfessionalVehicle(myObj).subscribe(async result => {

            if (result ['status'] == 200) {
                this.vehicleClassList = result['data']['vehicleClassList'];
                console.log('vehicleClassList', this.vehicleClassList);
                if (data != null) {

                    await this.reSetData(data);
                }
                // let obj = { id: -1, name: 'OTHERS' }
                // this.vehicleClassList.push(obj);
            } else {

            }

        });
    }


    async changeProfessionalVehicleClass() {
        const that = this;
        this.comeToEdit = false;
        // console.log('stored selected data length', this.learnerLicenseProfesionalTypeId.length);
        //
        // if (!this.isProffesionalActive) {
        //     console.log('learnerLicenseProfesionalTypeId', this.learnerLicenseProfesionalTypeId);
        // }

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
        } else if (this.learnerLicenseProfesionalTypeId.length == 1 && !this.learnerLicenseProfesionalTypeId.includes('-1')) {
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

    makeVehicleClassGroup(classId) {
        if (classId == '1') {
            this.classHeavy = true;
        } else if (classId == '2') {
            this.classMedium = true;
        } else if (classId == '3') {
            this.classLight = true;
        }
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
                console.log('others data list', this.othersVehicleDataList);
            }
        });

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
        } else {
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

    changeOthersProfessionalVehicleClass() {

        const that = this;
        if (this.othersVehicleTypeId.length > 0) {
            that.othersVehicleClassList = [];
            console.log('ohters selected data: ', this.othersVehicleTypeId.length);
            this.othersVehicleTypeId.forEach(function(arrayItem, arrayIndex, array) {
                // that.othersVehicleTypeId.push(array[arrayIndex]);

                console.log('come to change others list');
                console.log('clicked item id', array[arrayIndex]);
                if (!Object.values(that.othersLicenseClassList).includes(array[arrayIndex])) {
                    console.log('clicked item id exits ', array[arrayIndex]);
                } else {
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
        } else {
            this.angshikPassShow = false;
        }
    }

    async saveDrivingLicenseInfo() {
        const that = this;
        // if (!this.comeToEdit) {
        this.drivingLicenseDetails = [];
        let ageLimit = this.getAge(this.dob);
        if (this.isProffesionalActive) {
            this.learnerLicenseType = 2;
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
            if (ageLimit <= 18) {
                this.commonService.toastMsg('ন্যূনতম বয়স হতে হবে : ১৮ বছর', false);
                return;
            }
            that.learnerLicenseProfesionalTypeId.forEach(function(arrayItem, arrayIndex, array) {
                that.drivingLicenseDetails.push({allowYN: '', licenseClassId: array[arrayIndex]});

            });
            // if (this.learnerLicenseNonProfesionalMotorCycleID != -1) {
            //     this.drivingLicenseDetails.push({allowYN: '', licenseClassId: this.learnerLicenseNonProfesionalMotorCycleID});
            // }
            // if (this.learnerLicenseNonProfesionalLightID != -1) {
            //     this.drivingLicenseDetails.push({allowYN: '', licenseClassId: this.learnerLicenseNonProfesionalLightID});
            // }

        }

        const myObj = {
            applicantTypeId: this.applicantType,
            applicationTypeId: this.applicationType,
            dlIssuingAuthorityId: this.issueAuthorityId,
            dlReferenceNo: this.licenseRefNo,
            drivingLicenseLanguageName: this.languageLicenseSelected,
            encCitizenDLId: this.encCitizenDLID,
            licenseVehicleClassDetails: this.drivingLicenseDetails,
            othersLicenseVehicleClassDetails: this.othersVehicleClassList,
            previousLicenseClass: this.licenseClassId,
            previousLicenseIssueDate: this.dateOfLicenseIssue,
            previousLicenseNo: this.licenseNo,
            typeOfLicenseId: this.selectedLicenseType
        };

        const postData = JSON.stringify(myObj);
        console.log('post data: ', myObj);
        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
        await loading.present();
        this.learnerService.saveDrivingLicense(postData).subscribe(result => {

            loading.dismiss();
            if (result['status'] == 200) {
                this.encCitizenDLID = result['data']['encCitizenDLId'];
                // this.encCitizenDLID = "AYxzkOO0AM4/ftAk3V4QFA==";
                this.commonService.toastMsg(result['data']['message']);
                console.log('Shipping', this.currentSlide);
                this.completeWizardSteps.push(['Shipping',]);

                this.ionSlides.slideNext();
                this.ionContent.scrollToTop();
            } else {
                this.commonService.toastMsg(result['message'], false);
            }

        });


        // }
    }

    async saveApplicantPrimaryInfo() {

        console.log('spousePhoneNo', this.spousePhoneNo.length);
        if (this.spousePhoneNo != null && this.spousePhoneNo.toString().length > 10) {
            this.spousePhoneNo = this.spousePhoneNo.substr(1);
        }

        if (this.spousePhoneNo.toString().length == 10) {
            this.spousePhoneNo = '0' + this.spousePhoneNo;
        }

        console.log('spousePhoneNo 2', this.spousePhoneNo);
        const myObj = {
            bloodGroupId: this.bloodGroupId,
            dualCitizenCountryId: this.dualCitizenShipCountry,
            dualCitizenYn: this.dualCitizenYN,
            educationalQualificationId: this.eduQualificationId,
            encCitizenDLId: this.encCitizenDLID,
            fathersNameEnglish: this.fatherNameEn,
            genderId: this.gender,
            maritalStatusId: this.maritalId,
            mothersNameEnglish: this.motherNameEn,
            nationalityId: this.nationalityId,
            occupationId: this.singleOccupationID,
            spouseContactNo: this.spousePhoneNo,
            spouseNameEnglish: this.spouseNameEn
        };

        const postData = JSON.stringify(myObj);
        console.log('post data: ', myObj);
        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
        await loading.present();
        this.learnerService.saveApplicantInfo(postData).subscribe(result => {

            loading.dismiss();
            if (result['status'] == 200) {
                // this.encCitizenDLID = result['data']['encCitizenDLId'];
                this.commonService.toastMsg(result['data']['message']);
                this.ionSlides.slideNext();
                this.ionContent.scrollToTop();

                console.log('Summary', this.currentSlide);
                this.completeWizardSteps.push(['Summary']);
            } else {
                this.commonService.toastMsg(result['message'], false);
            }

        });
    }

    async saveApplicantAddressContact() {
        console.log('applicant emergency ');
        if (this.applicantEmergencyContactNo.toString().length == 10) {
            this.applicantEmergencyContactNo = '0' + this.applicantEmergencyContactNo;
        }

        if (this.applicantMobileNo.toString().length == 10) {
            this.applicantMobileNo = '0' + this.applicantMobileNo;
        }

        if (this.applicantMobileNoRasidence.toString().length == 10) {
            this.applicantMobileNoRasidence = '0' + this.applicantMobileNoRasidence;
        }

        if (this.applicantMobileNoOffice.toString().length == 10) {
            this.applicantMobileNoOffice = '0' + this.applicantMobileNoOffice;
        }

        const myObj = {
            email: this.applicantEmail,
            emergencyContactNo: this.applicantEmergencyContactNo,
            emergencyEmail: this.applicantEmargencyEmail,
            emergencyName: this.emergencyContactName,
            emergencyRelationship: this.applicantRelation,
            encCitizenDLId: this.encCitizenDLID,
            examVenue: this.examVenue,
            // examVenue: "JOYAR SAHARA", //@todo make it dynamic
            mobileNo: this.applicantMobileNo, //@todo get from nid data
            p_districtId: this.presentDistrictId,
            p_divisionId: this.presentVibagId,
            p_postCode: this.presentPostcode,
            p_road: this.presentBlock,
            p_thanaId: this.presentThanaId,
            p_village: this.presentHome,
            per_districtId: this.perdistrictId,
            per_divisionId: this.perdivisionId,
            per_postCode: this.permanentPostcode,
            per_road: this.permanentBlock,
            per_thanaId: this.perthanaId,
            per_village: this.permanentHome,
            phoneNoHome: this.applicantMobileNoRasidence,
            phoneNoOffice: this.applicantMobileNoOffice
        };

        const postData = JSON.stringify(myObj);
        console.log('post data: ', myObj);
        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
        await loading.present();
        this.learnerService.saveApplicantAddressContactInfo(postData).subscribe(result => {

            loading.dismiss();
            if (result['status'] == 200) {
                // this.encCitizenDLID = result['data']['encCitizenDLId'];
                this.commonService.toastMsg(result['data']['message']);
                this.ionSlides.slideNext();
                this.ionContent.scrollToTop();

                console.log('ContactInfo', this.currentSlide);
                this.completeWizardSteps.push(['ContactInfo']);
            } else {
                this.commonService.toastMsg(result['message'], false);
            }

        });
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

    getFormattedDate(date) {
        var getDate = date.split('-');
        var day = getDate[1];
        var month = getDate[2];
        var year = getDate[0];
        // var apiformatDate = day + '/' + month + '/' + year;
        return day + '/' + month + '/' + year;
    }


    buildSlides() {
        const slides = ['Billing', 'Shipping', 'Summary', 'Payment', 'LastPart'];
        this.currentSlide = slides[0];
        this.wizardSteps = slides;
    }

    async onSlidesChanged() {
        const index = await this.ionSlides.getActiveIndex();
        this.currentSlide = this.wizardSteps[index];
        this.isBeginning = await this.ionSlides.isBeginning();
        this.isEnd = await this.ionSlides.isEnd();
        //
        this.progressBar = ((100 / this.wizardSteps.length) * index) + '%';
    }

    onSlidesDidChange() {
        //this.ionContent.scrollToTop();
    }

    onBackButtonTouched() {
        this.ionSlides.slidePrev();
        this.ionContent.scrollToTop();

        if (this.completeWizardSteps.length == 4) {
            this.completeWizardSteps.pop();
        }
        this.completeWizardSteps.pop();

    }

    onNextButtonTouched() {


        if (this.currentSlide === 'Billing') {
            this.ionSlides.slideNext();
            this.ionContent.scrollToTop();
            console.log('Billing', this.currentSlide);
            this.completeWizardSteps.push(['Billing']);


        } else if (this.currentSlide === 'Shipping') {

            if (this.commonService.inputFieldEmptyChecker(this.languageLicenseSelected)) {
                this.commonService.toastMsg('লাইসেন্সের ভাষা নির্বাচন করুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.applicationType)) {
                this.commonService.toastMsg('আবেদনের ধরণ নির্বাচন করুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.applicantType)) {
                this.commonService.toastMsg('আবেদনকারীর ধরণ নির্বাচন করুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.selectedLicenseType)) {
                this.commonService.toastMsg('লাইসেন্সের ধরণ  নির্বাচন করুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.learnerLicenseProfesionalTypeId)) {
                this.commonService.toastMsg('মোটরযানের শ্রেণী নির্বাচন করুন', false);
            } else {
                this.saveDrivingLicenseInfo();
            }


        } else if (this.currentSlide === 'Summary') {

            if (this.commonService.inputFieldEmptyChecker(this.fatherNameEn)) {
                this.commonService.toastMsg('পিতার নাম (ইংরেজী) লিখুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.motherNameEn)) {
                this.commonService.toastMsg('মাতার নাম (ইংরেজী) লিখুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.applicantType)) {
                this.commonService.toastMsg('আবেদনকারীর ধরণ নির্বাচন করুন', false);
            } else if (!this.commonService.inputFieldEmptyChecker(this.spousePhoneNo) && this.spousePhoneNo.length > 11) {
                this.commonService.toastMsg('আবেদনকারীর ধরণ নির্বাচন করুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.gender)) {
                this.commonService.toastMsg('লিঙ্গ নির্বাচন করুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.bloodGroupId)) {
                this.commonService.toastMsg('রক্তের গ্রুপ নির্বাচন করুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.eduQualificationId)) {
                this.commonService.toastMsg('শিক্ষাগত যোগ্যতা নির্বাচন করুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.singleOccupationID)) {
                this.commonService.toastMsg('পেশা নির্বাচন করুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.maritalId)) {
                this.commonService.toastMsg('বৈবাহিক অবস্থা নির্বাচন করুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.nationalityId)) {
                this.commonService.toastMsg('বজাতীয়তা নির্বাচন করুন', false);
            } else {
                this.saveApplicantPrimaryInfo();
            }


        } else if (this.currentSlide === 'Payment') {

            if (this.commonService.inputFieldEmptyChecker(this.emergencyContactName)) {
                this.commonService.toastMsg('জরুরী যোগাযোগের নাম লিখুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.applicantEmergencyContactNo)) {
                this.commonService.toastMsg('জরুরী যোগাযোগের মোবাইল নাম্বার লিখুন', false);
            } else if (this.applicantEmergencyContactNo.toString().length < 10 || !this.commonService.mobileValidate(this.applicantEmergencyContactNo)) {
                this.commonService.toastMsg('সঠিক মোবাইল নম্বর লিখুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.presentHome)) {
                this.commonService.toastMsg('আপনার বর্তমান ঠিকানায় বাড়ীর নাম লিখুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.presentBlock)) {
                this.commonService.toastMsg('আপনার বর্তমান ঠিকানায় োড/ব্লক/সেক্টরের নাম লিখুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.presentVibag)) {
                this.commonService.toastMsg('আপনার বর্তমান ঠিকানায় বিভাগ  নির্বাচন করুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.presentDistrict)) {
                this.commonService.toastMsg('আপনার বর্তমান ঠিকানায় জেলা  নির্বাচন করুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.presentThana)) {
                this.commonService.toastMsg('আপনার বর্তমান ঠিকানায় থানা নির্বাচন করুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.presentPostcode)) {
                this.commonService.toastMsg('আপনার বর্তমান ঠিকানায় পোস্ট কোড(ইংরেজী) লিখুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.permanentHome)) {
                this.commonService.toastMsg('আপনার স্থায়ী ঠিকানায় বাড়ীর নাম লিখুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.permanentBlock)) {
                this.commonService.toastMsg('আপনার স্থায়ী ঠিকানায় োড/ব্লক/সেক্টরের নাম লিখুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.perdivisionId)) {
                this.commonService.toastMsg('আপনার স্থায়ী ঠিকানায় বিভাগ  নির্বাচন করুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.perdistrictId)) {
                this.commonService.toastMsg('আপনার স্থায়ী ঠিকানায় জেলা  নির্বাচন করুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.perthanaId)) {
                this.commonService.toastMsg('আপনার স্থায়ী ঠিকানায় থানা নির্বাচন করুন', false);
            } else if (this.commonService.inputFieldEmptyChecker(this.permanentPostcode)) {
                this.commonService.toastMsg('আপনার স্থায়ী ঠিকানায় পোস্ট কোড(ইংরেজী) লিখুন', false);
            } else {
                if (!this.commonService.inputFieldEmptyChecker(this.applicantEmail)) {
                    if (!this.commonService.emailValidate(this.applicantEmail)) {
                        this.commonService.toastMsg('সঠিক ইমেইল লিখুন', false);
                        return;
                    }
                }

                if (!this.commonService.inputFieldEmptyChecker(this.applicantEmargencyEmail)) {
                    if (!this.commonService.emailValidate(this.applicantEmargencyEmail)) {
                        this.commonService.toastMsg('সঠিক জরুরী ইমেইল লিখুন', false);
                        return;
                    }
                }
                this.saveApplicantAddressContact();
            }

        }


        /* this.paymentFormRef.onSubmit(undefined);
         if (this.paymentForm.valid) {


             console.log('Payment', this.currentSlide);
             this.completeWizardSteps.push(['Payment']);
         }*/

        // else {
        //
        //     console.log('else', this.currentSlide);
        //
        //     this.ionSlides.slideNext();
        //     this.ionContent.scrollToTop();
        // }

    }

    pickFile(val) {
        if (val === 'medical') {
            this.fileMedical = this.commonService.getItem('medical');
        } else if (val === 'education') {
            this.fileEducation = this.commonService.getItem('education');
        } else if (val === 'utility') {
            this.fileUtility = this.commonService.getItem('utility');
        } else if (val === 'nid') {
            this.fileNID = this.commonService.getItem('nid');
        }
    }

    isButtonDisabled(val) {
        if (val === 'medical') {
            if (this.fileMedical == null) {
                return true;
            } else {
                return false;
            }
        } else if (val === 'education') {
            if (this.fileEducation == null) {
                return true;
            } else {
                return false;
            }
        } else if (val === 'utility') {
            if (this.fileUtility == null) {
                return true;
            } else {
                return false;
            }
        } else if (val === 'nid') {
            if (this.fileNID == null) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
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
            // .then(
            //     (data) => {
            //         console.log('image data: ', data);
            //     }
            // );
        // console.log('taken image info1', imageData);
        this.base64Image = `${imageData}`;
        console.log('taken image info2', this.base64Image);
        // this.base64Image = `data:image/jpeg;base64,${imageData}`;
        console.log('taken image info3', `data:image/jpeg;base64,${imageData}`);
        if (documentType == 'EDU') {
            this.educationalCertificateFileSize = 1;
            this.educationalCertificateFileType = 'data:image/jpeg';
            this.educationalCertificateAttachment = this.base64Image;
            this.isEducationCirtificateUpload = true;
        } else if (documentType == 'MC') {
            this.medicalCertificateFileSize = 1;
            this.medicalCertificateFileType = 'data:image/jpeg';
            this.medicalCertificateAttachment = this.base64Image;
            this.isMedicalCertificateUpload = true;
        } else if (documentType == 'NID') {
            this.nationalIdFileSize = 1;
            this.nationalIdFileType = 'data:image/jpeg';
            this.nationalIdAttachment = this.base64Image;
            this.isNationalCertificateUpload = true;
        } else if (documentType == 'UB') {
            this.electricityBillFileSize = 1;
            this.electricityBillFileType = 'data:image/jpeg';
            this.electricityBillFileAttachment = this.base64Image;
            this.isUtilityUpload = true;
        }
        // else if (documentType == 'DL') {
        //     this.drivingLicenseFileSize = 1;
        //     this.drivingLicenseFileType = 'data:image/jpeg';
        //     this.drivingLicenseFileAttachment = this.base64Image;
        //     this.isDrivingLicenseUpload = true;
        // } else if (documentType == 'user') {
        //     this.photoSize = 1;
        //     this.photoType = 'data:image/jpeg';
        //     this.photo = this.base64Image;
        //     this.uploadPhoto = `data:image/jpeg;base64,${imageData}`;
        //     // this.uploadPhoto = this.base64Image;
        // }

        // this.photos.unshift(this.base64Image);

    }

    async uploadImage(imageType) {

        let tempFileBase64 = '';
        let tempFileID = -1;

        switch (imageType) {
            case 'MC':
                if (this.medicalCertificateAttachment == null) {
                    this.commonService.toastMsg('Please attach your medical certificate!', false);
                    return;
                }
                tempFileBase64 = this.medicalCertificateAttachment;
                tempFileID = 1;
                break;
            case 'EDU':
                if (this.educationalCertificateAttachment == null) {
                    this.commonService.toastMsg('Please attach your Educational Certificate!', false);
                    return;
                }
                tempFileBase64 = this.educationalCertificateAttachment;
                tempFileID = 3;
                break;
            case 'UB':
                if (this.electricityBillFileAttachment == null) {
                    this.commonService.toastMsg('Please attach your Utility Bill!', false);
                    return;
                }
                tempFileBase64 = this.electricityBillFileAttachment;
                tempFileID = 2;
                break;
            case 'NID':
                if (this.nationalIdAttachment == null) {
                    this.commonService.toastMsg('Please attach your NID!', false);
                    return;
                }
                tempFileBase64 = this.nationalIdAttachment;
                tempFileID = 17;
                break;

        }

        const myObj = {
            encCitizenDLId: this.encCitizenDLID,
            fileBase64: tempFileBase64,
            fileId: tempFileID,
            fileSize: 1,
            fileType: 'image/jpeg'
        };

        const postData = JSON.stringify(myObj);
        console.log('post data: ', myObj);
        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
        await loading.present();
        this.learnerService.imageUploaderUrl(postData).subscribe(result => {

            loading.dismiss();
            if (result['status'] == 200) {
                // this.encCitizenDLID = result['data']['encCitizenDLId'];
                this.commonService.toastMsg(result['data']['message']);
                switch (imageType) {
                    case 'MC':
                        this.mcUploadComplete = true;
                        this.mcUploadButtonActive = false;
                        break;
                    case 'EDU':
                        this.eduUploadComplete = true;
                        this.eduUploadButtonActive = false;
                        break;
                    case 'UB':
                        this.ubUploadComplete = true;
                        this.ubUploadButtonActive = false;
                        break;
                    case 'NID':
                        this.nidUploadComplete = true;
                        this.nidUploadButtonActive = false;
                        break;
                }
                // this.ionSlides.slideNext();
                // this.ionContent.scrollToTop();
                //
                // console.log('ContactInfo', this.currentSlide);
                // this.completeWizardSteps.push(['ContactInfo']);
            } else {

                this.commonService.toastMsg(result['message'], false);
            }

        });

    }

    changeDeliveryAddress() {
        this.loadOthersParDivisionList(this.presentVibagId);
        console.log('you select ', this.cardDeliveryAddressType);
        console.log('is active ', this.othersCardDeliveryActive);
        switch (this.cardDeliveryAddressType) {
            case '1':


                this.othersHome = this.presentHome;
                this.othersBlock = this.presentBlock;
                this.othersDivision = this.presentVibag;
                this.othersDivisionID = this.presentVibagId;
                this.othersDistrict = this.presentDistrict;
                this.othersDistrictID = this.presentDistrictId;
                this.othersThana = this.presentThana;
                this.othersThanaID = this.presentThanaId;
                this.othersPostCode = this.presentPostcode;
                this.othersMobileNo = this.applicantMobileNo;
                this.othersCardDeliveryActive = false;
                this.isPermanet = false;
                break;
            case '2':
                this.isPermanet = true;
                this.othersHome = this.permanentHome;
                this.othersBlock = this.permanentBlock;
                // this.othersDivision = this.perdivisionId;
                // .filter(division => division.id == selectedID
                let devi = this.parDivisionList.filter(x => {
                    return x.id == this.perdivisionId;
                });
                this.othersPerDivision = devi[0].name;
                // this.othersDistrict = this.nidPermanentDistrict;
                let dis = this.parDistrictList.filter(x => {
                    return x.id == this.perdistrictId;
                });
                this.othersPerDistrict = dis[0].name;
                // this.othersThana = this.nidPermanentThana;
                this.othersThanaID = this.perthanaId;
                this.othersPostCode = this.permanentPostcode;
                this.othersMobileNo = this.applicantMobileNo;
                this.othersCardDeliveryActive = false;
                break;

            case '3':
                this.othersHome = '';
                this.othersBlock = '';
                // this.othersDivision = this.perdivisionId;
                this.othersDivisionID = '';
                // this.othersDistrict = this.nidPermanentDistrict;
                this.othersDistrictID = '';
                // this.othersThana = this.nidPermanentThana;
                this.othersThanaID = '';
                this.othersPostCode = '';
                this.othersMobileNo = '';
                this.othersCardDeliveryActive = true;
                this.isPermanet = false;
                break;
        }
    }

    async finalSubmission() {
        console.log('cardDeliveryAddressType', this.nationalIdAttachment);
        if (this.commonService.inputFieldEmptyChecker(this.nationalIdAttachment)) {
            this.commonService.toastMsg('জাতীয় পরিচয়পত্র সংযুক্ত করুন.', false);

        } else if (this.commonService.inputFieldEmptyChecker(this.electricityBillFileAttachment)) {
            this.commonService.toastMsg('ইউটিলিটি বিল সংযুক্ত করুন.', false);

        } else if (this.commonService.inputFieldEmptyChecker(this.educationalCertificateAttachment)) {
            this.commonService.toastMsg('শিক্ষাগত যোগ্যতার সনদ সংযুক্ত করুন.', false);

        } else if (this.commonService.inputFieldEmptyChecker(this.medicalCertificateAttachment)) {
            this.commonService.toastMsg('মেডিক্যাল সার্টিফিকেট সংযুক্ত করুন.', false);

        } else if (this.typeOfCardDelivery == 'Y' && this.commonService.inputFieldEmptyChecker(this.cardDeliveryAddressType)) {
            this.commonService.toastMsg('ঠিকানার ধরণ নির্বাচন করুন', false);
        } else if (this.commonService.inputFieldEmptyChecker(this.typeOfCardDelivery)) {
            this.commonService.toastMsg('কার্ড বিতরনের ধরন  নির্বাচন করুন', false);
        } else if (this.typeOfCardDelivery == 'Y' && this.commonService.inputFieldEmptyChecker(this.othersMobileNo)) {
            this.commonService.toastMsg('মোবাইল নম্বর লিখুন', false);
        } else {
            let myObj: any;
            if (this.cardDeliveryAddressType == '3') {
                myObj = {
                    encCitizenDLId: this.encCitizenDLID,
                    getAddressTypeId: this.cardDeliveryAddressType,
                    getCardDeliveryOptionId: this.typeOfCardDelivery,
                    getDeliveryMobileNo: this.comeToEdit ? this.othersMobileNo : '0' + this.othersMobileNo,
                    getPostal_Road_Block: this.othersBlock,
                    getPostal_Village: this.othersHome,
                    postal_Code: this.presentBlock,
                    postal_DistrictId: this.othersDistrictID,
                    postal_DivisionId: this.othersDivisionID,
                    postal_ThanaId: this.othersThanaID
                };
            } else {
                myObj = {
                    encCitizenDLId: this.encCitizenDLID,
                    getAddressTypeId: this.cardDeliveryAddressType,
                    getCardDeliveryOptionId: this.typeOfCardDelivery,
                    getDeliveryMobileNo: this.othersMobileNo,
                    getPostal_Road_Block: '',
                    getPostal_Village: '',
                    postal_Code: '',
                    postal_DistrictId: '',
                    postal_DivisionId: '',
                    postal_ThanaId: ''
                };
            }

            const postData = JSON.stringify(myObj);
            console.log('post data: ', myObj);
            const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
            await loading.present();
            this.learnerService.finalSubmit(postData).subscribe(result => {

                loading.dismiss();
                if (result['status'] == 200) {
                    // this.encCitizenDLID = result['data']['encCitizenDLId'];
                    this.commonService.toastMsg(result['data']['message']);
                    // this.ionSlides.slideNext();
                    // this.ionContent.scrollToTop();
                    //
                    // console.log('ContactInfo', this.currentSlide);
                    // this.completeWizardSteps.push(['ContactInfo']);


                    let serviceRequestNo = result['data']['serviceRequestNo'];
                    let mobileVerify = result['data']['mobileValidateYn'];
                    console.log('mobile verify ', mobileVerify);
                    console.log('serviceRequestNo ', serviceRequestNo);
                    console.log('applicantMobileNo ', this.applicantMobileNo);
                    if (mobileVerify == 'Y') {
                        this.router.navigate(['learner-application-success'], {
                            state: {
                                serviceRequestId: serviceRequestNo,
                                phoneNo: this.applicantMobileNo
                            }
                        });
                    } else {
                        this.router.navigate(['otp'], {state: {serviceRequestId: serviceRequestNo, phoneNo: this.applicantMobileNo}});
                        // this.router.navigate(['otp']);
                    }

                    this.commonService.setItem('service_request_no', serviceRequestNo);
                } else {
                    this.commonService.toastMsg(result['message'], false);
                }

            });
        }


    }

    async downloadImageAttachment(imageType) {

        let tempFileBase64 = '';
        let tempFileID = -1;

        switch (imageType) {
            case 'MC':
                tempFileID = 1;
                break;
            case 'EDU':
                tempFileID = 3;
                break;
            case 'UB':
                tempFileID = 2;
                break;
            case 'NID':
                tempFileID = 17;
                break;
        }


        // const myObj = {
        //     encCitizenDLId: this.encCitizenDLID,
        //     fileBase64: "",
        //     fileId: tempFileID,
        //     fileSize: "",
        //     fileType: ""
        // };

        // const postData = JSON.stringify(myObj);
        // console.log('post data: ', myObj);
        let encEncodedID = encodeURIComponent(this.encCitizenDLID);
        // const loading = await this.loadingController.create({message: 'অপেক্ষা করুন'});
        // await loading.present();
        // this.notificationService.getLearnerLicensePrint(myObj);
        // this.notificationService.downloadDrivingLicenseAttachment(myObj);
        // this.learnerService.downloadImage(myObj).subscribe(result => {
        //
        //     loading.dismiss();
        //     if (result['status'] == 200) {
        //         loading.dismiss();
        //         // this.encCitizenDLID = result['data']['encCitizenDLId'];
        //         this.commonService.toastMsg(result['data']['message']);
        //     } else {
        //         loading.dismiss();
        //         this.commonService.toastMsg(result['message'], false);
        //     }
        //
        // });

        // if (tempFileID != -1){
        window.open(this.notificationService.getDrivingLicensePrint(encEncodedID, tempFileID), '_system', 'location=yes');
        // }


    }
}
