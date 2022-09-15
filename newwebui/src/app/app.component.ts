// @ts-check
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import '../web-components/tool-bar';
import '../web-components/data-table';
import '../web-components/input-number';
import '../web-components/grid-item';
import { EngineService } from './services/engine.service';
import { ActivatedRoute, NavigationEnd, Router, PRIMARY_OUTLET } from '@angular/router';
import { filter } from 'rxjs';
/**
 * @ignore
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  /**
   * languages 
   * @type {Array}
   */
  langs:Array<any>;
  /**
   * breadcrumbs 
   * @type {}
   */
   breadcrumbs:Array<any>;
   breadcrumb={
    label:'Home',
    url:''
   }
  /**
   * user data
   * @type {String}
   */
  authUser: string;
  /**
   * user id
   * @type {Number}
   */
  user: number=1;
  avatar:any;
  /**
   * 
   * @param menu {MenuController}
   * @param engineService {EngineService}
   * @param translate {TranslateService}
   */
  constructor( 
    private menu:MenuController,
    private router:Router,
    private route:ActivatedRoute,
    public engineService:EngineService,
    private translate: TranslateService) {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
      this.translate.addLangs(['en','es']);
      this.langs=this.translate.getLangs();
      this.translate.stream('HELLO').subscribe((res: string)=>{
      })
  }
  /**
   * Open menu
   * @property {Function}
   */
  openMenu(){
    this.menu.toggle();
  }
  /**
   * init
   * @property {Function}
   */
  ngOnInit(){
    this.loadUser();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).
    subscribe(event =>{
      let root:ActivatedRoute = this.route.root;
      this.breadcrumbs=this.getBreadcrumbs(root);
      this.breadcrumbs=[this.breadcrumb,...this.breadcrumbs];
    })
    this.langs=this.translate.getLangs();
  }
  /**
   * change language
   * @param event {Event}
   */
  changeLang(event: { detail: { value: string; }; }){
    this.translate.use(event.detail.value); 
  }
  /**
   * @property {Function}
   */
  openSubMenu(){
    
  }
  getBreadcrumbs(route: ActivatedRoute, url:string="", breadcrumbs=[]):Array<any>{
    const ROUTE_DATA_BREADCRUMB = 'title';
    var icon:string;
    let children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }

    //iterate over each children
    for (let child of children) {
      //verify primary route
      if (child.outlet !== PRIMARY_OUTLET || child.snapshot.url.length===0) {
        continue;
      }

      //get the route's URL segment
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");
      let page: string

      //append route URL to URL
      url += `/${routeURL}`;
      let breadcrumb= {
        label: routeURL,
        url: url,
      };
      if(breadcrumb.label!='home'){
        breadcrumbs.push(breadcrumb);
      }
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
  /**
   * change language from toolbar
   * @param event {Event}
   */
  lang(event:Event){
    const lang = (event as CustomEvent<any>).detail;
    this.translate.use(lang);
  }
  /**
   * load data users
   * @property {Function}
   */
   loadUser(){
    this.engineService.getUsers(this.user)
    .subscribe(res => {
      this.authUser=res.username
      if(res.contractor === null){
        this.avatar = "http://localhost:1337"+ res.inspector.avatar.url
      }else{
        if(res.inspector === null){
          this.avatar = "http://localhost:1337"+ res.contractor.avatar.url
        }
      }
    })
   }
}
