import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkOrdersPageRoutingModule } from './work-orders-routing.module';
import { WorkOrdersPage } from './work-orders.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { DataTableComponent} from'../../components/data-table/data-table.component';
import { EngineService } from 'src/app/services/engine.service';
import { InspectionsGridComponent } from '../inspections-grid/inspections-grid.component';
import { InspectionsItemComponent } from '../inspections-item/inspections-item.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkOrdersPageRoutingModule,
    NgxDatatableModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [
    WorkOrdersPage,
    DataTableComponent,
    InspectionsGridComponent,
    InspectionsItemComponent
  ],
  providers:[EngineService]
})
export class WorkOrdersPageModule {}
