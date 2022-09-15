// @ts-check
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { EngineService } from 'src/app/services/engine.service';
import '../../../web-components/tool-bar';
/**
 * @ignore
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  subjects;
  /**
   * user data
   * @type {Object}
   */
  authUser: any ={
    username:'',
    email:'',
  };
  /**
   * user id
   * @type {Object}
   */
  ids:any;
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
   * Entity item
   * @type {Object}
   */
  entity:any;
  /**
   * 
   * @param engineService {EngineService}
   */
  constructor(
    public engineService:EngineService,
    private router:Router
    ) {} 
  /**
   * init 
   * @property {Function}
   */
  ngOnInit(){
    this.loadUsers();
    this.subjects=[
      {
        img:'assets/imgs/team.png',
        name:'entities',
        url:'entities'
      },
      {
        img:'assets/imgs/check.png',
        name:'work-orders',
        url:'work-orders'
      },
      {
        img:'assets/imgs/report.png',
        name:'Reports',
        url:'reports'
      },
      {
        img:'assets/imgs/report.png',
        name:'Report Configuration',
        url:'config'
      },
    ]
  }
  /**
   * Load user
   *  @property {Function}
   */
  loadUsers(){
    this.engineService.getUsers(this.user)
    .subscribe(res=>{
      this.authUser=res;
      this.ids=res.id;
    });
  }
  goToSubject(value){ 
    console.log(value)
    this.router.navigate(['/home/',value])
    value='';
  }
}
