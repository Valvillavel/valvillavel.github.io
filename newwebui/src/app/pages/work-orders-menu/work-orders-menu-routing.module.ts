import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkOrdersMenuPage } from './work-orders-menu.page';

const routes: Routes = [
  {
    path: '',
    component: WorkOrdersMenuPage
  },
  {
    path:':type',
    loadChildren: () => import('../work-orders/work-orders.module').then( m => m.WorkOrdersPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkOrdersMenuPageRoutingModule {}
