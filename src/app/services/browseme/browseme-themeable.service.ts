import { Injectable } from '@angular/core';
import {ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject} from '@ionic-native/themeable-browser/ngx';
import {InAppBrowserEvent} from '@ionic-native/in-app-browser';
import {SpinnerDialog} from '@ionic-native/spinner-dialog/ngx';

import {Platform} from "@ionic/angular";
import {Router} from "@angular/router";

import {CommonService} from "../common/common.service";

@Injectable({
  providedIn: 'root'
})
export class BrowsemeThemeableService {

  constructor(
      private themeableBrowser: ThemeableBrowser,
      private spinnerDialog: SpinnerDialog,
      public router: Router,
      private platform: Platform,
      private commonService: CommonService,
  ) {}


  goUrl(url='') {
    this.platform.ready().then(() => {

      try{
        const options: ThemeableBrowserOptions = {
          statusbar: {
            color: '#ffffffff'
          },
          toolbar: {
            height: 44,
            color: '#00046f'
          },
          title: {
            color: '#ffffffff',
            showPageTitle: true,
            staticText: 'বিআরটিএ সেবা'
          },
          
          closeButton: {  
            imagePressed: 'close_pressed',
            align: 'right',
            event: 'closePressed',
          },
         
          backButtonCanClose: true
        };
  
        let  browser: ThemeableBrowserObject;
        if (this.platform.is('ios')) {
          browser = this.themeableBrowser.create(url,  '_blank' , options);
  
        } else if (this.platform.is('android')) {
          browser = this.themeableBrowser.create(url,  '_self' , options);
  
        }else{
          browser = this.themeableBrowser.create(url,   '_blank' , options);
        }
  
        //const  browser: ThemeableBrowserObject = this.themeableBrowser.create(url,  '_blank' , options) ;
  
        browser.on('loadstart').subscribe((ev: InAppBrowserEvent) => {
          this.responseAction(ev.url, browser);

          this.spinnerDialog.show(null, null, true);
        }, err => {
          this.commonService.toastMsg('Something went wrong! Please try after some time.', false);
          this.spinnerDialog.hide();
        });
  
        browser.on('loadstop').subscribe(() => {
          this.spinnerDialog.hide();
        }, err => {
          this.spinnerDialog.hide();
        });
  
        browser.on('loaderror').subscribe(() => {
          this.commonService.toastMsg('Something went wrong! Please try after some time.', false);
          this.spinnerDialog.hide();
        }, err => {
          this.commonService.toastMsg('Something went wrong! Please try after some time.', false);
          this.spinnerDialog.hide();
        });
  
        browser.on('exit').subscribe((ev: InAppBrowserEvent) => {
          this.responseAction(ev.url, browser);
          
          this.spinnerDialog.hide();
        }, err => {
          this.spinnerDialog.hide();
        });
  
        browser.on('closePressed').subscribe((ev: InAppBrowserEvent) => {
          this.responseAction(ev.url, browser);
          this.spinnerDialog.hide();
        });
  
  
        browser.on('forwardPressed').subscribe((ev: InAppBrowserEvent) => {
          this.responseAction(ev.url, browser);
          this.spinnerDialog.hide();
        });
  
        browser.on('backPressed').subscribe((ev: InAppBrowserEvent) => {
          this.responseAction(ev.url, browser);
          this.spinnerDialog.hide();
        }); 

      }catch(err){
        //this.commonService.toastMsg('দুঃখিত! পরে আবার চেষ্টা করুন', false );
      }

    });

  }

  responseAction(currentUrl, browser) {
    //let currentUrl = ev.url;
    // console.log("gettitng url: ", currentUrl);
    let currentUrlObj = new URL(currentUrl);
    const go = currentUrlObj.searchParams.get('go');
    let data = currentUrlObj.searchParams.get('data');

    data = JSON.parse(data);
    if(go=='app'){
      browser.close();
      if(data['success'] == true){
        this.commonService.toastMsg(data['message']);
      }else{
        this.commonService.toastMsg(data['message'], false);
      }
      this.router.navigateByUrl('/home');
    }
  }


}
