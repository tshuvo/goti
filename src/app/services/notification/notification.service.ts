import {Injectable} from '@angular/core';
import {CommonService} from '../common/common.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
//import {StorageService} from "../../storage/storage.service";
import {BrowsemeService} from "../browseme/browseme.service";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    public loginState: boolean;
    serverURL: string;
    serverFileDownloadUrl: string;
    data: Observable<Object>;

    constructor(
        public http: HttpClient,
        private common: CommonService,
       // private storageService: StorageService,
        private browsemeService: BrowsemeService,
    ) {
        this.serverURL = this.common.apiBaseUrl;
        this.serverFileDownloadUrl = this.common.apiBaseUrlForFile;
    }


    getLearnerLicenseList()
    {
        const url = this.serverURL + "v1/drivingLicense/learner-license-list";
        return this.common.setReq('GET', url);
    }

    getLearnerLicensePrint(encServiceRequestNo)
    {
        //http://192.168.78.158:8080/api/file/learner-driving-license-print-url?encServiceRequestNo=AgmLjl%2FwHatEvZk6j5CUfg%3D%3D
        let temp = this.serverURL +'file/learner-driving-license-print-url?encServiceRequestNo='+encServiceRequestNo;
        console.log("download url: ", temp);
        return temp;
    }

    getDrivingLicensePrint(encServiceRequestNo, fileId){
        return  this.serverFileDownloadUrl + "file/dl-attachment-download-url?encCitizenDLId="+ encServiceRequestNo +"&fileId="+ fileId;
    }

    getAppointmentPrint(encServiceRequestNo)
    {
        //http://192.168.78.158:8080/api/file/learner-driving-license-print-url?encServiceRequestNo=AgmLjl%2FwHatEvZk6j5CUfg%3D%3D
        let temp = this.serverURL +'file/printAppointmentReceipt?encAppointmentId='+encServiceRequestNo;
        console.log("download url: ", temp);
        return temp;
    }


    getVehicleInformation()
    {
        const url = this.serverURL + "v1/dashboard/vehicle-information";
        return this.common.setReq('GET',url);
    }

    getFitnessTinInfo(encModelYear, encRegistrationNo,encRuleId,encTagId, encVehicleClassId, encVehicleTypeId,encOwnershipTypeId, billFor)
    {
        console.log("billFor : ", billFor);
        let url ;
        if(billFor == 'TAX'){
            url = this.serverURL + "v1/dashboard/get-tax-bill-info-detail";
        }else {
            url = this.serverURL + "v1/dashboard/fitness-update-tin-info";
        }

        const params = {
            "encModelYear": encModelYear,
            "encOwnershipTypeId" : encOwnershipTypeId,
            "encRegistrationNo": encRegistrationNo,
            "encRuleId": encRuleId,
            "encTagId": encTagId,
            "encVehicleClassId": encVehicleClassId,
            "encVehicleTypeId" : encVehicleTypeId
        };
        console.log("params ", params);
        return this.common.setReq('POST',url, params);
    }

    processFitnessTinInfo(tinAddress, tinCircle, tinDistrict, tinName, tinNo, tinTelephoneNo, tinType, tinZone, nbrSubTinTypeName, billFor)
    {
        let url;
        if(billFor == 'TAX'){
            url = this.serverURL + 'v1/dashboard/taxtoken-proceed-tin-nfo';
        }else{
            url = this.serverURL + 'v1/dashboard/fitness-proceed-tin-nfo';
        }

        const params = {
            'tinAddress': tinAddress,
            'tinCircle': tinCircle,
            'tinDistrict': tinDistrict,
            'tinName': tinName,
            'tinNo': tinNo,
            'tinTelephoneNo': tinTelephoneNo,
            'tinType': tinType,
            'tinZone': tinZone,
            'nbrSubTinTypeName': nbrSubTinTypeName
        };
        return this.common.setReq('POST', url, params);
    }

    tinDistrictList()
    {
        const url = this.serverURL + "v1/dashboard/tin-district-list";
        const params = {};
        return this.common.setReq('GET', url, params);
    }

    tinTypeList()
    {
        const url = this.serverURL + "v1/dashboard/tin-type-list";
        const params = {};
        return this.common.setReq('GET',url, params);
    }


    getBillInfo(billFor, encModelYear, encRegistrationNo,encRuleId,encTagId,encVehicleClassId )
    {
        let url='';
        if(billFor == 'TAX'){
            url = this.serverURL + "v1/dashboard/get-tax-bill-info-detail";

        }else if (billFor == 'ROUTE_PERMIT') {
            url = this.serverURL + "v1/dashboard/get-routepermit-bill-info-detail";
        }else{

        }

        const params = {
            "encModelYear": encModelYear,
            "encRegistrationNo": encRegistrationNo,
            "encRuleId": encRuleId,
            "encTagId": encTagId,
            "encVehicleClassId": encVehicleClassId
        };
        return this.common.setReq('POST',url, params);
    }

    payNow(payFor)
    {
        let url='';
        if(payFor == 'FITNESS'){
            url = this.serverURL + "v1/dashboard/fitness/payNow";
        }else if(payFor == 'TAX'){
            url = this.serverURL + "v1/dashboard/taxtoken/payNow";
        }else if (payFor == 'ROUTE_PERMIT') {
            url = this.serverURL + "v1/dashboard/routepermit/payNow";
        }else {
        }
        return this.common.setReq('POST',url, {});
    }

    descardTransaction()
    {
        let url = this.serverURL + "v1/dashboard/discard-all-temporary-transaction";
        return this.common.setReq('GET',url, {});
    }

    getDriverInformation()
    {
        // let url = this.serverURL + "v1/vehicleRegistration/driver-information";
        let url = this.serverURL + "v1/dashboard/driving-license";
        return this.common.setReq('GET',url, {});
    }

    getDrivingDataList()
    {
        const url = this.serverURL +"v1/dashboard/dl-application-list";
        return this.common.setReq('GET', url);
    }

    getAppointmentInformation()
    {
        let url = this.serverURL + "v1/dashboard/appointment-time";
        return this.common.setReq('GET',url, {});
    }

    searchTinInformation(tinNumber) {
        const params = {
            'tinNo': tinNumber
        };
        let url = this.serverURL + 'v1/dashboard/tin-search';
        return this.common.setReq('POST', url, params);
    }
}
