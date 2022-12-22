import {Component, QueryList, ViewChildren} from '@angular/core';
import {
  ActionSheetController,
  AlertController, Events,
  IonicModule, IonRouterOutlet,
  LoadingController,
  MenuController, ModalController,
  Platform,
  PopoverController
} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { AuthenticationService } from './services/auth/Authentication.service';
import { CommonService } from './services/common/common.service';
import {AppVersion} from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  /*public appPages = [
    {
      title: 'Welcome',
      url: '/welcome',
      icon: 'home'
    },
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Test',
      url: '/test',
      icon: 'flask'
    }
  ];*/

  public  appPages;
  storeUrlAndroid: any;
  currentVersion: any;
  storeUrlIos: any;
  allowedVersionAndroid: any;
  allowedVersionIos: any;
  versionMatch: any;
  tempCounter: any;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  private logOutUrl = this.commonService.apiBaseUrl + 'v1/user/logout';

  isUserLogin: boolean;
  userMenuName: any;
  userMenuPhone: any;
  menuUserPhoto: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menu: MenuController,
    private appVersion: AppVersion,
    public modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private authenticationService: AuthenticationService,
    private commonService: CommonService,
    private loadingController: LoadingController,
    public events: Events
  ) {
    this.initializeApp();

    this.tempCounter = 0;
  }

  initializeApp() {

    this.platform.ready().then(() => {

      if (!this.platform.is('mobileweb')) {
        console.log('coming for android or ios.');
        this.appVersion.getVersionNumber().then((version) => {
          console.log('your current version is', version);
          this.currentVersion = version;
          this.checkVersionControl();
        });
      }

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.backButtonEvent();
      this.authenticationService.authState.subscribe(state => {
        if (state) {

          this.isUserLogin = true;
          this.userMenuName = this.commonService.getItem('userName');
          this.userMenuPhone = this.commonService.getItem('userPhone');

          try {
            const photo = this.commonService.getUserPhotoForMenu();
            if (photo !== '') {
              this.menuUserPhoto = photo;
            } else {
              this.menuUserPhoto = '/assets/icon/profile.png';
            }
          } catch (e) {
            this.menuUserPhoto = '/assets/icon/profile.png';
            console.log('component_photo_error ', e.getMessages());
          }

          this.appPages = [
            {
              title: 'হোম',
              url: '/home',
              icon: 'home'
            },
            {
              title: 'সেটিংস',
              url: '/settings',
              icon: 'settings'
            },{
              title: 'মতামত',
              url: '/complain',
              icon: 'chatbubbles'
            },
            {
              title: 'লগ আউট',
              url: '/home',
              icon: 'log-out'
            }
          ];
          this.router.navigate(['home']);
        } else {
          this.isUserLogin = false;
          this.appPages = [
            {
              title: 'হোম',
              url: '/home',
              icon: 'home'
            },
            {
              title: 'লগইন',
              url: '/login',
              icon: 'log-in'
            },
            {
              title: 'রেজিস্টার',
              url: '/registration',
              icon: 'list'
            }
          ];
          this.router.navigate(['welcome']);
          // this.router.navigate(['']);
        }
      });
    });

    this.events.subscribe('profileUpdates', () => {
      this.userMenuName = this.commonService.getItem('userName');
      try {
        const photo = this.commonService.getUserPhotoForMenu();
        if (photo !== '') {
          this.menuUserPhoto = photo;
        } else {
          this.menuUserPhoto = '/assets/icon/profile.png';
        }
      } catch (e) {
        this.menuUserPhoto = '/assets/icon/profile.png';
        console.log('component_photo_profileUpdates_error ', e.getMessages());
      }
    });

    this.events.subscribe('versionControlChecker', () => {
      console.log('versionControlChecker------subscribe-------');
      this.checkVersionControl();
    });
  }



  checkVersionControl(){
    this.authenticationService.shouldAppUpdate().subscribe(result => {
      console.log("app version", result);
      if (result['status'] == 200) {
        console.log('platform',this.platform);
        if (this.platform.is('android')) {

          this.versionMatch = true;
          return;

          console.log('platform android');
          let tempAndroid = result['data']['APPVERSION'][0];
          this.storeUrlAndroid = tempAndroid['updateUrl'];
          this.allowedVersionAndroid = tempAndroid['versionStatus'];
          console.log("allowed versions android: ", this.allowedVersionAndroid);
          console.log("corrent " +
              ": ", this.currentVersion);
          if (this.allowedVersionAndroid.indexOf(this.currentVersion) == -1) {
            console.log("not matched android");
            this.versionMatch = false;
          } else {
            console.log("matched android");
            this.versionMatch = true;
          }
        } else if (this.platform.is('ios')){
          console.log('platform ios');
          let tempIos = result['data']['APPVERSION'][1];
          this.storeUrlIos = tempIos['updateUrl'];
          this.allowedVersionIos = tempIos['versionStatus'];
          if (this.allowedVersionIos.indexOf(this.currentVersion) == -1) {
            this.versionMatch = false;
          } else {
            this.versionMatch = true;
          }
        }
        // else if (this.platform.is('windows')){
        else {
          console.log('platform web');
          this.versionMatch = true;
        }
      }
      if (this.versionMatch){
        console.log("version get matched");
      } else {

        this.showPopup();
      }
    });
  }

  sideMenuClicked(name: any) {
    if (name == 'লগ আউট') {
      this.logoutAlert();
    } else if (name == 'হোম' && this.router.url === '/home') {
      console.log('homePageReload------publish-------');
      this.events.publish('homePageReload');
    }
  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(1, async () => {
      if (this.router.url === '/home') {
        /*if (window.confirm('আপনি কি অ্যাপটি বন্ধ করতে চান ?')) {
          navigator['app'].exitApp();
        }*/
        const alert = await this.alertController.create({
          header: 'সতর্কীকরণ',
          message: 'আপনি কি অ্যাপটি বন্ধ করতে চান ?',
          buttons: [
            {
              text: 'হ্যাঁ',
              handler: (yes) => {
                navigator['app'].exitApp();
              }
            }, {
              text: 'না',
              role: 'cancel',
              cssClass: 'danger',
              handler: () => {
                console.log('No');
              }
            }
          ]
        });
        await alert.present();
      } else {
        this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
          console.log('doing it please ... ', this.router.url);
          if (this.router.url === '/settings') {
            this.router.navigate(['/home']);
          } else {
            if (outlet && outlet.canGoBack()) {
              outlet.pop();
              console.log('can go back ... !!');
            }
          }
        });
      }
    });
  }

    // backButtonEvent() {
  //   this.platform.backButton.subscribeWithPriority(1,async () => {
  //
  //     console.log("back button clicked!", this.router.url + "//" + this.tempCounter);
  //
  //     if(this.tempCounter == 0 && this.router.url == '/welcome'){
  //       console.log("first time: ", this.tempCounter);
  //       IonicModule.forRoot({hardwareBackButton: false});
  //       this.tempCounter = this.tempCounter+1;
  //       this.lastTimeBackPress = new Date().getTime();
  //       this.commonService.toastMsg("Press again to exit.", false );
  //       return;
  //     }
  //
  //     if (this.router.url == '/welcome') {
  //
  //
  //       if (this.lastTimeBackPress == 0) {
  //         this.commonService.toastMsg("Press again to exit.", false );
  //         this.lastTimeBackPress = new Date().getTime();
  //       } else if (new Date().getTime() > this.lastTimeBackPress + this.timePeriodToExit) {
  //         this.commonService.toastMsg("Press again to exit.", false );
  //         this.lastTimeBackPress = new Date().getTime();
  //       } else {
  //         navigator['app'].exitApp();
  //         //this.platfrom.exitApp();
  //       }
  //
  //     }
  //
  //     try {
  //       const element = await this.actionSheetCtrl.getTop();
  //       if (element) {
  //         element.dismiss();
  //         return;
  //       }
  //     } catch (error) {
  //     }
  //
  //     // close popover
  //     try {
  //       const element = await this.popoverCtrl.getTop();
  //       if (element) {
  //         element.dismiss();
  //         return;
  //       }
  //     } catch (error) {
  //     }
  //
  //     // close modal
  //     try {
  //       const element = await this.modalCtrl.getTop();
  //       if (element) {
  //         element.dismiss();
  //         return;
  //       }
  //     } catch (error) {
  //       console.log(error);
  //
  //     }
  //
  //     // close side menua
  //     try {
  //       const element = await this.menu.getOpen();
  //       if (element !== null) {
  //         this.menu.close();
  //         return;
  //
  //       }
  //
  //     } catch (error) {
  //
  //     }
  //
  //
  //     this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
  //       console.log('doing it please ... ', this.router.url);
  //       if (outlet && outlet.canGoBack()) {
  //         outlet.pop();
  //         console.log('can go back ... !!');
  //       } else if (this.router.url === '/welcome') {
  //         console.log('you are in login page..!');
  //         if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
  //           // this.platform.exitApp(); // Exit from app
  //           console.log('should exits..');
  //           navigator['app'].exitApp(); // work in ionic 4
  //
  //         } else {
  //           this.commonService.toastMsg('Press again to exit.', false);
  //
  //           this.lastTimeBackPress = new Date().getTime();
  //         }
  //       }
  //     });
  //   });
  //
  // }

  async logoutAlert() {
    const alert = await this.alertController.create({
      header: 'প্রস্থান',
      message: '<small>আপনি কি নিশ্চিত, আপনি প্রস্থান করতে চান ?<small>',
      buttons: [
        {
          text: 'হ্যাঁ',
          handler: (yes) => {
            this.logout();
          }
        }, {
          text: 'না',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            console.log('No');
          }
        }
      ]
    });
    await alert.present();
  }

  async logout() {
    const loading = await this.loadingController.create({message: 'অনুগ্রহ করে অপেক্ষা করুন...'});
    await loading.present();
    this.commonService.setReq('POST', this.logOutUrl).subscribe(
        response => {
          if (response['status'] === 200) {

            console.log('logout successful');

            this.commonService.toastMsg(response['data'].statusMessage);
            // this.commonService.setItem('isLogin',false );
            // this.events.publish('logged',  false);
            this.authenticationService.logout();
            this.router.navigateByUrl('login');

          } else {
            this.authenticationService.logout();
            this.router.navigateByUrl('home');

            this.commonService.toastMsg(response['message'], false);
          }
          console.log('logout_response', response);
          loading.dismiss();
        }, error => {
          console.log('logout_error', JSON.stringify(error));
          loading.dismiss();
        }
    );
  }

  async showPopup() {
    const alert = await this.alertController.create({
      header: 'Update Needed!',
      backdropDismiss: false,
      message: 'For getting the perfect user experience you need to update your application.',
      buttons: [
        {
          text: 'Update',
          handler: () => {
            // this.userService.loginState = false;
            // window.open('market://details?id=com.cnsbd.br.railwayapp', '_system');
            window.open(this.storeUrlAndroid, '_system');


            // const options: InAppBrowserOptions = {
            //     zoom: 'no'
            // }
            // const browser = this.iab.create(this.storeUrl, '_self', options);
          }
        }, {
          text: 'Not Now',
          handler: () => {
            console.log('clicked no!');
            this.logout();
            navigator['app'].exitApp();
          }
        }
      ]
    });
    alert.present();
  }
}
