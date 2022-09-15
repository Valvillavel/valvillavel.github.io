// @ts-check
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { EngineService } from 'src/app/services/engine.service';  
import { TranslateService } from '@ngx-translate/core';
/**
 * @ignore
 */
@Component({
  selector: 'app-config-reports',
  templateUrl: './config-reports.page.html',
  styleUrls: ['./config-reports.page.scss'],
})
export class ConfigReportsPage implements OnInit {
  /**
   * if is proposal
   * @type {Boolean}
   */
  prop: boolean=false;
  /**
   * if is inspection
   * @type {Boolean}
   */
  insp: boolean=false;
  /**
   * if have contract
   * @type {Boolean}
   */
  contract: boolean=false;
  /**
   * Report item
   * @type {Object}
   */
  report: any;
  /**
   * Column data
   * @type {Array}
   */
  columns: Array<any>=[];
  /**
   * list report
   * @type {Object}
   */
  list:any;
  /**
   * Report selected
   * @type {Object}
   */
  reportsSelected:any;
  /**
   * error
   * @type {Boolean}
   */
  error: boolean=false;
  /**
   * language list
   * @type {Array}
   */
  langs:string[]=[];
  /**
   * 
   * @param activeRoute {ActivatedRoute}
   * @param engineService {EngineService}
   * @param router {Router}
   * @param translate {TranslateService}
   */
  constructor(
    public activeRoute: ActivatedRoute,
    public engineService: EngineService,
    private router: Router,
    private translate: TranslateService,
  ) { }
    /**
   * init 
   * @property {Function}
   */
  ngOnInit() {
    this.langs=this.translate.getLangs();
    this.report=this.activeRoute.snapshot.params.report;
    this.loadDataReports();
    if(this.report=='ambients'){
      this.columns=["Name","Order"]; 
    }
    if(this.report=='systems'){
      this.columns=["Name"]; 
    }
    if(this.report=='subsystems'){
      this.columns=["System", "Name"]; 
    }
    if(this.report=='items'){
      this.columns=["System", "Subsystem",  "Name",  "Report Text", "Actions", "Action Label", "Default Image" ]; 
    }
  } 
  /**
   * Load data on datatable
   * @property {Function}
   */  
  ionViewWillEnter(){
    this.loadDataReports() 
  }
  /**
   * cgange language
   * @param event {Event}
   */
  changeLang(event: { detail: { value: string; }; }){
    this.translate.use(event.detail.value);
  }
  /**
   * @property {Function}
   */
  loadDataReports(){
    if(this.report=='ambients'|| this.report=='systems'){
      this.engineService.getReports(this.report).subscribe(reports=>{
        this.list=reports
        this.error=false;
      },()=>{
        this.error=true;
        this.list=[];
      })
    } 
    if(this.report=='items'){
      this.engineService.getReports(this.report).subscribe(reports=>{
        this.list=reports;
        var newList=[];
        this.list.map(item=>{
          item['system']=item.system?.name
          item['subsystem']=item.subsystem?.name
          item['name']=item.name
          item['defaultImage']=item.defaultImagePath?.url
          newList.push(item)
        })
        this.error=false;
      },()=>{
        this.error=true;
        this.list=[];
      })
    }  
    if(this.report=='subsystems'){
      this.engineService.getReports(this.report).subscribe(reports=>{
        this.list=reports; 
        var newList=[];
        this.list.map(item=>{
          item['system']=item.system?.name
          item['name']=item.name
          newList.push(item)
        })
        this.error=false;
      },()=>{
        this.error=true;
        this.list=[];
      })
    }  
  }
  /**
   * Report selected
   * @param dataSelected {Object}
   */
  getReportSelected(dataSelected: any){
    this.reportsSelected=dataSelected
  }
  /**
   * Delete data selected
   *  @property {Function}
   */
  deleteData(){
    this.reportsSelected?.map(report=>{
      this.engineService.deleteReports(this.report,report.id).subscribe(res=>{
        this.reportsSelected=[]
        this.ionViewWillEnter()
      })
    })
    
  }
  /**
   * Open edit form
   *  @property {Function}
   */
  openEditForm(){
    let navigationExtras:NavigationExtras={
      state:{
        report:this.reportsSelected[this.reportsSelected.length -1],
        
      }
    }
    this.router.navigate(['/add',this.report])
    this.router.navigateByUrl("/config/"+this.report+"/edit/"+this.report,navigationExtras)
  } 

}
