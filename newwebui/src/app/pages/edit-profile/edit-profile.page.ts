import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { EngineService } from 'src/app/services/engine.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  /**
   * Config
   * @type {Object}
   */
   user:any;
   /**
   * Data of report image
   * @type {Object}
   */
  file:any;
  image:any;
  cities: any[]=[];
  entity:any;
  rolechanged:boolean;
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
   userdata={
    username:'',
    email:'',
   }

  constructor(
    private router:Router,
    private activeRoute:ActivatedRoute,
    private formBuilder: FormBuilder,
    private engineService: EngineService
  ) { }
  userForm = this.formBuilder.group({
    name: ['', Validators.required],
    company: [''],
    email: [''],
    address: [''],
    city: [''],
    state: [''],
    country: [''],
    phone: [''],
    mobile: [''],
    avatar: [''],
  });

  ngOnInit() {
    this.user=this.router.getCurrentNavigation().extras.state.user;
    if(this.user.contractor===null){
      this.countrySelected=this.user?.inspector.country;
      this.stateSelected=this.user?.inspector.state;
      this.citySelected=this.user?.inspector.city;
    }else{
      if(this.user.inspector===null){
        this.countrySelected=this.user?.contractor.country;
        this.stateSelected=this.user?.contractor.state;
        this.citySelected=this.user?.contractor.city;
      }
    }
    this.loadCountries();
    this.loadCities();
    this.loadStates();
    this.updateUserData();
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
    this.userForm.get('country').setValue(event.value.name);
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
    this.userForm.get('state').setValue(event.value.name);
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
    this.userForm.get('city').setValue(event.value.name);
  }
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
  updateUserData(){
    if(this.user.contractor===null){
      this.userForm.get('name').setValue(this.user?.inspector.name);
      this.userForm.get('company').setValue(this.user?.inspector.company);
      this.userForm.get('email').setValue(this.user?.email);
      this.userForm.get('address').setValue(this.user?.inspector.address);
      this.userForm.get('mobile').setValue(this.user?.inspector.mobile);
      this.userForm.get('phone').setValue(this.user?.inspector.phone);
      this.userForm.get('country').setValue(this.user?.inspector.country);
      this.userForm.get('state').setValue(this.user?.inspector.state);
      this.userForm.get('city').setValue(this.user?.inspector.city);
      this.userForm.get('avatar').setValue(this.user?.inspector.avatar);
      this.image="http://localhost:1337"+this.user.inspector.avatar.url
      this.entity='inspectors';
    }
    if(this.user.inspector===null){
      this.userForm.get('name').setValue(this.user?.contractor.name);
      this.userForm.get('company').setValue(this.user?.contractor.company);
      this.userForm.get('email').setValue(this.user?.email);
      this.userForm.get('address').setValue(this.user?.contractor.address);
      this.userForm.get('mobile').setValue(this.user?.contractor.mobile);
      this.userForm.get('phone').setValue(this.user?.contractor.phone);
      this.userForm.get('country').setValue(this.user?.contractor.country);
      this.userForm.get('state').setValue(this.user?.contractor.state);
      this.userForm.get('city').setValue(this.user?.contractor.city);
      this.userForm.get('avatar').setValue(this.user?.contractor.avatar);
      this.image="http://localhost:1337"+this.user.contractor.avatar.url
      this.entity='contractors';
    }
  }
  editUser(value, formDirective:FormGroupDirective){
    this.userdata.username=value.name
    this.userdata.email=value.email
    const data= new FormData()
    data.append('data',JSON.stringify(value))
    if(this.file!=""){
      data.append('files.avatar',this.file)
    } 
    if(this.user.inspector===null){
      this.engineService.updateEntityUs('contractors', this.user.contractor.id, data)
      .subscribe((r) => {
        formDirective.resetForm();
      })
    }
    if(this.user.contractor===null){
      this.engineService.updateEntityUs('inspector', this.user.inspector.id, data)
      .subscribe((r) => {
        formDirective.resetForm();
      })
    }
    let formData = new FormData();
    formData.append("username", this.userdata.username);
    formData.append("email", this.userdata.email);
    this.engineService.updateUsers(this.user.id, formData)
    .subscribe((r) => {
      this.userdata.username='';
      this.userdata.email='';
      this.router.navigate(['/profile']);
    })  
  }
  

}

