import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntitiesPage } from './entities.page';

const routes: Routes = [
  {
    path: '',
    component: EntitiesPage
  },
  {
    path: 'add/:entity',
    loadChildren: () => import('../add-edit-entity/add-edit-entity.module').then( m => m.AddCustomerPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('../add-edit-entity/add-edit-entity.module').then( m => m.AddCustomerPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntitiesPageRoutingModule {}
