import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {HttpClientModule} from '@angular/common/http';

import {AuthGuard} from './services/auth/auth-guard.service';
import { AuthenticationService } from './services/auth/Authentication.service';
import { IonicStorageModule } from '@ionic/storage';
import {Platform} from '@ionic/angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import {Network} from '@ionic-native/network/ngx';
import {CommonService} from './services/common/common.service';
import {DatePipe} from '@angular/common';
import {Camera} from '@ionic-native/camera/ngx';

import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import { ThemeableBrowser} from '@ionic-native/themeable-browser/ngx';
import {SpinnerDialog} from '@ionic-native/spinner-dialog/ngx';

import { Media } from '@ionic-native/media/ngx';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import {MediaCapture} from '@ionic-native/media-capture/ngx';
import {StreamingMedia} from '@ionic-native/streaming-media/ngx';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';

import { File } from '@ionic-native/File/ngx';
import {Base64} from '@ionic-native/base64/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuard,
    AuthenticationService,
    Platform,
    UniqueDeviceID,
    Network,
      Base64,
    File,
    Media,
    StreamingMedia,
    FileChooser,
    FilePath,
    ImagePicker,
    MediaCapture,
    AppVersion,
    InAppBrowser,
    ThemeableBrowser,
    SpinnerDialog,
    GoogleMaps,
    Geolocation
  ],

  bootstrap: [AppComponent]
})
export class AppModule {

  constructor( private network: Network, private platform: Platform, private commonService: CommonService ) {
    this.platform.ready().then(()=>{

      this.network.onDisconnect().subscribe(data => {
        this.commonService.alertMsgNoNet('ইন্টারনেট নেই!', 'আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন.', 'ঠিক আছে');
      }, error => console.error('err',error));
  
      this.network.onConnect().subscribe(data => {
      }, error => console.error('err',error));    

      
    });
      
  }
 
}
