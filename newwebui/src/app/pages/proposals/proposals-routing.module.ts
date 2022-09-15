import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProposalItemComponent } from '../proposal-item/proposal-item.component';

import { ProposalsPage } from './proposals.page';

const routes: Routes = [
  {
  path: '',
  component: ProposalsPage
  },
  {
    path:'fillProposalItem',
    component: ProposalItemComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, TranslateModule],
})
export class ProposalsPageRoutingModule {}
