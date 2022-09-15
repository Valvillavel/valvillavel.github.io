import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportConfigListPageRoutingModule } from './report-config-list-routing.module';

import { ReportConfigListPage } from './report-config-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportConfigListPageRoutingModule
  ],
  declarations: [ReportConfigListPage]
})
export class ReportConfigListPageModule {}
