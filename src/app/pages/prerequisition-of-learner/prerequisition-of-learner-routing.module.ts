import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrerequisitionOfLearnerPage } from './prerequisition-of-learner.page';

const routes: Routes = [
  {
    path: '',
    component: PrerequisitionOfLearnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrerequisitionOfLearnerPageRoutingModule {}
