// @ts-check
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EngineService } from 'src/app/services/engine.service';
/**
 * @ignore
 */
@Component({
  selector: 'app-inspections-item',
  templateUrl: './inspections-item.component.html',
  styleUrls: ['./inspections-item.component.scss'],
})
export class InspectionsItemComponent implements OnInit {
  /**
   * language list
   * @type {Array}
   */
  langs:string[]=[];
  /**
   * file data
   * @type {Object}
   */
  file:any;
  /**
   * config data
   * @type {Object}
   */
  config:any;
  /**
   * 
   * @param activeRoute {ActivatedRoute}
   * @param formBuilder {FormBuilder}
   * @param router {Router}
   * @param engineService {EngineService}
   * @param translate {TranslateService}
   */
  constructor(
    private activeRoute: ActivatedRoute,
    private formBuilder:FormBuilder,
    private router:Router,
    private engineService:EngineService,
    public translate:TranslateService,
  ) { }
  /**
   * inspection form 
   * @property {Object}
   */
  inspectionForm=this.formBuilder.group({
    inspectionId: ["",],
    typeMaterial:["",],
    material:[false,],
    mat:["",],
    system:["",],
    ambient:["",],
    reportText:["",],
    actions:["",],
    image: ["",],
  })
  /**
   * init 
   * @property {Function}
   */
  ngOnInit() {
    var txt = document.getElementById("typeMaterial");
    this.langs=this.translate.getLangs();
    if(this.router.getCurrentNavigation().extras.state){
      this.config=this.router.getCurrentNavigation().extras.state.config;
    } 
    this.inspectionForm.get('typeMaterial').setValue(document.getElementById("typeMaterial").innerText)
    var x=document.getElementById("typeMaterial")as HTMLInputElement
  }
  /**
   * 
   * @param event {Event}
   */
  loadImageFromDevice(event: { target: { files: string | any[]; }; }):any {
    if(event.target.files && event.target.files.length>0){
      const file=event.target.files[0];
      if(file.type.includes("image")){
        const reader= new FileReader()
        reader.readAsDataURL(file);
        reader.onload= function load(){
        }.bind(this);
        this.file=file;
      }else{
        console.log("there was an error");
      }
    }
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
   * @param inspection {Object}
   * @param formDirective {FormGroupDirective}
   */
  saveInspection(inspection: any, formDirective:FormGroupDirective){
    const data= new FormData()
    data.append('data',JSON.stringify(inspection))
    data.append('files.defaultImagePath',this.file)
    this.engineService.postInspectionOptions(data)
    .subscribe(r=>{
      formDirective.resetForm();
      this.router.navigate(['/inspection-options'])
    })  
  }
}
