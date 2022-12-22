import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillInfoPageRoutingModule } from './bill-info-routing.module';

import { BillInfoPage } from './bill-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillInfoPageRoutingModule
  ],
  declarations: [BillInfoPage]
})
export class BillInfoPageModule {}
