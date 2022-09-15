// @ts-check
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { alertController } from '@ionic/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { EngineService } from 'src/app/services/engine.service';

/**
 * @ignore
 */
@Component({
  selector: 'app-entities',
  templateUrl: './entities.page.html',
  styleUrls: ['./entities.page.scss']
})
export class EntitiesPage implements OnInit{
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
   * Entity item
   * @type {Object}
   */
  entity:any;
  /**
   * Date start time
   * @type {Array}
   */
  columns: Array<any>=[];
  /**
   * list entity
   * @type {Object}
   */
  list:any;
  /**
   * error
   * @type {Boolean}
   */
  error: boolean=false;
  /**
   * Entity selected
   * @type {Object}
   */
  entitiesSelected:any;
  /**
   * language list
   * @type {Array}
   */
  langs:Array<any>;
  /**
   * user data
   * @type {Object}
   */
  authUser: any;
  /**
   * user id
   * @type {Number}
   */
  user: number=1;
  /**
   * user image
   * @type {Object}
   */
  avatar:any;

  /**
   * 
   * @param popoverController {PopoverController}
   * @param activeRoute {ActivatedRoute}
   * @param engineService {EngineService}
   * @param router {Router}
   * @param translate {TranslateService}
   */
  constructor(
    public popoverController: PopoverController,
    public activeRoute: ActivatedRoute,
    public engineService:EngineService,
    private router:Router,
    private translate:TranslateService,
  ) { }
  /**
   * init 
   * @property {Function}
   */
  ngOnInit() {
    this.langs=this.translate.getLangs();
    this.entity= this.activeRoute.snapshot.params.entity;
    console.log(this.entity)
    this.loadDataEntities() 
    this.columns=["Name","Company","Email","Address","City","State","Country","Phone","Mobile"]
  }
  /**
   * Load data on datatable
   * @property {Function}
   */
  ionViewWillEnter(){
    this.loadDataEntities() 
  }
  /**
   * change language
   * @param event {Event}
   */
  changeLanguage(event: { detail: { value: string; }; }){
    this.translate.use(event.detail.value); 
  }
  /**
   * @property {Function}
   */
  loadDataEntities(){
    this.engineService.getEntities(this.entity).subscribe(entities=>{
      this.list=entities
      this.error=false;
    },()=>{
      this.error=true;
      this.list=[];
    }) 
  }
/**
   * Report selected
   * @param dataSelected {Object}
   */
  getEntitySelected(dataSelected: any){
    this.entitiesSelected=dataSelected 
  }
  /**
   * Delete data selected
   *  @property {Function}
   */
  deleteData(){
    if(this.entitiesSelected==undefined || this.entitiesSelected.length==0){
      this.handleButtonClick()
    }
    this.entitiesSelected?.map(entity=>{
      this.engineService.deleteEntity(this.entity,entity.id).subscribe(res=>{
        this.entitiesSelected=[]
        this.ionViewWillEnter()
      })
    })
    
  }
  /**
   * 
   */
  async handleButtonClick() {
    const alert = await alertController.create({
      header: 'Select Item',
      message: 'Must select an item to delete',
      buttons: ['Agree'],
    });

    await alert.present();
  }
  /**
   * Open edit form
   *  @property {Function}
   */
  openEditForm(){
    let navigationExtras:NavigationExtras={
      state:{
        entity:this.entitiesSelected[this.entitiesSelected.length -1],
      }
    }
   this.router.navigateByUrl("/entities/"+this.entity+"/edit",navigationExtras)
  }
  /**
   * Laguages list
   * @param event {Event}
   */
  lang(event:Event){
    const lang = (event as CustomEvent<any>).detail;
    this.translate.use(lang);
  }
  /**
   * Load user
   *  @property {Function}
   */
  loadUsers(){
    this.engineService.getUsers(this.user)
    .subscribe(res=>{
      this.authUser=res;
      let claves = res.avatar.map(i=>{
        if(i.url!=''){
          var ava='http://localhost:1337'+i.url;
        }
        this.avatar=ava;
      })
    })
    ;
      
  }
}
