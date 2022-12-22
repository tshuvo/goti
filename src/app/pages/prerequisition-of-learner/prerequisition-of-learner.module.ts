import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrerequisitionOfLearnerPageRoutingModule } from './prerequisition-of-learner-routing.module';

import { PrerequisitionOfLearnerPage } from './prerequisition-of-learner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrerequisitionOfLearnerPageRoutingModule
  ],
  declarations: [PrerequisitionOfLearnerPage]
})
export class PrerequisitionOfLearnerPageModule {}
