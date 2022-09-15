// @ts-check
import { LitElement, html, css } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';

@customElement('side-selector')
export class SideSelector extends LitElement {
  static styles = css`
  .content{
    width: 100%;
  } 
  .left-rigth{
    height: 100px;
    width: 5px;
    background-color: var(--side-color);
    margin-top:3px;
    margin-bottom:5px;
    border-radius: 5px;
  }
  .top-bottom{
    height: 5px;
    width: 100px;
    background-color: var(--side-color);
    margin-right:5px;
    margin-left:5px;
    margin-top:15px;
    margin-bottom:15px;
    border-radius: 5px;
  }
  .corner-right-bottom{
    height: 20px;
    width: 5px;
    background-color: var(--side-color);
    border-radius: 5px;
    margin-top: 15px;
  }
  .corner-right-left{
    height: 5px;
    width: 20px;
    background-color: var(--side-color);
    border-radius: 5px;
    margin-bottom: 15px;
  }
  .corner-left-bottom{
    height: 20px;
    width: 5px;
    background-color: var(--side-color);
    border-radius: 5px;
    margin-top: 15px;
  }
  .corner-left-right{
    height: 5px;
    width: 20px;
    background-color: var(--side-color);
    border-radius: 5px;
    margin-bottom: 15px;
  }
  .corner-left-top{
    height: 20px;
    width: 5px;
    background-color: var(--side-color);
    border-radius: 5px;
    margin-bottom: 15px;
  }
  .corner-right-top{
    height: 20px;
    width: 5px;
    background-color: var(--side-color);
    border-radius: 5px;
    margin-bottom: 15px;
  }
  .corner-bottom-left-right{
    height: 5px;
    width: 20px;
    background-color: var(--side-color);
    border-radius: 5px;
    margin-top: 15px;
  }
  .corner-bottom-right-left{
    height: 5px;
    width: 20px;
    background-color: var(--side-color);
    border-radius: 5px;
    margin-top: 15px;
  }
  ion-button{
    height: max-content;
    width: max-content;
    --background:transparent;
  }
  ion-col{ 
    text-align: center;
    align-items: center;
  }
  .active{
    border: 3px solid;
    color:var(--selected-side-selector);
    border-radius: 5px;
    div{
      background-color: var(--selected-side-selector);
    }
  }
  /* @media screen and (max-width:610px){
    .content{
      width: 70%;
    } 
  } */
  @media screen and (max-width:440px){
    .content{
      width: 100%;
    } 
  }
  .cornerLT{
    width: 50%;
    float: left;
    display: inline;
  }
  .top {
    width: 50%;
    display: inline;
  }
  .cornerRT{
    width: 50%;
    float: right;
    display: inline;
  }
  .cornerLB{
    width:50%;
    float: left;
    display: inline;
  }
  .bottom {
    width: 50%;
    display: inline;
  }
  .cornerRB{
    width: 50%;
    float: right;
    display: inline;
  }
  ion-row{
    flex-wrap:nowrap;
  }

  `;
  @property({type: String})
  /**
   * type side show
   * @type {string}
   */
  showsides='';
  @property({type: String})
  /**
   * sides
   * @type {string}
   */
  sides='';
  @property({type: Boolean})
  /**
   * if is selected
   * @type {string}
   */
  disable=false;

