import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InspectionsGridComponent } from '../inspections-grid/inspections-grid.component';
import { InspectionsItemComponent } from '../inspections-item/inspections-item.component';
import { LoginComponent } from '../login/login.component';
import { ProposalItemComponent } from '../proposal-item/proposal-item.component';
import { ProposalsPage } from '../proposals/proposals.page';
import { SignupComponent } from '../signup/signup.component';

import { WorkOrdersPage } from './work-orders.page';

const routes: Routes = [
  {
    path: '',
    component: WorkOrdersPage
  },
  {
    path:'edit',
    loadChildren: () => import('../add-work-order/add-work-order.module').then( m => m.AddWorkOrderPageModule)
  }
  ,
  {
    path:'add',
    loadChildren: () => import('../add-work-order/add-work-order.module').then( m => m.AddWorkOrderPageModule)
  },
  {
    path: 'fillProposal/:id',
    loadChildren: () => import('../proposals/proposals.module').then( m => m.ProposalsPageModule)
  },
  {
    path:'fillReport/:id',
    component: InspectionsGridComponent
  },
  {
    path:'fillReportItem',
    component: InspectionsItemComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkOrdersPageRoutingModule {}
