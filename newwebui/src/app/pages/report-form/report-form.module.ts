import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EngineService } from 'src/app/services/engine.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ReportFormPageRoutingModule } from './report-form-routing.module';
import { ReportFormPage } from './report-form.page';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportFormPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicSelectableModule 
  ],
  declarations: [ReportFormPage],
  providers: [EngineService]
})
export class ReportFormPageModule {}
