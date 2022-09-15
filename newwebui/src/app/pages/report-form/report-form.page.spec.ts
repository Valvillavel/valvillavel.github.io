import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { ReportFormPage } from './report-form.page';

describe('ReportFormPage', () => {
  let component: ReportFormPage;
  let fixture: ComponentFixture<ReportFormPage>;
  let dom:HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [ReportFormPage],
    imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
    teardown: { destroyAfterEach: false }
}).compileComponents();

    fixture = TestBed.createComponent(ReportFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dom=fixture.nativeElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('toolbar should contain correctly components', () => {
    fixture.detectChanges();
    expect(dom.querySelector('ion-toolbar')).toBeDefined();
    const toolbar=dom.querySelector('ion-toolbar')
    expect(toolbar.querySelector('ion-menu-button')).toBeDefined();
    expect(toolbar.querySelector('ion-button').textContent).toContain('New')
  })
  it('add Report Config should contain as subtitle New Report', () => {
    fixture.detectChanges();
    expect(dom.querySelector('section.name').textContent).toContain('New')
  })
  it('content of form add Report Config contain all components', () =>{
    
  })
});
