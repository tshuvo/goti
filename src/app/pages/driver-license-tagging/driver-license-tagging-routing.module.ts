import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverLicenseTaggingPage } from './driver-license-tagging.page';

const routes: Routes = [
  {
    path: '',
    component: DriverLicenseTaggingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverLicenseTaggingPageRoutingModule {}
