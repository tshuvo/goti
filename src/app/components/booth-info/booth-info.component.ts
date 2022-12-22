import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LoadingController, Platform} from '@ionic/angular';
import {CommonService} from '../../services/common/common.service';

@Component({
    selector: 'app-booth-info',
    templateUrl: './booth-info.component.html',
    styleUrls: ['./booth-info.component.scss'],
})

export class BoothInfoComponent implements OnInit, AfterViewInit {

    districtBankUrl: any;
    districtBankId: any;
    districtBankList: any;
    districtBackNameUrl: any;
    districtBackNameId: any;
    districtBackNameList: any;
    bankBoothNameUrl: any;
    bankBoothNameList: any;
    ionSelectStatus: any = 0;
    areaPart: any = 'ion-hide';

    constructor(public platform: Platform, private commonService: CommonService, private loadingController: LoadingController) {
        const urlBase = this.commonService.apiBaseUrl + 'file/';
        this.districtBankUrl = urlBase + 'booth-list-district';
        this.districtBackNameUrl = urlBase + 'booth-bank-name-list-by-district-name';
        this.bankBoothNameUrl = urlBase + 'booth-name-list-by-bank-name-district-name';
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.platform.ready().then(() => {
            this.loadDistrictBackData();
        });
    }

    async loadDistrictBackData() {
        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
        await loading.present();
        this.commonService.setReq('GET', this.districtBankUrl).subscribe(
            response => {
                if (response['status'] === 200) {
                    this.districtBankList = response['data'].districtNameList;
                } else {
                    this.commonService.toastMsg(response['message'], false);
                }
                console.log('booth_district_name_response', response);
                loading.dismiss();
            }, error => {
                console.log('booth_district_name_error', JSON.stringify(error));
                loading.dismiss();
            }
        );
    }

    getDistrictBackAreaByChange() {
        this.areaPart = 'ion-hide';
        this.districtBackNameId = '';
        this.bankBoothNameList = '';
        this.ionSelectStatus = 1;
        this.getDistrictBackArea();
    }

    async getDistrictBackArea() {
        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
        await loading.present();
        const districtBackAreaObj = {
            districtName: this.districtBankId,
        };
        this.commonService.setReq('POST', this.districtBackNameUrl, districtBackAreaObj).subscribe(
            response => {
                if (response['status'] === 200) {
                    this.areaPart = '';
                    this.districtBackNameList = response['data'].boothBankNameList;
                } else {
                    this.commonService.toastMsg(response['message'], false);
                }
                console.log('booth_bank_name_by_district_response ', response);
                loading.dismiss();
            }, error => {
                console.log('booth_bank_name_by_district_error', JSON.stringify(error));
                loading.dismiss();
            }
        );
        this.ionSelectStatus = 0;
    }

    getBankBranchDetailsByChange() {
        this.bankBoothNameList = '';
        if (this.ionSelectStatus === 0) {
            this.getBankBranchDetails();
        }
    }

    async getBankBranchDetails() {
        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
        await loading.present();
        const bankBranchDetailsObj = {
            districtName: this.districtBankId,
            bankName: this.districtBackNameId,
        };
        this.commonService.setReq('POST', this.bankBoothNameUrl, bankBranchDetailsObj).subscribe(
            response => {
                if (response['status'] === 200) {
                    this.bankBoothNameList = response['data'].boothNameList;
                } else {
                    this.commonService.toastMsg(response['message'], false);
                }
                console.log('bank_booth_name_by_district_and_bank_response', response);
                loading.dismiss();
            }, error => {
                console.log('bank_booth_name_by_district_and_bank_error', JSON.stringify(error));
                loading.dismiss();
            }
        );
    }
}
