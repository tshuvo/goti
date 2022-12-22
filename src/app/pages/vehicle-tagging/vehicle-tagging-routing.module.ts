import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleTaggingPage } from './vehicle-tagging.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleTaggingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleTaggingPageRoutingModule {}
