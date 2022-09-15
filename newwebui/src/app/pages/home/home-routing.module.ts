import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'entities',
    loadChildren: () => import('../entities-list/entities-list.module').then(m => m.EntitiesListPageModule)
  },
  {
    path: 'work-orders',
    loadChildren: () => import('../work-orders-menu/work-orders-menu.module').then( m =>m.WorkOrdersMenuPageModule)
  },
  {
    path: 'config',
    loadChildren: () => import('../report-config-list/report-config-list.module').then( m => m.ReportConfigListPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