  render() {
    if(this.showsides==='corners'){
      return html`
        <div class="content">
            <ion-grid>
              <ion-row>
                <ion-col class="cornerLT">
                  <ion-button ?disabled="${this.disable}" @click=${() => this.clickSide('Corner left top')} >
                    <div class="corner-left-bottom">
                    </div>
                    <div class="corner-left-right">
                    </div>
                  </ion-button> 
                </ion-col>
                <ion-col class="cornerRT" >
                  <ion-button ?disabled="${this.disable}" @click=${() => this.clickSide('Corner right top')}>
                    <div class="corner-right-left">
                    </div>
                    <div class="corner-right-bottom">
                    </div>
                  </ion-button > 
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col class="cornerLB">
                  <ion-button ?disabled="${this.disable}" @click=${() => this.clickSide('Corner left bottom')}>
                      <div class="corner-left-top">
                      </div>
                      <div class="corner-bottom-left-right">
                      </div> 
                  </ion-button> 
                </ion-col>
                <ion-col class="cornerRB">
                  <ion-button  ?disabled="${this.disable}" @click=${() => this.clickSide('Corner right bottom')}>
                    <div class="corner-bottom-right-left">
                    </div>
                    <div class="corner-right-top">
                    </div>
                  </ion-button>  
                </ion-col>
              </ion-row>
            </ion-grid>
        </div> 
        <ion-button>
              <div class="content">
                </div>
            </ion-button> `
    }
      if(this.showsides==='sides'){
        return html`
        <div class="content">
                <ion-grid>
                  <ion-row>
                    <ion-col class="top">
                      <ion-button  ?disabled="${this.disable}" @click=${() => this.clickSide('Top')}>
                        <div class="top-bottom">
                        </div>
                      </ion-button>
                    </ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col class="left">
                      <ion-button  ?disabled="${this.disable}" @click=${() => this.clickSide('Left')}>
                        <div class="left-rigth">
                        </div>
                      </ion-button> 
                    </ion-col>
                    <ion-col >
                    </ion-col>
                    <ion-col class="rigth">
                      <ion-button  ?disabled="${this.disable}" @click=${() => this.clickSide('Rigth')}>
                        <div class="left-rigth">
                        </div>
                      </ion-button> 
                    </ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col class="bottom">
                      <ion-button  ?disabled="${this.disable}" @click=${() => this.clickSide('Bottom')}>
                        <div class="top-bottom">
                        </div>
                      </ion-button>
                    </ion-col>
                  </ion-row>
                </ion-grid>
            </div>`
      }
        if(this.showsides==='all'){
        return html`
        <ion-button>
          <div class="content">
          </div>
        </ion-button> 
        <div class="content">
        <ion-grid>
          <ion-row>
            <ion-col class="cornerLT">
              <ion-button ?disabled="${this.disable}" @click=${() => this.clickSide('Corner left top')}>
                <div class="corner-left-bottom">
                </div>
                <div class="corner-left-right">
                </div>
              </ion-button> 
            </ion-col>
            <ion-col class="top">
              <ion-button ?disabled="${this.disable}" @click=${() => this.clickSide('Top')} >
                <div class="top-bottom">
                </div>
              </ion-button>
            </ion-col>
            <ion-col class="cornerRT">
              <ion-button ?disabled="${this.disable}" @click=${() => this.clickSide('Corner right top')}>
                <div class="corner-right-left">
                </div>
                <div class="corner-right-bottom">
                </div>
              </ion-button > 
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="left">
              <ion-button ?disabled="${this.disable}" @click=${() => this.clickSide('Left')}>
                <div class="left-rigth">
                </div>
              </ion-button> 
            </ion-col>
            <ion-col >

            </ion-col>
            <ion-col class="right">
              <ion-button  ?disabled="${this.disable}" @click=${() => this.clickSide('Right')}>
                <div class="left-rigth">
                </div>
              </ion-button> 
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="cornerLB">
              <ion-button  ?disabled="${this.disable}" @click=${() => this.clickSide('Corner left bottom')}>
                  <div class="corner-left-top">
                  </div>
                  <div class="corner-bottom-left-right">
                  </div> 
              </ion-button> 
            </ion-col>
            <ion-col class="bottom" >
              <ion-button ?disabled="${this.disable}" @click=${() => this.clickSide('Bottom')} >
                <div class="top-bottom">
                </div>
              </ion-button>
            </ion-col>
            <ion-col class="cornerRB">
              <ion-button  ?disabled="${this.disable}" @click=${() => this.clickSide('Corner right bottom')}>
                <div class="corner-bottom-right-left">
                </div>
                <div class="corner-right-top">
                </div>
              </ion-button>  
            </ion-col>
          </ion-row>
        </ion-grid>

        </div>`
      };
    }
    /**
     * Choose side
     * @param side {String}
     */
    clickSide(side: String){
        const sides=side;
        this.disable=true;
        if(sides){
          const sideSel={
            detail:{sides}
          };
          this.dispatchEvent(
            new CustomEvent('sideSelected',sideSel)
          );
        }
        
    }

  }
