import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportConfigListPage } from './report-config-list.page';

const routes: Routes = [
  {
    path: '',
    component: ReportConfigListPage
  },
  {
    path: ':report',
    loadChildren: () => import('../config-reports/config-reports.module').then( m => m.ConfigReportsPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportConfigListPageRoutingModule {}
