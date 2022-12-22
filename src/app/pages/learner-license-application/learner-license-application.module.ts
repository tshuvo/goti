import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LearnerLicenseApplicationPageRoutingModule } from './learner-license-application-routing.module';

import { LearnerLicenseApplicationPage } from './learner-license-application.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LearnerLicenseApplicationPageRoutingModule
  ],
  declarations: [LearnerLicenseApplicationPage]
})
export class LearnerLicenseApplicationPageModule {}
