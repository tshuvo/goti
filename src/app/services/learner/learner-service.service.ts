import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CommonService} from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class LearnerServiceService {

  public loginState: boolean;
  serverURL: string;
  data: Observable<Object>;

  constructor(public http: HttpClient,
              private common: CommonService, ) {
    this.serverURL = this.common.apiBaseUrl;
  }

  getLearnerData(  ){
    const url = this.serverURL + 'v1/drivingLicense/learner-license-list';
    return this.common.setReq('GET',url);
  }

  saveLearnerLicense(post_data){
    const url = this.serverURL +'v1/drivingLicense/learnerLicenseSave';
    return this.common.setReq('POST', url , post_data);
  }

  saveDrivingLicense(post_data){
    const url = this.serverURL +'v1/DL/dl-basic-info-save';
    return this.common.setReq('POST', url , post_data);
  }
  saveApplicantInfo(post_data){
    const url = this.serverURL +'v1/DL/dl-applicant-info-save';
    return this.common.setReq('POST', url , post_data);
  }

  saveApplicantAddressContactInfo(post_data) {
    const url = this.serverURL + 'v1/DL/dl-applicant-address-contact-info-save';
    return this.common.setReq('POST', url, post_data);
  }

  finalSubmit(post_data) {
    const url = this.serverURL + 'v1/DL/dl-final-submit';
    return this.common.setReq('POST', url, post_data);
  }

  imageUploaderUrl(data){
    const url = this.serverURL +'v1/DL/dl-attachment-save';
    return this.common.setReq('POST', url , data);
  }

  downloadImage(data){
    const url = this.serverURL +'v1/DL/dl-attachment-download-url';
    return this.common.setReq('POST', url , data);
  }

  getNidDataForDrivingLicense(){
    const url = this.serverURL +'v1/DL/user-nid-for-dl';
    return this.common.setReq('POST', url );
  }

  getBloodGroup(){
    const url = this.serverURL + "v1/drivingLicense/blood-group-list";
    return this.common.setReq('GET', url);
  }

  getOccupationList(){
    const url = this.serverURL + "v1/drivingLicense/occupation-list";
    return this.common.setReq('GET', url);
  }

  checkNid(post_data){
    const url = this.serverURL + "v1/drivingLicense/nid-for-dl";
    return this.common.setReq('POST', url, post_data);
  }

  getOthersVehicleClassData(post_data){
    const url = this.serverURL + "v1/drivingLicense/vehicle-other-class-list";
    return this.common.setReq('GET', url, post_data);
  }

  getProfessionalVehicle(post_data){
    const url = this.serverURL + "v1/drivingLicense/vehicle-class-list";
    return this.common.setReq('GET', url, post_data);
  }

  getNationalityList(){
    const url = this.serverURL + "v1/drivingLicense/country-list";
    return this.common.setReq('GET', url);
  }

   getIssueAuthorityList(){
    const url = this.serverURL + "v1/drivingLicense/dl-issuing-authority-list";
    return this.common.setReq('GET', url);
  }
  getDrivingLicenseData(){
    const url = this.serverURL + "v1/DL/dl-basic-info";
    return this.common.setReq('POST', url);
  }

  getMaritualStatusList(){
    const url = this.serverURL + "v1/drivingLicense/marital-status-list";
    return this.common.setReq('GET', url);
  }
  getPDivisionList(){
    const url = this.serverURL + "v1/drivingLicense/division-list";
    return this.common.setReq('GET', url);
  }

  getPDistrictList(post_data){
    const url = this.serverURL + "v1/drivingLicense/district-list";
    return this.common.setReq('GET', url, post_data);
  }

  getPoliceStationList(post_data){
    const url = this.serverURL + "v1/drivingLicense/thana-list";
    return this.common.setReq('GET', url, post_data);
  }


  getEducationalQualificationList(){
    const url = this.serverURL + "v1/drivingLicense/education-qualification-list";
    return this.common.setReq('GET', url);
  }

  getExamVenueList(post_data){
    console.log('calling exam vanue api');
    const url = this.serverURL + "v1/drivingLicense/exam-venue-list";
    return this.common.setReq('GET', url, post_data);
  }

  downloadLearnerMedicalForm(){
    const url = this.serverURL +"file/learner-medical-form";
    return this.common.setReq('GET', url);
  }

  validateOtp(post_data){
    const  url = this.serverURL +"v1/drivingLicense/validate-otp";
    return this.common.setReq('POST', url, post_data);
  }

  validateLoginOtp(post_data){
    const  url = this.serverURL +"login/varifyloginotp";
    return this.common.setReq('POST', url, post_data);
  }

  resendOtp(post_data){
    const  url = this.serverURL +"v1/drivingLicense/resend-otp";
    return this.common.setReq( 'POST', url, post_data);
  }

  resendLoginOtp(post_data){
    const  url = this.serverURL +"login/resendloginotp";
    return this.common.setReq( 'POST', url, post_data);
  }

  getEditData(post_data){
    console.log("edit comming to the service");
    const  url = this.serverURL +"v1/drivingLicense/learnerLicense";
    // return this.common.setReq( 'POST', url, post_data);
    let test = this.common.setReq( 'GET', url, post_data);

    test.subscribe(result => {

      console.log('test', result);
    });
    return test;
  }

  showMedicalForm()
  {
    // return this.common.baseUrl +'resources/pdf/Editable_BRTA%20Application%20Form-Medical%20Report.(English)_converted.pdf';
    // return this.common.baseUrl +'resources/pdf/Editable_BRTA%20Application%20Form-Medical%20Report.(English)_converted.pdf';

    const url = this.common.baseUrl + 'resources/pdf/Editable_BRTA%20Application%20Form-Medical%20Report.(English)_converted.pdf';
    window.open(url, '_system', 'location=yes');
  }

  goForPayment(post_data){
    // const  url = this.serverURL +"v1/drivingLicense/learner-payment-details";
    const  url = this.serverURL +"v1/DL/dl-learner-payment-details";
    return this.common.setReq( 'POST', url, post_data);
  }

  getDrivingLicenseEditData(post_data){
    let urlCode = encodeURIComponent(post_data);
    const  url = this.serverURL +"v1/DL/get-dl-details?encCitizenDLId="+ urlCode;
    console.log("edit comming to the service",url);
    // return this.common.setReq( 'POST', url, post_data);
    let test = this.common.setReq( 'GET', url, post_data);

    test.subscribe(result => {
      // console.log('getDrivingLicenseEditData', result);
    });
    return test;
  }
}
