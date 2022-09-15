import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  /**
   * Name to create an account
   * @type {String}
   */
  name: string = "";
  /**
   * user Email 
   * @type {String}
   */
  email: string = "";
  /**
   * user Password
   * @type {String}
   */
  password: string = "";
  /**
   * Password entering again to verify if its the same as password
   * @type {String}
   */
  confirm_password: string = "";  

  constructor() { }

  ngOnInit() {}
  /**
   * returns an alert with the data entered after making click on Sign up button
   */
  onSubmit() {
    alert(
     this.name + ', ' + this.email + ', ' + this.password + ', ' + this.confirm_password
    )
 }
}
