import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCustomerPage } from './add-edit-entity.page';

const routes: Routes = [
  {
    path: '',
    component: AddCustomerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCustomerPageRoutingModule {}
