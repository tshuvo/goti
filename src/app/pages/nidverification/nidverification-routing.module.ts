import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NidverificationPage } from './nidverification.page';

const routes: Routes = [
  {
    path: '',
    component: NidverificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NidverificationPageRoutingModule {}
