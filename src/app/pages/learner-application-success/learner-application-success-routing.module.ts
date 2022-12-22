import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearnerApplicationSuccessPage } from './learner-application-success.page';

const routes: Routes = [
  {
    path: '',
    component: LearnerApplicationSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnerApplicationSuccessPageRoutingModule {}
