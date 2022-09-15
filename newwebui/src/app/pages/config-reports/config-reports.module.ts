import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { EngineService } from 'src/app/services/engine.service';
import { IonicModule } from '@ionic/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ConfigReportsPageRoutingModule } from './config-reports-routing.module';
import { DataTableComponent} from'../../components/data-table/data-table.component'
import { ConfigReportsPage } from './config-reports.page';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({ 
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigReportsPageRoutingModule,
    NgxDatatableModule,
    TranslateModule,
  ],
  declarations: [ConfigReportsPage, 
    DataTableComponent
  ],
  providers:[EngineService],
})
export class ConfigReportsPageModule {}
