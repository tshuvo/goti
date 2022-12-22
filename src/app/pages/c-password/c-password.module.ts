import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CPasswordPageRoutingModule } from './c-password-routing.module';

import { CPasswordPage } from './c-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CPasswordPageRoutingModule
  ],
  declarations: [CPasswordPage]
})
export class CPasswordPageModule {}
