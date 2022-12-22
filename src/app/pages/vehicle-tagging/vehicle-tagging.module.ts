import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleTaggingPageRoutingModule } from './vehicle-tagging-routing.module';

import { VehicleTaggingPage } from './vehicle-tagging.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleTaggingPageRoutingModule
  ],
  declarations: [VehicleTaggingPage]
})
export class VehicleTaggingPageModule {}
