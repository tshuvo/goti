import {Injectable} from '@angular/core';
import {InAppBrowser, InAppBrowserOptions, InAppBrowserObject} from '@ionic-native/in-app-browser/ngx';
import {InAppBrowserEvent} from '@ionic-native/in-app-browser';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';
import {LoadingController} from '@ionic/angular';
import {CommonService} from '../common/common.service';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';

// import {parseJson} from "@angular-devkit/core";

@Injectable({
    providedIn: 'root'
})

export class BrowsemeService {

    constructor(
        public router: Router,
        private iab: InAppBrowser,
        private splashScreen: SplashScreen,
        private platform: Platform,
        public loadingController: LoadingController,
        private commonService: CommonService,
    ) {
        this.serverURL = this.commonService.apiBaseUrl;
    }

    serverURL: string;

    options: InAppBrowserOptions = {
        location: 'yes', //Or 'no'
        hidden: 'no', //Or  'yes'
        zoom: 'no', //Android only ,shows browser zoom controls
        hardwareback: 'yes',
        mediaPlaybackRequiresUserAction: 'no',
        shouldPauseOnSuspend: 'no', //Android only
        closebuttoncaption: 'Close', //iOS only
        toolbarposition: 'bottom',
        enableViewportScale: 'yes', //iOS only
        allowInlineMediaPlayback: 'no', //iOS only
        presentationstyle: 'fullscreen', //iOS only
        fullscreen: 'yes', //Windows only
        suppressesIncrementalRendering: 'no',
        transitionstyle: 'crossdissolve',
        clearcache: 'yes',
        clearsessioncache: 'yes',
        disallowoverscroll: 'no',
        toolbar: 'yes',
        footer: 'no'
    };

    async goWithStaticUrl(urls: any, callBack: any = '') {
        console.log('servers--url--- ', urls);

        /* var i = 0, strLength = urls.length;
         for(i; i < strLength; i++) {
           urls = urls.replace("%3D", "");
         }*/

        console.log('make--url--- ', urls);

        // urls = decodeURI(urls);

        // urls = urls.replace('https://','https://www.');

        console.log('decode url:', urls);

        this.goUrl('' + urls);
        // return ;

        //this.goUrl('https://ipaybrta.cnsbd.com/bsp/bsppayment?u_id=cWsRE56dsUfGnCSrBLF01w&t_no=VAzQmkOb5kkpMN0qfcBRRA&t_amt=4SqlSRyFRO3O6AqbU0CvGg&mob_no=70pYvByKsP2BRWwICNfdL2Bw&sec_key=32303032303231363036393737&ret_url=UPHvBKqGLUC83nWcguuf1CjnoH3ZX2jNoub9XDCMXUZQgxoovAKTAACMXU0fbJFSLElpP9G2FvZDYT03Ov0POKRKG2BWZc2FjVpZSq4wVQ0lomc0');
        //this.goUrl('https://www.ipaybrta.cnsbd.com/bsp/bsppayment?u_id=cWsRE56dsUfGnCSrBLF01w%3D%3D&t_no=bMwGZRnU88Lz54IGWPbiBg%3D%3D&t_amt=4SqlSRyFRO3O6AqbU0CvGg%3D%3D&mob_no=70pYvByKsP%2BRWwICNfdL%2Bw%3D%3D&sec_key=32303032303231353036303837&ret_url=UPHvB2Rw8jW84FYvmkqslXfqOd%2BFhtHxRGf24iItBLrvXUveY7LWMq%2BZ0fbJFSLElpP9G%2FvZDYT03Ov0POKRKG%2BWZc%2FjVpZSq4wVQ0lomc0%3D');
        //  this.goUrl('https://ipaybrta.cnsbd.com/bsp/bsppayment?u_id=cWsRE56dsUfGnCSrBLF01w%3D%3D&t_no=cZNhpcxrcxDqYLjXhT7qoQ%3D%3D&t_amt=4SqlSRyFRO3O6AqbU0CvGg%3D%3D&mob_no=70pYvByKsP%2BRWwICNfdL%2Bw%3D%3D&sec_key=32303032303231373037333439&ret_url=UPHvB2Rw8jW84FYvmkqslXfqOd%2BFhtHxRGf24iItBLrvXUveY7LWMq%2BZ0fbJFSLElpP9G%2FvZDYT03Ov0POKRKG%2BWZc%2FjVpZSq4wVQ0lomc0%3D');
        // return;


        // var ref = window.open('https://www.ipaybrta.cnsbd.com/bsp/bsppayment?u_id=cWsRE56dsUfGnCSrBLF01w%3D%3D&t_no=bMwGZRnU88Lz54IGWPbiBg%3D%3D&t_amt=4SqlSRyFRO3O6AqbU0CvGg%3D%3D&mob_no=70pYvByKsP%2BRWwICNfdL%2Bw%3D%3D&sec_key=32303032303231353036303837&ret_url=UPHvB2Rw8jW84FYvmkqslXfqOd%2BFhtHxRGf24iItBLrvXUveY7LWMq%2BZ0fbJFSLElpP9G%2FvZDYT03Ov0POKRKG%2BWZc%2FjVpZSq4wVQ0lomc0%3D', '_self', 'location=no');
        // var ref = window.open(urls , '_self', 'location=yes');
        // // ref.addEventListener('loadstart', function(event) { console.log('getting data new :', event.type + " dffsd "+event); });
        // ref.addEventListener('loadstart', function(params){
        //   console.log("getting params", params);
        //   alert('Loadstart fired');
        // });
    }

