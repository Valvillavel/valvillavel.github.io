import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular'
import { IonicModule } from '@ionic/angular';
import { AddWorkOrderPageRoutingModule } from './add-work-order-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { AddWorkOrderPage } from './add-work-order.page';
import { EngineService } from 'src/app/services/engine.service';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CKEditorModule,
    AddWorkOrderPageRoutingModule,
    TranslateModule,
    IonicSelectableModule
  ],
  declarations: [AddWorkOrderPage],
  providers:[EngineService]
})
export class AddWorkOrderPageModule {}
