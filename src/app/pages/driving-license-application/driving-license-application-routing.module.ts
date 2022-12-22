import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrivingLicenseApplicationPage } from './driving-license-application.page';

const routes: Routes = [
  {
    path: '',
    component: DrivingLicenseApplicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrivingLicenseApplicationPageRoutingModule {}
