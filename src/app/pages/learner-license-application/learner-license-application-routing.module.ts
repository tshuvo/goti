import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearnerLicenseApplicationPage } from './learner-license-application.page';

const routes: Routes = [
  {
    path: '',
    component: LearnerLicenseApplicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnerLicenseApplicationPageRoutingModule {}
