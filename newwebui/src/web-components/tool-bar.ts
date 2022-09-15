// @ts-check
import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('tool-bar')
export class Toolbar extends LitElement {
  
  static styles = css`
  :host{
    background-color: white;
    display: block;
  }
  ion-title {
    display: inline-block;
    position:absolute;
    width: auto;
    margin: auto;
    top:0%;
    left:40%;
  }
  ion-button {
    display: inline-block;
    position:absolute;
    top:10%;
    left:70%;
  }
  ion-item{
    position:absolute;
    left:50%;
    top:0%;
    z-index:1;
  }
  .chip{
    position:absolute;
    top: 5%; 
    left:80%;
    display: flex;
    padding: 0 30px;
    height: 90%;
    font-size: 80%;
    line-height: 40px;
    border-radius: 25px;
    background-color: #f1f1f1;
    z-index:1;
  }
  .chip img{
    float: left;
    margin: 0 10px 0 -25px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
  .dropdown-content{
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    position:absolute;
    top: 50%; 
    left:0%;
  }
  .dropdown-content a {
    color: black;
    padding: 10px 14px;
    text-decoration: none;
    display: flex;
    padding-top: 1px;
  }
  .dropdown-content a:hover {background-color: #ddd;}
  .chip:hover .dropdown-content{display: block;}
  .chip:hover .dropbtn {background-color: #79DCFC;}
  .dropdown-content a ion-icon{
    height: 25px;
    width: 25px;
    float:right;
  }
  a .breadcrumb-native {
    padding: 6px 0px;
    padding-right: unset;
    padding-inline: 0px;
  }
  @media screen and (max-width: 800px){
    ion-title {
      width:70%;
      font-size: 80%;
    }
    .chip{
      width:60%;
      font-size: 60%;
      padding: 0 30px;
      display: flex;
      line-height: 40px;
      border-radius: 25px;
    }
    ion-item{
      position:absolute;
      left:50%;
      top:0%;
      z-index:1;
      width:30%;
      font-size: 70%;
    }
    ion-select{
      padding-left: 3px;
      width: 35px;
    }
  }
  @media screen and (max-width: 800px) {
    .navbar{
      top:15%;
    }
    ion-title {
      display: inline-block;
      position:absolute;
      width: auto;
      margin: auto;
      top:1%;
      left:30%;
    }
    ion-button {
      width: auto;
      margin: auto;
      display: inline-block;
      position:absolute;
      top:10%;
      left:70%;
    }
    .chip{
      position:absolute;
      top: 5%; 
      left:80%;
      display: flex;
      padding: 0 30px;
      height: 90%;
      font-size: 80%;
      line-height: 40px;
      border-radius: 25px;
      background-color: #f1f1f1;
      z-index:1;
    }
    .chip img{
      float: left;
      margin: 0 10px 0 -25px;
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
    .dropdown-content{
      display: none;
      position: absolute;
      background-color: #f1f1f1;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
      position:absolute;
      top: 50%; 
      left:0%;
    }
    .dropdown-content a {
      color: black;
      padding: 10px 14px;
      text-decoration: none;
      display: flex;
      padding-top: 1px;
    }
    .dropdown-content a:hover {background-color: #ddd;}
    .chip:hover .dropdown-content{display: block;}
    .chip:hover .dropbtn {background-color: #79DCFC;}
    .dropdown-content a ion-icon{
      height: 25px;
      width: 25px;
      float:right;
    }
  }
  ion-breadcrumb {
  padding-inline-start:0px;
  padding-left: 0px;
  padding-right: 0px;
  padding:0px;
}
ion-breadcrumbs{
  padding-inline: 0px;
}
ion-breadcrumb a .breadcrumb-native {
  padding-left: unset;
  padding-right: unset;
  padding-inline: 0px;
}
  `;
  @property({ type: String }) 
  /**
   * user image
   * @type {string}
   */
  user: String
  @property({ type: String }) 
  /**
   * user image
   * @type {string}
   */
  imagen: String;
  @property({ type: Array }) 
  /**
   * laguage list
   * @type {Array}
   */
   breadcrumbs: Array<any>;
   last:''

  render() {
    if (this.user === undefined) {
      return '';
    }
    
    return html`
      <div class="navbar">
        <ion-buttons slot="start">
          <ion-menu-button autoHide="false" @click=${this.openMenu}></ion-menu-button>
          ${this.breadcrumbs?.map(breadcrumb => html`
          <ion-breadcrumbs class="breadcrumbs">
          <ion-icon name="chevron-forward-outline"></ion-icon>
          <ion-breadcrumb class="breadcrumb" href="${breadcrumb.url}">
              ${breadcrumb.label}
            </ion-breadcrumb>  
          </ion-breadcrumbs>`)}
          <ion-button slot="end"><ion-icon name="add" ></ion-icon>NEW </ion-button>
        </ion-buttons>
        <div class="title">
          <ion-title>
            rInspector
          </ion-title>
        </div>
        <div class="chip" left>
            <img
              src=${this.imagen}
            />
                ${this.user}
            <div class="dropdown-content">
              <a href="/profile">My profile  <ion-icon name="person-circle-outline"></ion-icon></a> 
              <a href="/calendar">My calendar <ion-icon name="calendar-outline"></ion-icon></a>
              <a href="#">Log out     <ion-icon name="log-out-outline"></ion-icon></i></a>
            </div>
        </div>
      </div>`;
  }
  /**
   * Show menu
   * @property {function}
   */
  private openMenu() {
    this.dispatchEvent(
      new CustomEvent<any>('menu')
    );
  }
  }