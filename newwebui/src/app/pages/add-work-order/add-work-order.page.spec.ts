import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { AddWorkOrderPage } from './add-work-order.page';

describe('AddWorkOrderPage', () => {
  let component: AddWorkOrderPage;
  let fixture: ComponentFixture<AddWorkOrderPage>;
  let dom:HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [AddWorkOrderPage],
    imports: [IonicModule.forRoot(), FormsModule,ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
    teardown: { destroyAfterEach: false }
}).compileComponents();

    fixture = TestBed.createComponent(AddWorkOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dom=fixture.nativeElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('toolbar should contain correctly cdomponents',() => {
    fixture.detectChanges();
    expect(dom.querySelector('ion-toolbar')).toBeDefined()
    const toolbar=dom.querySelector('ion-toolbar')
    expect(toolbar.querySelector('ion-menu-button')).toBeDefined();
    expect(toolbar.querySelector('ion-button').textContent).toContain('New')
  })
  it('add WorkOrder should contain as subtitle New WorkOrder', () => {
    fixture.detectChanges();
    expect(dom.querySelector('section.name').textContent).toContain('New')
  })
  it('content of form add WorkOrder should contain all components',() => {
    fixture.detectChanges();
    expect(dom.querySelector('ion-list')).toBeDefined()
    const list=dom.querySelector('ion-list')
    expect(list.querySelectorAll('ion-item').item(0).querySelector('ion-label').textContent).toContain("Customer")
    expect(list.querySelectorAll('ion-item').item(0).querySelector('ion-label').textContent).toContain("Agent")
    expect(list.querySelectorAll('ion-item').item(0).querySelector('ion-label').textContent).toContain("Address")
    expect(list.querySelectorAll('ion-item').item(0).querySelector('ion-label').textContent).toContain("Property")
    expect(list.querySelectorAll('ion-item').item(0).querySelector('ion-label').textContent).toContain("Inspection date")
    expect(list.querySelectorAll('ion-item').item(0).querySelector('ion-label').textContent).toContain("Contract signed")
    expect(list.querySelectorAll('ion-item').item(0).querySelector('ion-label').textContent).toContain("Contract")
    expect(list.querySelectorAll('ion-item').item(0).querySelector('ion-button').textContent).toContain("Preview")

    expect(list.querySelector("section.section-buttons")).toBeDefined();
    const buttons=list.querySelector("section.section-buttons")
    expect(buttons.querySelectorAll('ion-button').item(0).textContent).toContain("Submit")
    expect(buttons.querySelectorAll('ion-button').item(1).textContent).toContain("Cancel")
  })
});
