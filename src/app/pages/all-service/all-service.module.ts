import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllServicePageRoutingModule } from './all-service-routing.module';

import { AllServicePage } from './all-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllServicePageRoutingModule
  ],
  declarations: [AllServicePage]
})
export class AllServicePageModule {}