    goUrl(url: any, callBack: any = '') {

        //const loading  = await this.loadingController.create({message: 'Loading...'});
        //await loading.present();
        // this.splashScreen.hide();

        this.platform.ready().then(() => {
            // this.splashScreen.hide();
            let browser: InAppBrowserObject = null; // = this.iab.create(url, '_self', this.options);
            console.log('InAppBrowserObject------ ', browser);
            if (this.platform.is('ios')) {
                browser = this.iab.create(url, '_blank', this.options);
                console.log('browser------ios----- ', browser);
            } else if (this.platform.is('android')) {
                browser = this.iab.create(url, '_self', this.options);
                console.log('browser------android----- ', browser);
            }

            if (browser.on('loaderror')) {
                console.log('browser------loaderror----- ', browser);
                browser.on('loaderror').subscribe((ev: InAppBrowserEvent) => {
                    console.log('browser------loaderror--subscribe----- ', ev);
                    console.log('Loading error.');
                    //loading.dismiss();
                    //browser.close();
                }, err => {
                    console.log('browser------err--subscribe----- ', err);
                    //loading.dismiss();
                    browser.close();
                });
            }

            // on start browser
            if (browser.on('loadstart')) {
                console.log('browser------loadstart------ ', browser);
                browser.on('loadstart').subscribe((ev: InAppBrowserEvent) => {
                    console.log('browser------loadstart--subscribe------ ', ev);
                    console.log('Page is loading loadstart');
                    console.log('evvvvurllll----- ', ev.url);
                    // this.splashScreen.hide();
                    const currentUrl = ev.url;
                    const currentUrlObj = new URL(currentUrl);
                    const go = currentUrlObj.searchParams.get('go');
                    let data = currentUrlObj.searchParams.get('data');
                    console.log('browser------loadstart--data------ ', data);
                    data = JSON.parse(data);
                    console.log('browser------loadstart--dataparse------ ', data);

                    if (go == 'app') {
                        console.log('browser------loadstart--go------ ', go);
                        browser.close();
                        if (data['success'] == true) {
                            console.log('browser------loadstart--success--true------ ', data['success']);
                            this.commonService.toastMsg(data['message']);
                        } else {
                            console.log('browser------loadstart--success--false------ ', data['success']);
                            this.commonService.toastMsg(data['message'], false);
                        }
                        this.router.navigateByUrl('/home');
                        console.log('browser------loadstart--callBack------ ', callBack);
                        callBack;
                    }
                    // loading.dismiss();
                }, err => {
                    console.log('InAppBrowser loadstart Event Error: ' + err);
                    // loading.dismiss();
                    browser.close();
                });
            }

            // on Load complete
            if (browser.on('loadstop')) {
                console.log('browser------loadstop------ ', browser);
                browser.on('loadstop').subscribe((ev: InAppBrowserEvent) => {
                    console.log('browser------loadstop---subscribe--- ', ev);
                    console.log('get the url in loadstop block:', ev.url);
                    console.log('Loading complete');
                    browser.show();
                    // loading.dismiss();
                }, err => {
                    console.log('browser------loadstop ', err);
                    // loading.dismiss();
                    browser.close();
                });
            }

            // On close browser
            if (browser.on('exit')) {
                console.log('browser------exit------ ', browser);
                browser.on('exit').subscribe((ev: InAppBrowserEvent) => {
                    console.log('browser------exit---subscribe--- ', ev);
                    console.log('Exit page');
                    console.log('Page is loading exit');
                    console.log('browser-----exit--url ', ev.url);
                    let currentUrl = ev.url;
                    let currentUrlObj = new URL(currentUrl);
                    const go = currentUrlObj.searchParams.get('go');
                    console.log('browser------exit---subscribe--- ', go);
                    let data = currentUrlObj.searchParams.get('data');
                    console.log('browser------exit---subscribe--- ', data);
                    data = JSON.parse(data);
                    console.log('browser------exit---data--parse--- ', data);
                    if (go == 'app') {
                        console.log('browser------exit---subscribe--- ', go);
                        browser.close();
                        if (data['success'] == true) {
                            console.log('browser------exit---true--data---success--- ', data['success']);
                            this.commonService.toastMsg(data['message']);
                        } else {
                            console.log('browser------exit---data--false---success--- ', data['success']);
                            this.commonService.toastMsg(data['message'], false);
                        }
                        this.router.navigateByUrl('/home');
                        console.log('browser------exit---callBack--- ', callBack);
                        callBack;
                    }
                    // loading.dismiss();
                }, err => {
                    console.log('browser------exit---err--- ', err);
                    // loading.dismiss();
                    browser.close();
                });
            }
        });
    }

    // responseAction(currentUrl, browser) {
    //   //let currentUrl = ev.url;
    //   let currentUrlObj = new URL(currentUrl);
    //   const go = currentUrlObj.searchParams.get('go');
    //   let data = currentUrlObj.searchParams.get('data');
    //
    //   data = JSON.parse(data);
    //   if(go=='app'){
    //     browser.close();
    //     if(data['success'] == true){
    //       this.commonService.toastMsg(data['message']);
    //     }else{
    //       this.commonService.toastMsg(data['message'], false);
    //     }
    //     this.router.navigateByUrl('/home');
    //   }
    // }

}
