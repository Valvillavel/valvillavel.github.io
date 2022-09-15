import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { CalModalPage } from '../cal-modal/cal-modal.page';
import { formatDate } from '@angular/common';
import { CalendarMode } from 'ionic2-calendar/calendar';
import { CalModalPageModule } from '../cal-modal/cal-modal.module';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
/**
 * @ignore
 */
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  /**
   * All events data
   * @type {Array}
   */
  allEvents: Array<any> = [];
  /**
   * Month name
   * @type {String}
   */
  currentMonth: string;
  /**
   * All languages
   * @type {Array<String>}
   */
  langs:string[]=[];
  /**
   * Calendar object
   * @type {{mode: CalendarMode, currentDate: Date, locale: string}}
   */
  calendar: { mode: CalendarMode; currentDate: Date; locale: string; } = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
    locale: 'en-GB'
  };
  /**
   * date selected
   * @type {Date}
   */
  selectedDate: Date;
  /**
   * New event object
   * @type {{title: string, description:string, startTime:string, endTime:string }}
   */
  newEvent: any={
    title:'',
    description:'',
    startTime:'',
    endTime:'',
  } 
  /**
   * If add event
   * @type {Boolean}
   */
  showAddEvent: boolean;
  @ViewChild(CalendarComponent) myCal:CalendarComponent;
  myData=[
    {
      title:"My firts event",
      description:"My first description",
      startTime:new Date(2022,1,22,12,11,11),
      endTime:new Date(2022,1,22,12,11,11),
    }
  ]
  /**
   * Constructor
   * @param alertCtrl {AlertController}
   * @param locale {string}
   * @param modalCtrl {ModalController}
   * @param router {Router}
   * @param translate {TranslateService}
   */
  constructor(
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private modalCtrl: ModalController,
    private router:Router,
    private translate:TranslateService,
  ) { }
  /**
   * init 
   * @property {Function}
   */
  ngOnInit() {
   this.allEvents=this.myData;
  }
  /**
   * change language
   * @param event {Event}
   */
  changeLanguage(event: { detail: { value: any; }; }){
    this.translate.use(event.detail.value); 
  }
  /**
   * next moth
   * @property {Function}
   */
  next(){
    this.myCal.slideNext();
  }
  /**
   * back month 
   * @property {Function}
   */
  back(){
    this.myCal.slidePrev();
  }
  /**
   * Change mopnth name
   * @param title {String}
   */
  onViewTitleChanged(title:string){
    this.currentMonth = title;
  }
  /**
   * Event selected
   * @param ev {Object}
   * @returns 
   */
  async onEventSelected(ev: any){
    this.newEvent=ev;
    const modal= await this.modalCtrl.create({
      component:CalModalPage,
      componentProps: ev
    });
    return await modal.present();
  }
  /**
   * @property {Function}
   */
  removeEvents(){
    this.allEvents = [];
  }
  /**
   * @property {Function}
   */
  showHideForm(){
    this.showAddEvent=!this.showAddEvent;
    this.newEvent={
      title:'',
      description:'',
      startTime:new Date().toISOString(),
      endTime:new Date().toISOString(),
    }
  }
  /**
   * @property {Function}
   */
  today(){
    this.calendar.currentDate=new Date();
  }
  /**
   * 
   * @param mode 
   */
  changeMode(mode: any){
    this.calendar.mode=mode;
  }
  /**
   * @property {Function}
   */
  addEvent(){
    this.allEvents.push({
      title:this.newEvent.title,
      description:this.newEvent.description,
      startTime:new Date(this.newEvent.startTime),
      endTime:new Date(this.newEvent.endTime),
    });
    this.newEvent.title='';
    this.newEvent.description='';
    this.newEvent.startTime=new Date().toISOString();
    this.newEvent.endTime=new Date().toISOString();
  } 
  
}
