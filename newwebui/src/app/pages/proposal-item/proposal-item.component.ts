// @ts-check
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EngineService } from 'src/app/services/engine.service';
/**
 * @ignore
 */
@Component({
  selector: 'app-proposal-item',
  templateUrl: './proposal-item.component.html',
  styleUrls: ['./proposal-item.component.scss'],
})
export class ProposalItemComponent implements OnInit {
  @Output() proposalEvent= new EventEmitter<string>();
  /**
   * language list
   * @type {Array}
   */
  langs:string[]=[];
  /**
   * list items
   * @type {Object}
   */
  items: object=[{type:"dropdownoptions",text:'patio'},
  {type:"dropdownoptions",text:'retainit wall < 3ft height'},
  {type:"dropdown-option",text:'retainit wall > 3ft height'},
  {type:"dropdown-option",text:'sidewalks'}];
  /**
   * item filtered
   * @type {Array}
   */
  itemsFiltered: Array<any>=[];
  /**
   * dropdown options
   * @type {Array}
   */
  optionsDropdown: Array<any>=[];
  /**
   * checkbox options
   * @type {Array}
   */
  checkboxoptions: Array<any>=[];
  /**
   * input options
   * @type {Array}
   */
  inputoptions: Array<any>=[];
  /**
   *radiobuttons options
   * @type {Array}
   */
  radiobuttonoptions: Array<any>=[];
  /**
   * sides options
   * @type {Array}
   */
  sides: Array<any>=[];
  /**
   * Config
   * @type {Object}
   */
  config:any;
  /**
   * all items
   * @type {Object}
   */
  allItems:any;
  /**
   * list entity
   * @type {Object}
   */
  list:[];
  /**
   * error
   * @type {Boolean}
   */
  error: boolean;
  /**
   * proposal id
   * @type {Object}
   */
  proposalId:any;
  /**
   * prop id 
   * @type {Object}
   */
  idProp:any;
  /**
   * if have high
   * @type {Boolean}
   */
  high:boolean;
  /**
   * if have width
   * @type {Boolean}
   */
  width:boolean;
  /**
   * if have long
   * @type {Boolean}
   */
  long:boolean;
  /**
   * if have all
   * @type {Boolean}
   */
  all:boolean;
  /**
   * if have lis elec 
   * @type {Boolean}
   */
  listElec:boolean;

