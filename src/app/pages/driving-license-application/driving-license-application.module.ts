import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrivingLicenseApplicationPageRoutingModule } from './driving-license-application-routing.module';

import { DrivingLicenseApplicationPage } from './driving-license-application.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DrivingLicenseApplicationPageRoutingModule
  ],
  declarations: [DrivingLicenseApplicationPage]
})
export class DrivingLicenseApplicationPageModule {}
