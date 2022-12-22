import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Storage } from '@ionic/storage';
import { AlertController, ToastController, LoadingController, } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})

export class CommonService {

    public baseUrl;
    public apiBaseUrl;
    public apiBaseUrlForFile;
    public downloadUrl;
    public isEnc: boolean;
    private userPhotoBase64: any;
    private tempResult: any;

    constructor(
        public http: HttpClient,
        private storage: Storage,
        private alertCtrl: AlertController,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
    ) {
        // this.baseUrl = 'http://192.168.78.189:8080/bsp/';
        // this.baseUrl = 'http://210.4.76.133:9999/bsp/';
        // this.baseUrl = 'http://192.168.78.10:9999/bsp/';
        // this.baseUrl = 'http://192.168.78.189:9999/bsp';
        // this.baseUrl = 'http://123.200.20.21:8080/bsp/';
        this.baseUrl = 'https://bsp.brta.gov.bd/';
        this.apiBaseUrl = this.baseUrl + 'api/';
        // this.apiBaseUrlForFile = "http://123.200.20.21:8080/bsp/api/"; // it's fixed (faisal vai)
        this.apiBaseUrlForFile = "https://www.bsp.brta.gov.bd/api/"; // for production file download
        // @todo need to change for production with production url
        this.downloadUrl = 'https://www.bsp.brta.gov.bd/api/';
        this.isEnc = false;
    }

    async toastMsg(msg, isSuccess = true) {
        const toast = await this.toastCtrl.create({
            message: msg,
            showCloseButton: true,
            position: 'top',
            closeButtonText: 'X',
            animated: true,
            color: (isSuccess)?'success':'danger',
            duration: 3000
        });
        toast.present();
        return toast;
    }

    async alertMsg(msgHeader='Error !', msgBody='', buttoText='OK') {
        const alert = await this.alertCtrl.create({
            cssClass: 'errAlert',
            header: msgHeader,
            message: msgBody,
            buttons: [buttoText],
            backdropDismiss: false
        });
        alert.present();
        return alert;
    }

    async alertMsgNoNet(msgHeader='Error !', msgBody='', buttoText='OK') {
        const alert = await this.alertCtrl.create({
            cssClass: 'errAlert',
            header: msgHeader,
            message: msgBody,
            backdropDismiss: false,
            buttons: [
                {
                    text: buttoText,
                    handler: (yes) => {
                        navigator['app'].exitApp();
                    }
                }
            ]
        });
        alert.present();
        return alert;
    }

    public setReq(method = 'GET', url = '', params = {}, headers = {}) {
        const options = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.getItem('token'),
                'Content-Type': 'application/json'
            })
        };

        if (method == 'POST') {
            // this.tempResult = this.http.post(url,params, options);
            // this.tempResult.subscribe(result => {
            //     if (result['status'] === 417){
            //
            //     }else{
            //         return this.http.post(url, params, options);
            //     }
            // });
            return this.http.post(url, params, options);

        } else {
            if (params) {
                params = Object.entries(params).map(e => e.join('=')).join('&');
            } else {
                params = '';
            }
            url = url + '?' + params;
            return this.http.get(url, options);
        }
    }

    public setStorage(name='', data={}) {
        return this.storage.set('@'+name, data);
    }

    public getStorage(name='') {
        return this.storage.get('@'+name);
    }

    public removeStorage(name='') {
        this.storage.remove('@'+name);
    }

    public setItem(key, data) {
        this.removeItem(key);
        data = JSON.stringify(data);
        data = (this.isEnc)?encodeURIComponent(btoa(data)):data;
        return localStorage.setItem('@' + key, data);
    }

    public getItem(key) {
        let jsonData = localStorage.getItem('@' + key);
        if (jsonData != null) {
            jsonData = (this.isEnc)?atob(decodeURIComponent(jsonData)):jsonData;
            jsonData = JSON.parse(jsonData);
            return jsonData;
        } else {
            return jsonData;
        }
    }

    public removeItem(key, isAll=false) {
        if(isAll){
            for (let key in localStorage) {
                if (key.indexOf("@") == 0) {
                    localStorage.removeItem(key);
                }
            }
        }else{
            return localStorage.removeItem('@'+key);
        }

    }

    emailValidate(mail) {
        let status = (false);
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(mail.match(re)){
            status = true;
        }

        // if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        //     status = (true);
        // }
        return status;
    }

    mobileValidate(mobile) {
        let status = (false);
        let numberTemp;

        if (mobile.toString().length === 10){
            numberTemp = '0'+ mobile;
        } else{
            numberTemp = mobile;
        }

        let reg =  /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/;
        if (numberTemp.toString().match(reg)){
            status = true;
        }

        // if (/^\d{10}$/.test(mobile)) {
        //     status = (true);
        // }
        return status;
    }


    // ----------------------------------------------------------------------------------------
    // ------------------------- EMPTY CHECKER
    public inputFieldEmptyChecker(fieldName: any): boolean {
        return (fieldName === undefined || fieldName == null || fieldName === '');
    }

    // ------------------------- LENGTH CHECKER
    public inputFieldLengthChecker(fieldName: any, min: any, max: any): boolean {
        // this.toastMsg('New Password should be in ' + min + ' to ' + max + ' characters', false);
        // this.toastMsg('আপনার পাসওয়ার্ড ছয় থেকে পনেরো ডিজিটের মধ্যে লিখুন', false);
        return fieldName.toString().length < min || fieldName.toString().length > max;
    }

    // ------------------------- PASSWORD MATCHER
    public newPassConfPassMatcher(newPass: any, confPass: any): boolean {
        return !(newPass === confPass);
    }

    public loadVehicleRegNumFirstPartList() {
            const url = this.apiBaseUrl + "v1/vehicleRegistration/vehicle-reg-map-for-api";
            return this.setReq('GET', url);

    }

    public loadVehicleRegNumSecondPartList(){
        const url = this.apiBaseUrl + "v1/vehicleRegistration/vehicle-series-for-api";
        return this.setReq('GET', url);
    }

    public setUserPhotoForMenu(base64: any) {
        if (this.inputFieldEmptyChecker(base64)) {
            this.setItem('userPhoto', '');
            // return this.userPhotoBase64 = 'data:image/jpeg;base64,';
        } else {
            this.setItem('userPhoto', `data:image/jpeg;base64,${base64}`);
            // return this.userPhotoBase64 = `data:image/jpeg;base64,${base64}`;
        }
    }

    public getUserPhotoForMenu() {
        return this.getItem('userPhoto');
       /* if (this.inputFieldEmptyChecker(this.userPhotoBase64)) {
            return this.userPhotoBase64 = 'data:image/jpeg;base64,';
        } else {
            return this.userPhotoBase64;
        }*/
    }

}
