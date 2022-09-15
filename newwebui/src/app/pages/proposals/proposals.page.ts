// @ts-check
import { Component, EventEmitter, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EngineService, Proposal } from 'src/app/services/engine.service';
import { ProposalItemComponent } from '../proposal-item/proposal-item.component';
/**
 * @ignore
 */
@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.page.html',
  styleUrls: ['./proposals.page.scss'],
})
export class ProposalsPage implements OnInit {
  /**
   * language list
   * @type {Array}
   */
  langs:string[]=[];
  /**
   * list items
   * @type {Array}
   */
  items: Array<any>=[{type:"dropdown-option",text:'patio'},
  {type:"dropdown-option",text:'retainit wall < 3ft height'},
  {type:"dropdown-option",text:'retainit wall > 3ft height'},
  {type:"dropdown-option",text:'sidewalks'}];
  /**
   * item 1
   * @type {Array}
   */
  items1: Array<any>=[];
  /**
   * item 2
   * @type {Array}
   */
  items2: Array<any>=[];
  /**
   * item 3
   * @type {Array}
   */
  items3: Array<any>=[];
  /**
   * item 4
   * @type {Array}
   */
  items4: Array<any>=[];
  /**
   * All items list
   * @type {Object}
   */
  allItems:any;
  /**
   * Grids
   * @type {Object}
   */
  grids:any;
  /**
   * proposal id
   * @type {Object}
   */
  proposalId:any;
  /**
   * item body
   * @public
   */
  public itemBody={
    proposal:'',
    system:'',
    ambient:'',
    dataSelected:{},
  }

  /**
   * 
   * @param translate {TranslateService}
   * @param router {Router}
   * @param engineService {EngineService}
   * @param service {EngineService}
   * @param routeinf {ActivatedRoute}
   */
  constructor(
    private translate:TranslateService,
    private router:Router,
    private engineService:EngineService,
    private service: EngineService,
    private routeinf:ActivatedRoute
  ) {}
  /**
   * @type {Object}
   */
  public proposal:any;
  
  /**
   * init 
   * @property {Function}
   */
  ngOnInit(){
    this.loadProposalItems()
    this.langs=this.translate.getLangs();
    this.proposalId=this.routeinf.snapshot.paramMap.get('id');
    this.filterData()
    this.engineService.$getProposalSource.subscribe(data => {
      this.proposal= data });
  }
  /**
   * 
   * @param changes {SimpleChanges}
   */
  ngOnChanges(changes: SimpleChanges) {
    this.grids = changes.grids.currentValue;
  }
  /**
   * change language
   * @param event {Event}
   */
  changeLanguage(event){
    this.translate.use(event.detail.value); 
  }
  /**
   * Add item 
   * @param item {Object}
   */
  addItem(item){
    this.items.push({type:"dropdown-option",text:item})
    this.filterData()
  }
  /**
   * filter data
   * @property {Function}
   */
  filterData(){
    this.items1=this.items.filter(i=>i.text=='patio')
    this.items2=this.items.filter(i=>i.text=='retainit wall < 3ft height')
    this.items3=this.items.filter(i=>i.text=='retainit wall > 3ft height')
    this.items4=this.items.filter(i=>i.text=='sidewalks')
  }
  /**
   * 
   * @param ambient {Object}
   * @param system {Object}
   */
  redirectTo(ambient: any,system: any){
    let navigationExtras:NavigationExtras={
      state:{
        config:{ambient:ambient, system:system,items:this.allItems, proposalId: this.proposalId},
      }
    }
   this.router.navigateByUrl("work-orders/proposals/fillProposal/"+this.proposalId+"/fillProposalItem",navigationExtras)
  }
  /**
   * filter data
   * @property {Function}
   */
  loadProposalItems(){
    this.service.getProposalGrid().subscribe(res=>{
      this.grids=res;
    })
    this.service.getProposalConfig().subscribe(response=>{
      this.allItems=response;
    })
  }
  /**
   * Save proposal
   * @property {Function}
   */
  saveProposalValue(){
    this.itemBody.proposal= this.proposal[0][0].proposal
    this.itemBody.dataSelected=this.proposal
    this.engineService.postProposalOptions(this.itemBody)
    .subscribe((r)=>{
      this.router.navigate(['/home'])
    })
    localStorage.clear();
  }
   
  
}
