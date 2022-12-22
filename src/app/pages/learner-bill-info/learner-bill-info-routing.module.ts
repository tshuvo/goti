import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearnerBillInfoPage } from './learner-bill-info.page';

const routes: Routes = [
  {
    path: '',
    component: LearnerBillInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnerBillInfoPageRoutingModule {}
