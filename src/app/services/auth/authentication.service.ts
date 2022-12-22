import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import {Storage} from '@ionic/storage';
import {CommonService} from '../common/common.service';


@Injectable()
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
      private router: Router,
      private storage: Storage,
      private platform: Platform,
      private commonService: CommonService,
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }


  login(data) {
    this.storage.set('USER_INFO', data).then((response) => {
      this.router.navigate(['login']);
      this.authState.next(true);
    });
  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.commonService.removeItem('token');
      this.commonService.removeItem('userName');
      this.commonService.removeItem('userPhone');
      this.commonService.removeItem('userEmail');
      this.commonService.removeItem('userPhoto');
      this.commonService.removeItem('isLogin');
      this.commonService.removeItem('bank_massage');
      this.storage.clear();
      this.router.navigate(['home']);
      this.authState.next(false);
    });
  }

  logoutForNid() {
    this.storage.remove('USER_INFO').then(() => {
      this.commonService.removeItem('token');
      this.commonService.removeItem('userName');
      this.commonService.removeItem('userPhone');
      this.commonService.removeItem('userEmail');
      this.commonService.removeItem('userPhoto');
      this.commonService.removeItem('isLogin');
      this.commonService.removeItem('bank_massage');
      this.storage.clear();
      // this.router.navigate(['home']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return  this.authState.value;
  }

  shouldAppUpdate(){

      const url = this.commonService.apiBaseUrl + "/login/app-version";
      return this.commonService.setReq('GET', url);

  }


}
