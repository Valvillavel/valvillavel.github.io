import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IonicSelectableModule } from 'ionic-selectable';
import { EntitiesPageRoutingModule } from './entities-routing.module';
import { EngineService } from 'src/app/services/engine.service';
import { EntitiesPage } from './entities.page';
import { DataTableComponent} from'../../components/data-table/data-table.component'
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntitiesPageRoutingModule,
    NgxDatatableModule,
    TranslateModule,
    IonicSelectableModule
  ],
  declarations: [
    EntitiesPage,
    DataTableComponent
  ],
  providers:[EngineService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class EntitiesPageModule {}
