// @ts-check
import { LitElement, html, css } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { Options } from 'selenium-webdriver';

@customElement('input-number')
export class InputNumber extends LitElement {
  static styles = css`
  :host{
    width: 80%;
  }
  ion-input input{
    width: 30px;
    border-bottom: none;
    border: none;
  }
  ion-item{
    width: 100%;
  }
  @media screen and (max-width: 800px) {
    .desktop-hidden {
      display: initial;
    }
    .mobile-hidden {
      display: none;
    }
  }
  @media screen and (min-width: 800px) {
    .desktop-hidden {
      display: none;
    }
    .mobile-hidden {
      display: initial;
    }
  }
  `;
  @property({type: Boolean, reflect: true})
  /**
   * ifhave steps
   * @type {Boolean}
   */
  issteps: boolean = false;
  @property({type: String})
  /**
   * input steps
   * @type {string}
   */
  steps='';

  render() {
    if(this.issteps===false){
      return html`
      <ion-item >
      <ion-checkbox @click="${() => this.issteps = !this.issteps}"></ion-checkbox>
      <ion-label>Steps</ion-label>
    </ion-item>`
    }else{
    return html`    
    <ion-item "class="innum" >
      <ion-checkbox checked slot="start" @click="${() => this.issteps = !this.issteps}"></ion-checkbox>
      <ion-label>Steps</ion-label>
       <div >
       <ion-input id="steps" placeholder="#"  type="number" @change="${(e) => this.stepsChange(e)}"></ion-input>
      </div>
    </ion-item>

    `};
  }
  /**
   * 
   * @param e {Object}
   */
  stepsChange(e: { target: { value: string; }; }) {
    this.steps = e.target.value;
    const step=this.steps;
    if(step){
      const options={
        detail:{step}
      };
      this.dispatchEvent(
        new CustomEvent('steps', options)
      )
      }
  }
  }
