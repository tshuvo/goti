import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverLicenseTaggingPageRoutingModule } from './driver-license-tagging-routing.module';

import { DriverLicenseTaggingPage } from './driver-license-tagging.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverLicenseTaggingPageRoutingModule
  ],
  declarations: [DriverLicenseTaggingPage]
})
export class DriverLicenseTaggingPageModule {}
