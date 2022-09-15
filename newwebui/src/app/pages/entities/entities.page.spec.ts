import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { IonicModule } from '@ionic/angular';
import { EntitiesPage } from './entities.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import {EngineService} from 'src/app/services/engine.service'
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import {jest} from '@jest/globals';
describe('EntitiesPage', () => {
  let component: EntitiesPage;
  let fixture: ComponentFixture<EntitiesPage>;
  let dom:HTMLElement;
  let engineService:EngineService;
  let activatedRoute: ActivatedRoute; 
  let translate:any;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [EntitiesPage],
    imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [EngineService,
        {
            provide: ActivatedRoute,
            useValue: {
                snapshot: {
                    params: {
                        entity: 'customers'
                    },
                }
            }
        }],
    teardown: { destroyAfterEach: false }
}).compileComponents();

    fixture = TestBed.createComponent(EntitiesPage);
    component = fixture.componentInstance;
    activatedRoute = TestBed.get(ActivatedRoute);
    translate = TestBed.get(TranslateService);
    fixture.detectChanges();
    dom= fixture.nativeElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain as subtitle',() => {
    fixture.detectChanges();
    expect(dom.querySelector('small').textContent).toContain('HEADER')
  })
  it('toolbar should contain correctly components',() => {
    fixture.detectChanges();
    expect(dom.querySelector('ion-toolbar')).toBeDefined()
    const toolbar=dom.querySelector('ion-toolbar')
    expect(toolbar.querySelector('ion-menu-button')).toBeDefined();
    expect(toolbar.querySelector('ion-button').textContent).toContain('NEW BUTTON')
    })
  it('content of entity should contain all components',() => {
    fixture.detectChanges();
    expect(dom.querySelector("#content")).toBeDefined()
    const content=dom.querySelector("#content")
    const buttons=['ADD BUTTON','EDIT BUTTON','DELETE BUTTON'];var index=0;
    expect(content.querySelector("h3.page-title").textContent).toContain(" HEADER")
    expect(content.querySelector("ion-toolbar.page-bar").querySelectorAll('a').item(0).textContent).toContain("HOME")
    expect(content.querySelector("ion-toolbar.page-bar").querySelectorAll('a').item(1).textContent).toContain("ENTITIES")
    expect(content.querySelector("section.name").textContent).toContain('TITLE ')
    expect(content.querySelectorAll('ion-button').forEach(button=>{
      expect(button.textContent).toContain(buttons[index]) 
      index++;
    }))
    expect(content.querySelector("div.table")).toBeDefined();
  })
  it('should translate to english a string using the key value', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('small').textContent).toEqual('HEADER');
    translate.setTranslation('en', { HEADER: 'New and existing' });
    translate.use('en');
    fixture.detectChanges();
    expect(compiled.querySelector('small').textContent).toEqual('New and existing');
  }));
  it('should translate to spanish a string using the key value', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('small').textContent).toEqual('HEADER');
    translate.setTranslation('es', { HEADER: 'Nuevos y existentes' });
    translate.use('es');
    fixture.detectChanges();
    expect(compiled.querySelector('small').textContent).toEqual('Nuevos y existentes');
  }));
  describe('when EntitiesComponent.ts is called',()=>{
    let engineServiceMock:any
    let activatedRouteMock:any;
    let routerMock:any;

    beforeEach( () =>{
      engineServiceMock={
        getEntities: jest.fn(),
        deleteEntity: jest.fn(),
      }
      activatedRouteMock=jest.fn()
      routerMock=jest.fn()


    })

    describe('Test: ngOnInit()',()=>{
      it('should ensure entity param is customers', async () => {
        expect(activatedRoute.snapshot.params.entity).toEqual('customers');
        
     });
      it('should loadDataEntities is called from ngOnInit',()=>{
        component.activeRoute=activatedRoute
        const loadDataEntitiesSpy=jest.spyOn(component,'loadDataEntities');
        component.ngOnInit()
        expect(loadDataEntitiesSpy).toHaveBeenCalled()
      })
    })
    describe('Test: loadDataEntities()',()=>{
      it('should loadDataEntities is called',()=>{
        const loadDataEntitiesSpy=jest.spyOn(component,'loadDataEntities');
        
        const getEntitiesSpy=jest.spyOn(engineServiceMock,'getEntities').mockReturnValue(true);
        component.loadDataEntities();
        expect(engineServiceMock.getEntities(component.entity)).toBe(true)
        expect(getEntitiesSpy).toHaveBeenCalledWith(component.entity)

      })
    })
    describe('Test: deleteData()',()=>{
      it('should deleteData() is not called',()=>{
        component.entitiesSelected=[]
        const deleteDataSpy=jest.spyOn(component,'deleteData');
        
        const deleteEntitySpy=jest.spyOn(engineServiceMock,'deleteEntity');
        component.deleteData();
        expect(deleteEntitySpy).not.toHaveBeenCalled()

      })
      it('should deleteData() is called',()=>{
        component.entitiesSelected=[{
          id: 1,
          name: "marco antonio",
          address: "America y libertador",
          city: "Cochabamba",
          company: "Madi",
          country: "cbba",
          email: "marc@gmail.com",
          mobile: "6548449451",
          phone: "45848484",
        }]
        const deleteDataSpy=jest.spyOn(component,'deleteData');
        
        const deleteEntitySpy=jest.spyOn(engineServiceMock,'deleteEntity').mockReturnValue(true);
        component.deleteData();
        expect(engineServiceMock.deleteEntity(component.entity,component.entitiesSelected[0].id)).toBe(true);
        expect(deleteEntitySpy).toHaveBeenCalledWith(component.entity,component.entitiesSelected[0].id)

      })
    })
  }) 
/* 
  describe('EntitiesComponent is called',()=>{
      let activeRouteMock:any;
      let apiServiceMock:any;
      let routerMock:any;
      beforeEach(()=>{
        apiServiceMock={
          getEntities:jest.fn(),
          deleteEntity:jest.fn()
        }
        activeRouteMock=jest.fn()
        routerMock=jest.fn()
        component=new EntitiesPage(
          activeRouteMock,
          apiServiceMock,
          routerMock
        )
        component.activeRoute=activatedRoute
        component.ngOnInit();  
        
      })
      
  }) */
});
