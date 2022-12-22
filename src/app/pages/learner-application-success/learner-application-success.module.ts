import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LearnerApplicationSuccessPageRoutingModule } from './learner-application-success-routing.module';

import { LearnerApplicationSuccessPage } from './learner-application-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LearnerApplicationSuccessPageRoutingModule
  ],
  declarations: [LearnerApplicationSuccessPage]
})
export class LearnerApplicationSuccessPageModule {}
