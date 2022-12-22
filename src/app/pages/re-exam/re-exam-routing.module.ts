import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReExamPage } from './re-exam.page';

const routes: Routes = [
  {
    path: '',
    component: ReExamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReExamPageRoutingModule {}
