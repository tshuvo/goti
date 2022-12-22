import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrerequisitionOfAppointmentPage } from './prerequisition-of-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: PrerequisitionOfAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrerequisitionOfAppointmentPageRoutingModule {}
