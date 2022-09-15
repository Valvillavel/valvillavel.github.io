import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { InspectionsGridComponent } from './pages/inspections-grid/inspections-grid.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'add-workOrder',
    loadChildren: () => import('./pages/add-work-order/add-work-order.module').then( m => m.AddWorkOrderPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./pages/calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'cal-modal',
    loadChildren: () => import('./pages/cal-modal/cal-modal.module').then( m => m.CalModalPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'entities',
    loadChildren: () => import('./pages/entities-list/entities-list.module').then(m => m.EntitiesListPageModule)
  },
  {
    path: 'config',
    loadChildren: () => import('./pages/report-config-list/report-config-list.module').then( m => m.ReportConfigListPageModule)
  },
  {
    path: 'work-orders',
    loadChildren: () => import('./pages/work-orders-menu/work-orders-menu.module').then( m => m.WorkOrdersMenuPageModule)
  },
  




  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
