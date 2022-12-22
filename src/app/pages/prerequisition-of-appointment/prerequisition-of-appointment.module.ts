import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrerequisitionOfAppointmentPageRoutingModule } from './prerequisition-of-appointment-routing.module';

import { PrerequisitionOfAppointmentPage } from './prerequisition-of-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrerequisitionOfAppointmentPageRoutingModule
  ],
  declarations: [PrerequisitionOfAppointmentPage]
})
export class PrerequisitionOfAppointmentPageModule {}
