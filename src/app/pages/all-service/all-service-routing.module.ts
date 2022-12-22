import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllServicePage } from './all-service.page';

const routes: Routes = [
  {
    path: '',
    component: AllServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllServicePageRoutingModule {}
