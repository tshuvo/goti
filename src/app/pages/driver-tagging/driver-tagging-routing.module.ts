import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverTaggingPage } from './driver-tagging.page';

const routes: Routes = [
  {
    path: '',
    component: DriverTaggingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverTaggingPageRoutingModule {}
