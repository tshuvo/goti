import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverTaggingPageRoutingModule } from './driver-tagging-routing.module';

import { DriverTaggingPage } from './driver-tagging.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverTaggingPageRoutingModule
  ],
  declarations: [DriverTaggingPage]
})
export class DriverTaggingPageModule {}
