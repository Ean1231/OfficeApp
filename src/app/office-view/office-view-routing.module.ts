import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfficeViewPage } from './office-view.page';

const routes: Routes = [
  {
    path: '',
    component: OfficeViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfficeViewPageRoutingModule {}
