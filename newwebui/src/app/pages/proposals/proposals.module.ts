import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProposalsPageRoutingModule } from './proposals-routing.module';

import { ProposalsPage } from './proposals.page';
import { TranslateModule } from '@ngx-translate/core';
import { ProposalItemComponent } from '../proposal-item/proposal-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProposalsPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ProposalsPage,
    ProposalItemComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProposalsPageModule {}