  /**
   * 
   * @param translate {TranslateService}
   * @param router {Router}
   * @param engineService {EngineService}
   */
  constructor(
    private translate:TranslateService,
    private router:Router,
    private engineService:EngineService,
  ) { }
  /**
   * proposal data
   * @public
   * @type {Array}
   */
  public proposaldata:Array<any>=[];
  /**
   * proposal data
   * @public
   * @type {Array}
   */
  public proposalvalue:Array<any>=[];
  /**
   * data
   * @type {Object}
   */
  data:any;
  /**
   * proposal data
   * @public
   * @type {Object}
   */
  public itemDrop: object={
    proposal:'',
    system:'',
    ambient:'',
    dataSelected:{
      name:'',
      material:'',
      steps:'',
      isSteps:false,
    },
    image:''
  }
  /**
   * proposal data
   * @public
   * @type {Object}
   */
  public itemvalue: object = {
    proposal:'',
    system:'',
    ambient:'',
    dataSelected:{
      name:'',
      width:'',
      high:'',
      long:'',
      isFooting:false,
      isSumdump:false,
      choice: '',
      outletForSumpPump:false,
      moveHVAC:false,
      modifications:false,
      sides:'',
      isChecked:false,
    },
    
  };
  /**
   * init 
   * @property {Function}
   */
  ngOnInit(){
    this.langs=this.translate.getLangs();
    if(this.router.getCurrentNavigation().extras.state){
      this.config=this.router.getCurrentNavigation().extras.state.config;
      this.allItems=this.config.items
      this.proposalId=this.config.proposalId
      this.orderBy(this.config.ambient, this.config.system)
    } 
    
  }
  /**
   * add item
   * @param event {Event}
   */
  addItemvalue(event:Event) {
    const newItem=(event as CustomEvent<any>).detail;
    var ex=false;
      if(this.proposaldata.length==0){
        this.proposaldata.push(newItem)
      }else{this.proposaldata.map(item=>{
        if(newItem.dataSelected===item.dataSelected){
          ex=true;
        }
      })
      if(ex===false){
        this.proposaldata.push(newItem);
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
   * Add item 
   * @param item {Object}
   */
  addItem(item: any){
    this.itemsFiltered.push(item)
  }
  /**
   * 
   * @param ambient {String}
   * @param system {String}
   */
  orderBy(ambient: string,system: string){
    this.allItems.map(item=>{
      if (ambient.toLowerCase()==item.ambient.toLowerCase() && system.toLowerCase()==item.system.toLowerCase()){
        this.optionsDropdown=[];this.checkboxoptions=[];this.inputoptions=[];this.radiobuttonoptions=[];this.sides=[]
        item.options.map(option=>{
          
          if(option.type=='dropdownoption'){
            this.optionsDropdown.push(option.text)
          }
          if(option.type=='checkbox'){
            this.checkboxoptions.push(option.text)
          }
          if(option.type=='input-number'){
            this.inputoptions.push(option.text)
          }
          if(option.type=='radiobutton'){
            this.radiobuttonoptions=option.options
          }
          if(option.type=='sideselector'){
            item['sides']=option.choice
          }
        })
        item['dropdownoptions']=this.optionsDropdown
        item['checkboxoptions']=this.checkboxoptions
        item['inputoptions']=this.inputoptions
        item['radiobuttonoptions']=this.radiobuttonoptions
        
        this.itemsFiltered.push(item)
        
      }
    })
  }
  /**
   * save dropdown selection
   * @param event {Event}
   */
  saveDrop(event:Event){
    const e=(event as CustomEvent<any>).detail;
    const data=new FormData()
    data.append('data',JSON.stringify(e))
    data.append('files.image',e.image)
    this.engineService.postProposalOptions(data)
    .subscribe(r =>{
    })
  }
  /**
   * Save proposal selection
   * @param system {String}
   * @param ambient {String}
   */
  saveProposal(system: string, ambient: string){
    if(system=="Hardsacape"){
      this.router.navigate(['/proposals/fillProposal',this.proposalId]);
    }
    this.proposaldata.map(data =>{
      for(var atribute in data.dataSelected){
        if(data.dataSelected[atribute]==""){
          delete data.dataSelected[atribute]
        }
      };
    })
    if(ambient=="Foundation wall" && system=="Drainage"){
      localStorage.setItem('value2',JSON.stringify(this.proposaldata))
    }
    if(ambient=="Foundation wall" && system=="Structure"){
      localStorage.setItem('value3',JSON.stringify(this.proposaldata))
    }
    if(ambient=="Foundation wall" && system=="HVAC/Electric"){
      localStorage.setItem('value4',JSON.stringify(this.proposaldata))
    }
    if(ambient=="Rear yard" && system=="Drainage"){
      localStorage.setItem('value6',JSON.stringify(this.proposaldata))
    }
    if(ambient=="Rear yard" && system=="HVAC/Electric"){
      localStorage.setItem('value7',JSON.stringify(this.proposaldata))
    }
    if(ambient=="Front yard" && system=="Drainage"){
      localStorage.setItem('value9',JSON.stringify(this.proposaldata))
    }
    if(ambient=="Front yard" && system=="HVAC/Electric"){
      localStorage.setItem('value10',JSON.stringify(this.proposaldata))
    }
    if(ambient=="Right yard" && system=="Drainage"){
      localStorage.setItem('value12',JSON.stringify(this.proposaldata))
    }
    if(ambient=="Right yard" && system=="HVAC/Electric"){
      localStorage.setItem('value13',JSON.stringify(this.proposaldata))
    }
    if(ambient=="Left yard" && system=="Drainage"){
      localStorage.setItem('value15',JSON.stringify(this.proposaldata))
    }
    if(ambient=="Left yard" && system=="HVAC/Electric"){
      localStorage.setItem('value16',JSON.stringify(this.proposaldata))
    }
    if(ambient=="Driveway" && system=="Drainage"){
      localStorage.setItem('value17',JSON.stringify(this.proposaldata))
    }
    if(ambient=="Down spout extensions" && system=="Drainage"){
      localStorage.setItem('value18',JSON.stringify(this.proposaldata))
    }
    this.proposalvalue.push(JSON.parse(localStorage.getItem('value2')))
    this.proposalvalue.push(JSON.parse(localStorage.getItem('value3')))
    this.proposalvalue.push(JSON.parse(localStorage.getItem('value4')))
    this.proposalvalue.push(JSON.parse(localStorage.getItem('value6')))
    this.proposalvalue.push(JSON.parse(localStorage.getItem('value7')))
    this.proposalvalue.push(JSON.parse(localStorage.getItem('value9')))
    this.proposalvalue.push(JSON.parse(localStorage.getItem('value10')))
    this.proposalvalue.push(JSON.parse(localStorage.getItem('value12')))
    this.proposalvalue.push(JSON.parse(localStorage.getItem('value13')))
    this.proposalvalue.push(JSON.parse(localStorage.getItem('value15')))
    this.proposalvalue.push(JSON.parse(localStorage.getItem('value16')))
    this.proposalvalue.push(JSON.parse(localStorage.getItem('value17')))
    this.proposalvalue.push(JSON.parse(localStorage.getItem('value18')))
    var fil=this.proposalvalue.filter(Boolean)
    this.goPorposal(fil);
  }
  /**
   * Go page proposal
   * @param value {Object}
   */
  goPorposal(value:any){
    this.engineService.sendProposalSource(value);
    this.router.navigate(['/proposals/fillProposal',this.proposalId]);
  }

}

