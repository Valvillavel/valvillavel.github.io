// @ts-check
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
/**
 * @ignore
 */
@Component({
  selector: 'app-inspections-grid',
  templateUrl: './inspections-grid.component.html',
  styleUrls: ['./inspections-grid.component.scss'],
})
export class InspectionsGridComponent implements OnInit {
  /**
   * language list
   * @type {Array}
   */
  langs:string[]=[];
  /**
   * inspection id
   * @type {Object}
   */
  inspectionId:any;
  /**
   * 
   * @param translate {TranslateService}
   * @param routeinf {ActivatedRoute}
   * @param router {Router}
   */
  constructor(
    public translate:TranslateService,
    private routeinf:ActivatedRoute,
    private router:Router,
  ) {
  }

  /**
   * init 
   * @property {Function}
   */
  ngOnInit(){
    this.langs=this.translate.getLangs();
    this.inspectionId=this.routeinf.snapshot.paramMap.get('id');
  }
  /**
   * change language
   * @param event {Event}
   */
  changeLanguage(event: { detail: { value: any; }; }){
    this.translate.use(event.detail.value); 
  }
  /**
   * 
   * @param ambient {Object}
   * @param system {Object}
   */
  redirectTo(ambient: any,system: any){
    let navigationExtras:NavigationExtras={
      state:{
        config:{ambient:ambient, system:system, proposalId: this.inspectionId},
      }
    }
   this.router.navigateByUrl("work-orders/inspections/fillReportItem",navigationExtras)
  }
  
}
