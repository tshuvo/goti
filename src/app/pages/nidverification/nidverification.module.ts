import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NidverificationPageRoutingModule } from './nidverification-routing.module';

import { NidverificationPage } from './nidverification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NidverificationPageRoutingModule
  ],
  declarations: [NidverificationPage]
})
export class NidverificationPageModule {}
