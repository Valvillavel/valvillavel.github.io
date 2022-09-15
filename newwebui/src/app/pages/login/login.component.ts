// @ts-check
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
/**
 * @ignore
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /**
   * user email
   * @type {String}
   */
  email: string = "";
  /**
   * user password
   * @type {String}
   */
  password: string = "";
  /**
   * 
   * @param translate {TranslateService}
   */
  constructor(
    public translate: TranslateService,
  ) { }

  /**
   * init 
   * @property {Function}
   */
  ngOnInit() {}
  /**
   * change language
   * @param event {Event}
   */
  changeLanguage(event: { detail: { value: any; }; }){
    this.translate.use(event.detail.value);
  }
  /**
   * @property {Function}
   */
  onSubmit() {
    alert(
     this.email + ', ' + this.password
    )
 }
}
