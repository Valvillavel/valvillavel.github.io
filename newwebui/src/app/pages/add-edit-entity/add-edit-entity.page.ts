// @ts-check
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { EngineService } from 'src/app/services/engine.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Portal } from '@capacitor/cli';
class City{
  public id:number;
  public name:string;
}
/**
 * @ignore
 */
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-edit-entity.page.html',
  styleUrls: ['./add-edit-entity.page.scss'],
})
export class AddCustomerPage implements OnInit {
  /**
   * Entity data
   * @type {Object}
   */
  entity: any;
  /**
   * All entitys data
   * @type {Array}
   */
  listEntities: any[] = [];
  /**
   * If is edit form
   * @type {Boolean}
   */
  edit: boolean = false;
  /**
   * @type {Object}
   */
  entityData: any;
  cities: any[]=[];
  /**
   * All entitys data
   * @type {Array}
   */
   countries: any[] = []
   /**
    * All entitys data
    * @type {Array}
    */
   states: any[] = []
   countrySelected:any;
   stateSelected:any;
   citySelected:any;
   availableStates:any[]=[]
   availableCities:any[]=[]


  /**
   * this is some tools
   * @param activateRoute {ActivatedRoute}
   * @param formBuilder {FormBuilder}
   * @param router {Router}
   * @param engineService {EngineService}
   * @param translate {TranslateService}
   */
  constructor(
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private engineService: EngineService,
    private translate: TranslateService
  ) {}
  /**
   * Register form
   * @property {Object}
   */
  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    company: [''],
    email: [''],
    address: [''],
    city: [''],
    state: [''],
    country: [''],
    phone: [''],
    mobile: [''],
  });
  /**
   * init
   * @property {Function}
   */
  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.entityData = this.router.getCurrentNavigation().extras.state.entity;
      this.edit = true;
      this.countrySelected=this.entityData?.country;
      this.stateSelected=this.entityData?.state;
      this.citySelected=this.entityData?.city;
      this.registerForm.get('country').setValue(this.entityData?.country);
      this.registerForm.get('state').setValue(this.entityData?.state);
      this.registerForm.get('city').setValue(this.entityData?.city);
      this.updateEntityData();
    }
    this.loadCountries();
    this.loadCities();
    this.loadStates()
    this.entity = this.activateRoute.snapshot.params.entity;
    
  }
  /**
   * Change Languages
   * @param event
   */
  changeLanguage(event: { detail: { value: string } }) {
    this.translate.use(event.detail.value);
  }
  /**
   * Country data request
   * @property {Function}
   */
  loadCountries() {
    this.engineService.getCountries().subscribe((country) => {
      this.countries = country
    })
  }
  countryChange(event: {component: IonicSelectableComponent, value: any }){
    this.registerForm.get('country').setValue(event.value.name);
    this.countrySelected=event.value.name
    this.loadStates()
  }
  /**
   * Country data request
   * @property {Function}
   */
  loadStates() {
    var value=this.countrySelected
    this.engineService.getStates().subscribe((state) => {
      if(this.countrySelected!== undefined){
        this.states=[]
        this.availableStates=state
        this.availableStates.map((item) => {
          if(item.country.name===value){
            this.states.push(item)
          }
        })
      }else{
        this.states=state
      }
    } )
  }
  stateChange(event: {component: IonicSelectableComponent, value: any}){
    this.registerForm.get('state').setValue(event.value.name);
    this.stateSelected=event.value.name
    this.loadCities()
  }
  /**
   * Country data request
   * @property {Function}
   */
   loadCities() {
    var value=this.stateSelected
    this.engineService.getCities().subscribe((city) => {
      if(this.stateSelected!== undefined){
        this.cities=[]
        this.availableCities=city
        this.availableCities.map((item) => {
          if(item.state.name===value){
            this.cities.push(item)
          }
        })
      }else{
        this.cities=city
      }
    })
  }
  cityChange(event: {component: IonicSelectableComponent, value: any}){
    this.registerForm.get('city').setValue(event.value.name);
  }
  /**
   * Save new entity
   * @param entity entity data
   * @param formDirective
   */
  saveEntity(entity: any, formDirective: FormGroupDirective) {
    this.engineService.postEntity(this.entity, entity).subscribe((r) => {
      formDirective.resetForm();
      this.router.navigate(['/entities', this.entity]);
    });
  }
  /**
   * Update entity data
   * @property {Function}
   */
  updateEntityData() {
    this.registerForm.get('name').setValue(this.entityData?.name);
    this.registerForm.get('company').setValue(this.entityData?.company);
    this.registerForm.get('email').setValue(this.entityData?.email);
    this.registerForm.get('address').setValue(this.entityData?.address);
    this.registerForm.get('city').setValue(this.entityData?.city);
    this.registerForm.get('state').setValue(this.entityData?.state);
    this.registerForm.get('country').setValue(this.entityData?.country);
    this.registerForm.get('mobile').setValue(this.entityData?.mobile);
    this.registerForm.get('phone').setValue(this.entityData?.phone);
  }
  /**
   * Edit Entity data
   * @param entity {Object}
   * @param formDirective {FormDirective}
   */
  editEntity(entity: any, formDirective: FormGroupDirective) {
    this.engineService
      .updateEntity(this.entity, this.entityData.id, entity)
      .subscribe((r) => {
        formDirective.resetForm();
        this.router.navigate(['/entities', this.entity]);
      });
  }
}
