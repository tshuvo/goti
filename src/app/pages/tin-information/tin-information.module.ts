import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TinInformationPageRoutingModule } from './tin-information-routing.module';

import { TinInformationPage } from './tin-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TinInformationPageRoutingModule
  ],
  declarations: [TinInformationPage]
})
export class TinInformationPageModule {}
