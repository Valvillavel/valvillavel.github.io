// @ts-check
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
/**
 * @ignore
 */
@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})
export class CalModalPage implements OnInit {
  /**
   * Date title
   * @type {String}
   */
  title:string;
  /**
   * Date description
   * @type {String}
   */
  description: string;
  /**
   * Date start time
   * @type {String}
   */
  startTime:string;
  /**
   * Date end time
   * @type {String}
   */
  endTime:string;
/**
 * 
 * @param modalCtrl {ModalController}
 * @param navParams {NavParams}
 */
  constructor(
    private modalCtrl:ModalController,
    public navParams:NavParams,
  ) 
  {
    this.title = navParams.get('title');
    this.description = navParams.get('description');
    this.startTime = navParams.get('startTime');
    this.endTime = navParams.get('endTime');
  }
  /**
   * init 
   * @property {Function}
   */
  ngOnInit() {  
  }
  /**
   * Close modal 
   * @property {Function}
   */
  close(){
    this.modalCtrl.dismiss();
  }
  

}
