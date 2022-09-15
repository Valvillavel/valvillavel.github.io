import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCustomerPage } from './add-edit-entity.page';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
describe('AddCustomerPage', () => {
  let component: AddCustomerPage;
  let fixture: ComponentFixture<AddCustomerPage>;
  let dom:HTMLElement;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [AddCustomerPage],
    imports: [IonicModule.forRoot(),TranslateModule.forRoot(),FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
    teardown: { destroyAfterEach: false }
}).compileComponents();

    fixture = TestBed.createComponent(AddCustomerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dom= fixture.nativeElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('toolbar should contain correctly components',() => {
    fixture.detectChanges();
    expect(dom.querySelector('ion-toolbar')).toBeDefined()
    const toolbar=dom.querySelector('ion-toolbar')
    expect(toolbar.querySelector('ion-menu-button')).toBeDefined();
    expect(toolbar.querySelector('ion-button').textContent).toContain('New')
    })
    it('add Entity should contain as subtitle New Entity',() => {
      fixture.detectChanges();
      expect(dom.querySelector('section.name').textContent).toContain('New ')
    })
  it('content of form add entity should contain all components',() => {
    fixture.detectChanges();
    expect(dom.querySelector("ion-list")).toBeDefined()
    const list=dom.querySelector("ion-list")
    expect(list.querySelectorAll("ion-item").item(0).querySelector('ion-label').textContent).toContain("Name")
    expect(list.querySelectorAll("ion-item").item(1).querySelector('ion-label').textContent).toContain("Company")
    expect(list.querySelectorAll("ion-item").item(2).querySelector('ion-label').textContent).toContain("E-mail")
    expect(list.querySelectorAll("ion-item").item(3).querySelector('ion-label').textContent).toContain("Address")
    expect(list.querySelectorAll("ion-item").item(4).querySelector('ion-label').textContent).toContain("City")
    expect(list.querySelectorAll("ion-item").item(5).querySelector('ion-label').textContent).toContain("State")
    expect(list.querySelectorAll("ion-item").item(6).querySelector('ion-label').textContent).toContain("Country")
    expect(list.querySelectorAll("ion-item").item(7).querySelector('ion-label').textContent).toContain("Phone")
    expect(list.querySelectorAll("ion-item").item(8).querySelector('ion-label').textContent).toContain("Mobile")
    
    expect(list.querySelector("section.section-buttons")).toBeDefined();
    const buttons=list.querySelector("section.section-buttons")
    expect(buttons.querySelectorAll('ion-button').item(0).textContent).toContain("Submit")
    expect(buttons.querySelectorAll('ion-button').item(1).textContent).toContain("Cancel")
  })
});
