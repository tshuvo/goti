import {Injectable} from '@angular/core';
import {CommonService} from '../common/common.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    serverURL: string;
    constructor(
        public http: HttpClient,
        private common: CommonService
    ) {
        this.serverURL = this.common.apiBaseUrl;
    }

    userLogin(post_Data) {
        const url = this.serverURL + 'login/getLogin';
        return this.common.setReq('POST', url, post_Data);
    }

    userSignUp(post_Data) {
        const url = this.serverURL + 'login/registerUser';
        return this.common.setReq('POST', url, post_Data);
    }

    getAllNotification() {
        const url = this.serverURL + 'v1/dashboard/notification';
        return this.common.setReq('GET', url);
    }

    checkNid(post_data){
        const url = this.serverURL + "login/nid-for-registration";
        return this.common.setReq('POST', url, post_data);
    }

    validateNid(post_data){
        const url = this.serverURL + "v1/user/user-nid-validate";
        return this.common.setReq('POST', url, post_data);
    }
    /*constructor(public http: HttpClient, private common: CommonService) {
        this.serverURL = this.common.paiBaseURL();
    }

    userSignUp(post_Data) {
        const url = this.serverURL + 'login/registerUser';
        return this.common.allPostData(url, post_Data);
    }

    userLogin(post_Data) {
        const url = this.serverURL + 'login/getLogin';
        return this.common.allPostData(url, post_Data);
    }

   

    verifiMobileNo(post_data) {
        const url = this.serverURL + '/v1/drivingLicense/validate-otp';
        return this.common.allPostData(url, post_data);
    }

    getVerificationCode(post_data) {
        const url = this.serverURL + 'v1/drivingLicense/resend-otp';
        return this.common.allPostData(url, post_data);
    }*/

}
