import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { CalendarPageRoutingModule } from './calendar-routing.module';
import { CalendarPage } from './calendar.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { CalModalPageModule } from '../cal-modal/cal-modal.module';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { CalModalPage } from '../cal-modal/cal-modal.page';
registerLocaleData(localeDe);
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    NgCalendarModule,
    CalModalPageModule,
    TranslateModule,
  ],
  declarations: [CalendarPage],
  providers:[
    {provide: LOCALE_ID, useValue: 'de-DE'}
  ]
})
export class CalendarPageModule {}
