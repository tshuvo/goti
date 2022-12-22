import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReExamPageRoutingModule } from './re-exam-routing.module';

import { ReExamPage } from './re-exam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReExamPageRoutingModule
  ],
  declarations: [ReExamPage]
})
export class ReExamPageModule {}
