import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { EngineService } from 'src/app/services/engine.service';

import { ConfigReportsPage } from './config-reports.page';

describe('ConfigReportsPage', () => {
  let component: ConfigReportsPage;
  let fixture: ComponentFixture<ConfigReportsPage>;
  let dom:HTMLElement;
  let engineService:EngineService;
  let activatedRoute:ActivatedRoute;
  let translate:any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [ConfigReportsPage],
    imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule,
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory:(createTranslateLoader),
        deps: [HttpClient]
      }
    })],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
    providers:[EngineService,{
      provide:ActivatedRoute,
      useValue:{
        snapshot: {
          params: {
            entity: 'customers'
          },
        }
      }
    }],
    teardown: { destroyAfterEach: false }
}).compileComponents();

    fixture = TestBed.createComponent(ConfigReportsPage);
    component = fixture.componentInstance;
    activatedRoute=TestBed.get(ActivatedRoute);
    translate=TestBed.get(TranslateService);
    dom=fixture.nativeElement;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('content of entity should contain component', () => {
    fixture.detectChanges();
    expect(dom.querySelector('#content')).toBeDefined()
    const content=dom.querySelector('#content')
    const buttons=['ADD BUTTON','EDIT BUTTON','DELETE BUTTON']; var index=0;
    expect(content.querySelector("h3.page-title").textContent).toContain("HEADER")
    expect(content.querySelector("ion-toolbar.page-bar").querySelectorAll('a').item(0).textContent).toContain("HOME")
    expect(content.querySelector("ion-toolbar.page-bar").querySelectorAll('a').item(1).textContent).toContain("REPORT CONFIGURATION")
    expect(content.querySelector("section.name").textContent).toContain('TITLE ')
    expect(content.querySelectorAll('ion-button').forEach(button=>{
      expect(button.textContent).toContain(buttons[index]) 
      index++;
  }))
  expect(content.querySelector("div.table")).toBeDefined();
  })
  it('should translate to spanish a string using the key value', async(()=>{
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('small').textContent).toEqual('HEADER');
    translate.setTranslation('es', { HEADER: 'Nuevos y existentes' });
    translate.use('es');
    fixture.detectChanges();
    expect(compiled.querySelector('small').textContent).toEqual('Nuevos y existentes');
  }))
});
