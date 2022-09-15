import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AddCustomerPageRoutingModule } from './add-edit-entity-routing.module';
import { AddCustomerPage } from './add-edit-entity.page';
import { EngineService } from 'src/app/services/engine.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AddCustomerPageRoutingModule,
    TranslateModule,
    IonicSelectableModule
  ],
  declarations: [AddCustomerPage],
  providers:[EngineService]
})
export class AddCustomerPageModule {}
