import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LoadingController, Platform} from '@ionic/angular';
import {CommonService} from '../../services/common/common.service';

@Component({
    selector: 'app-bank-branch',
    templateUrl: './bank-branch.component.html',
    styleUrls: ['./bank-branch.component.scss'],
})

export class BankBranchComponent implements OnInit, AfterViewInit {

    districtNameUrl: any;
    districtNameId: any;
    districtNameList: any;
    districtBackNameUrl: any;
    districtBackNameId: any;
    districtBackNameList: any;
    bankBranchNameUrl: any;
    bankBranchNameList: any;
    bankPart: any = 'ion-hide';

    constructor(public platform: Platform, private commonService: CommonService, private loadingController: LoadingController) {
        const urlBase = this.commonService.apiBaseUrl + 'file/';
        this.districtNameUrl = urlBase + 'bank-list-district';
        this.districtBackNameUrl = urlBase + 'bank-name-list-by-district-name';
        this.bankBranchNameUrl = urlBase + 'branch-name-list-by-bank-name-district-name';
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.platform.ready().then(() => {
            this.loadDistrictName();
        });
    }

    async loadDistrictName() {
        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
        await loading.present();
        this.commonService.setReq('GET', this.districtNameUrl).subscribe(
            response => {
                if (response['status'] === 200) {
                    this.districtNameList = response['data'].districtNameList;
                } else {
                    this.commonService.toastMsg(response['message'], false);
                }
                console.log('branch_district_name_response ', response);
                loading.dismiss();
            }, error => {
                console.log('branch_district_name_error ', JSON.stringify(error));
                loading.dismiss();
            }
        );
    }

    getBankNameByChangeDistrict() {
        this.bankPart = 'ion-hide';
        this.districtBackNameId = '';
        this.bankBranchNameList = '';
        this.getBankByDistrict();
    }

    async getBankByDistrict() {
        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
        await loading.present();
        const idObj = {
            districtName: this.districtNameId,
        };
        this.commonService.setReq('POST', this.districtBackNameUrl, idObj).subscribe(
            response => {
                if (response['status'] === 200) {
                    this.bankPart = '';
                    this.districtBackNameList = response['data'].bankNameList;
                } else {
                    this.commonService.toastMsg(response['message'], false);
                }
                console.log('branch_bank_name_by_district_response ', response);
                loading.dismiss();
            }, error => {
                console.log('branch_bank_name_by_district_error', JSON.stringify(error));
                loading.dismiss();
            }
        );
    }

    getBankBranchByChangeDistrictBank() {
        this.bankBranchNameList = '';
        this.getBankBranchByDistrictBank();
    }

    async getBankBranchByDistrictBank() {
        const loading = await this.loadingController.create({message: 'অপেক্ষা করুন...'});
        await loading.present();
        const idObj = {
            districtName: this.districtNameId,
            bankName: this.districtBackNameId
        };
        this.commonService.setReq('POST', this.bankBranchNameUrl, idObj).subscribe(
            response => {
                if (response['status'] === 200) {
                    this.bankBranchNameList = response['data'].branchNameList;
                } else {
                    this.commonService.toastMsg(response['message'], false);
                }
                console.log('bank_branch_name_by_district_and_bank_response', response);
                loading.dismiss();
            }, error => {
                console.log('bank_branch_name_by_district_and_bank_error', JSON.stringify(error));
                loading.dismiss();
            }
        );
    }
}
