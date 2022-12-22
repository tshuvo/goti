import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CPasswordPage } from './c-password.page';

const routes: Routes = [
  {
    path: '',
    component: CPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CPasswordPageRoutingModule {}
