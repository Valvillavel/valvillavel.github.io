import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntitiesListPage } from './entities-list.page';

const routes: Routes = [
  {
    path: '',
    component: EntitiesListPage
  },
  {
    path:':entity',
    loadChildren: () => import('../entities/entities.module').then( m => m.EntitiesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntitiesListPageRoutingModule {}
