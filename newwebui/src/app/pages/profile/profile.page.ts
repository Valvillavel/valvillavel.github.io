// @ts-check
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EngineService } from 'src/app/services/engine.service';
/**
 * @ignore
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  /**
   * language list
   * @type {Array}
   */
  langs:string[]=[];
  /**
   * user id
   * @type {Number}
   */
  user: number=1;
  userdata:any={
    id:'',
    username:'',
    email:'',
    role:'',
    company:'',
    country:'',
    phone:'',
    mobile:'',
    avatar:''
  }
  image:any;
  data:any;
  /**
   * error
   * @type {Boolean}
   */
  error: boolean=false;
   /**
   * Report selected
   * @type {Object}
   */
    reportsSelected:any;
  /**
   * 
   * @param translate {TranslateService}
   * @param engineService {EngineService}
   */
  constructor(
    private translate:TranslateService,
    public engineService:EngineService,
    private router:Router
  ) { }
  /**
   * init 
   * @property {Function}
   */
  ngOnInit() {
    this.langs=this.translate.getLangs();
    this.loadUsers()
  }
  /**
   * change language
   * @param event {Event}
   */
  changeLanguage(event: { detail: { value: any; }; }){
    this.translate.use(event.detail.value); 
  }
  /**
   * load user data
   * @property {Function}
   */
  loadUsers(){
    this.engineService.getUsers(this.user)
    .subscribe(res=>{
      this.data=res
      this.userdata.username=res.username
      this.userdata.email=res.email
      if(res.contractor===null){
        this.userdata.role='Inspector'
        this.userdata.company=res.inspector.company
        this.userdata.country=res.inspector.country
        this.userdata.phone=res.inspector.phone
        this.userdata.mobile=res.inspector.mobile
        this.userdata.avatar=res.inspector.avatar
        this.image="http://localhost:1337"+res.contractor.avatar.url
      }
      if(res.inspector===null){
        this.userdata.role='Contractor'
        this.userdata.company=res.contractor.company
        this.userdata.country=res.contractor.country
        this.userdata.phone=res.contractor.phone
        this.userdata.mobile=res.contractor.mobile
        this.userdata.avatar=res.contractor.avatar
        this.image="http://localhost:1337"+res.contractor.avatar.url
      }
    })
  }
  OpenEditPage(){
    let navigationExtras:NavigationExtras={
      state:{
        user:this.data,
      }
    }
    this.router.navigateByUrl("/profile/edit-profile",navigationExtras)
  } 

}
