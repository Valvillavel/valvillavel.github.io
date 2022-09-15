import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkOrdersMenuPageRoutingModule } from './work-orders-menu-routing.module';

import { WorkOrdersMenuPage } from './work-orders-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkOrdersMenuPageRoutingModule
  ],
  declarations: [WorkOrdersMenuPage]
})
export class WorkOrdersMenuPageModule {}
