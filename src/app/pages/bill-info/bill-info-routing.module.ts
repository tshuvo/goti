import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillInfoPage } from './bill-info.page';

const routes: Routes = [
  {
    path: '',
    component: BillInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillInfoPageRoutingModule {}
