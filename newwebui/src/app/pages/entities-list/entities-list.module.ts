import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntitiesListPageRoutingModule } from './entities-list-routing.module';

import { EntitiesListPage } from './entities-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntitiesListPageRoutingModule
  ],
  declarations: [EntitiesListPage]
})
export class EntitiesListPageModule {}
