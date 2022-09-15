// @ts-check
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EngineService } from 'src/app/services/engine.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { IonicSelectableComponent } from 'ionic-selectable';
/**
 * @ignore
 */
@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.page.html',
  styleUrls: ['./report-form.page.scss'],
})
export class ReportFormPage implements OnInit {
  /**
   * data received to edit a report
   * @type {Object} 
   */
  report:any;
  /**
   * All the reports data
   * @type {Array} 
   */
  listReports:any[]=[];
  /**
   * to see if the form will be to edit or add a new report
   * True - to edit data 
   * False - to add a new report
   * @type {Boolean} 
   */
  editing=false;
  /**
   * save the Data received to edit
   * @type {Object}
   */
  reportData:any;
  /**
   * save all the systems data of API
   * @type {Array}
   */
  syss:[];
  /**
   * save all the subsystem data of API
   * @type {Array}
   */
  subs:[];
  /**
  *all the languages available
  @type {Array}
  */
  langs:string[]=[];
  /**
   * Data of report image
   * @type {Object}
   */
  file:any;
  /**
   * Path of report image by default
   * @type {String}
   */
  image:any="../../assets/imgs/no-image-icon-6.png";
  systemSelected:any;
  subsystemSelected:any;
/**
 * Initialization of variables of some tools used
 * @param activeRoute -provide access to data in the route
 * @param formBuilder -build a reactive form
 * @param router -service to navigate among URL's
 * @param engineService - service to receive API data
 * @param translate - Service to conect the different languages
 */
  constructor(
    private activeRoute: ActivatedRoute,
    private formBuilder:FormBuilder,
    private router:Router,
    private engineService:EngineService,
    private translate:TranslateService,
  ) {;
  } 
/**
 * Reactive form with all the register fields in the form 
 * @type {FormBuilder}
 */
  reportForm=this.formBuilder.group({
      name:["",Validators.required],
      order:["",],
      system:["",],
      subsystem:["",],
      actions:["",],
      actionLabel:["",],
      reportText:["",],
      defaultImagePath: ["",],
  })
/**
 * Init of the component
 */
  ngOnInit() {  
    this.langs=this.translate.getLangs();  
    this.report=this.activeRoute.snapshot.params.report;
    this.getSystem();
    this.getSubsystem();
    if(this.router.getCurrentNavigation().extras.state){
      this.reportData=this.router.getCurrentNavigation().extras.state.report;
      this.editing=true;
    } 
    if( this.editing==true){
      this.updateReportData()
    }
    
  }
  /**
   * Change languages
   * @param event 
   */
  changeLanguage(event){
    this.translate.use(event.detail.value); 
  }
  /**
   * Update data of report with values entering in the form
   */
  updateReportData(){
    if(this.report=='ambients'){
      this.reportForm.get('name').setValue(this.reportData?.name)
      this.reportForm.get('order').setValue(this.reportData?.order)
    }
    if(this.report=='systems'){
      this.reportForm.get('name').setValue(this.reportData?.name)
    }
    if(this.report=='subsystems'){
      this.systemSelected = this.reportData?.system
      this.reportForm.get('system').setValue(this.reportData?.system)
      this.reportForm.get('name').setValue(this.reportData?.name)
    }
    if(this.report=='items'){
      this.systemSelected = this.reportData?.system
      this.subsystemSelected = this.reportData?.subsystem
      this.reportForm.get('system').setValue(this.reportData?.system)
      this.reportForm.get('subsystem').setValue(this.reportData?.subsystem)
      this.reportForm.get('name').setValue(this.reportData?.name)
      this.reportForm.get('actions').setValue(this.reportData?.actions)
      this.reportForm.get('actionLabel').setValue(this.reportData?.actionLabel)
      this.reportForm.get('reportText').setValue(this.reportData?.reportText)
      this.reportForm.get('defaultImagePath').setValue(this.reportData?.defaultImage?.url)
      this.image="http://localhost:1337"+this.reportData?.defaultImage
    }

  }
  /**
   * save the report data in API
   * @param report 
   * @param formDirective 
   */
  saveReport(report,formDirective:FormGroupDirective){
    if(this.report=='items'){
      const data= new FormData()
        data.append('data',JSON.stringify(report))
        data.append('files.defaultImagePath',this.file)
        this.engineService.postReports(this.report,data)
        .subscribe(r=>{
          formDirective.resetForm();
          this.router.navigate(['/config',this.report])
        })
    }else{
    this.engineService.postReports(this.report,report)
      .subscribe(r=>{
        formDirective.resetForm();
        this.router.navigate(['/config',this.report])
      })
    }
    
  }
  /**
   * update the report with data modified in the form
   * @param report - form data
   * @param formDirective - form directive to reset form
   */
  editReport(report,formDirective:FormGroupDirective){
    if(this.report=='items'){
      const data= new FormData()
        data.append('data',JSON.stringify(report))
        if(this.file!=""){
        data.append('files.defaultImagePath',this.file)
        } 
        this.engineService.updateReports(this.report,this.reportData.id,data)
        .subscribe(r=>{
          formDirective.resetForm();
          this.router.navigate(['/config',this.report])
        })
    }else{
    this.engineService.updateReports(this.report,this.reportData.id,report)
      .subscribe(r=>{
        formDirective.resetForm();
        this.editing=false
        this.router.navigate(['/config',this.report])
      })
    }
  }
  /**
   * get method to receive all systems data from API
   */
  getSystem(){
    this.engineService.getSystems()
    .subscribe(res=>{
      this.syss=res;
    })
  }
  systemChange(event: {component: IonicSelectableComponent, value: any }){
    this.reportForm.get('system').setValue(event.value.id);
    this.systemSelected=event.value.id
  }
  /**
   * get method to receive all sub systems data from API
   */
  getSubsystem(){
    this.engineService.getSubsystems()
    .subscribe(re=>{
      this.subs=re;
    })
  }
  subystemChange(event: {component: IonicSelectableComponent, value: any }){
    this.reportForm.get('subsystem').setValue(event.value.id);
    this.subsystemSelected=event.value.id
  }
  /**
   * to obtain the data of the new file loaded
   * @param event 
   */
  captureFile(event):any{
    if(event.target.files && event.target.files.length>0){
      const file=event.target.files[0];
      if(file.type.includes("image")){
        const reader= new FileReader()
        reader.readAsDataURL(file);
        reader.onload= function load(){
          this.image=reader.result;
        }.bind(this);
        this.file=file;
      }else{
        console.log("there was an error");
      }
    }
  }
 
}
