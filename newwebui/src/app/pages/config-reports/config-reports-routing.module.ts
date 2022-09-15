import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigReportsPage } from './config-reports.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigReportsPage
  },
  {
    path: 'add/:report',
    loadChildren: () => import('../report-form/report-form.module').then( m => m.ReportFormPageModule)
  },
  
  {
    path: 'edit/:report',
    loadChildren: () => import('../report-form/report-form.module').then( m => m.ReportFormPageModule)
  }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigReportsPageRoutingModule {}
