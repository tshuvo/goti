import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LearnerBillInfoPageRoutingModule } from './learner-bill-info-routing.module';

import { LearnerBillInfoPage } from './learner-bill-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LearnerBillInfoPageRoutingModule
  ],
  declarations: [LearnerBillInfoPage]
})
export class LearnerBillInfoPageModule {}
