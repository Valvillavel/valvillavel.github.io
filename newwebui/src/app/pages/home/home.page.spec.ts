import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import{AppComponent} from'../../app.component'
import { TranslateService,TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomePage', () => {
  let component: HomePage;
  let app:AppComponent;
  let fixture: ComponentFixture<HomePage>;
  let dom:HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [HomePage],
    imports: [IonicModule.forRoot(),TranslateModule.forRoot(),HttpClientTestingModule],
    teardown: { destroyAfterEach: false }
}).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dom= fixture.nativeElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should contain as title rinspector',() => {
    fixture.detectChanges();
    expect(dom.querySelector('ion-title').textContent).toContain('rInspector')
  })
  it('should contain menu button',() => {
    fixture.detectChanges();
    expect(dom.querySelector('ion-menu-button')).toBeTruthy()
  })
  it('should contain a button as name New',() => {
    fixture.detectChanges();
    expect(dom.querySelector('ion-button').textContent).toContain('New')
  })  
  
});
